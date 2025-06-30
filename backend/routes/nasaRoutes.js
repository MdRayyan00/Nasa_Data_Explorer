import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.NASA_API_KEY;

router.get('/apod', async (req, res) => {
  try {
    const { date } = req.query;

    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (date) url += `&date=${date}`;

    console.log('Fetching APOD from:', url);

    const response = await axios.get(url, { timeout: 5000 });
    res.json(response.data);
  } catch (err) {
    console.error('APOD fetch error:', err?.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.msg || 'Failed to fetch APOD data'
    });
  }
});


router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Missing search query" });

  try {
    const API_KEY = process.env.NASA_API_KEY;

    // APOD (search by date or title in explanation)
    let apodData = null;
    try {
      // Try as date first
      const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${encodeURIComponent(query)}`;
      const apodRes = await axios.get(apodUrl);
      apodData = apodRes.data;
    } catch {
      // If not a date, try fetching latest and filter by title/desc
      const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
      const apodRes = await axios.get(apodUrl);
      if (
        apodRes.data.title?.toLowerCase().includes(query.toLowerCase()) ||
        apodRes.data.explanation?.toLowerCase().includes(query.toLowerCase())
      ) {
        apodData = apodRes.data;
      }
    }

    // Mars Rover (search by sol or earth_date)
    let marsData = [];
    try {
      const marsUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${encodeURIComponent(query)}&api_key=${API_KEY}`;
      const marsRes = await axios.get(marsUrl);
      marsData = marsRes.data.photos || [];
    } catch {}

    // EPIC (search by date)
    let epicData = [];
    try {
      const epicUrl = `https://api.nasa.gov/EPIC/api/natural/date/${encodeURIComponent(query)}?api_key=${API_KEY}`;
      const epicRes = await axios.get(epicUrl);
      epicData = epicRes.data || [];
    } catch {}

    // NeoWs (search by date range)
    let neoData = [];
    try {
      const neoUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${encodeURIComponent(query)}&end_date=${encodeURIComponent(query)}&api_key=${API_KEY}`;
      const neoRes = await axios.get(neoUrl);
      neoData = neoRes.data.near_earth_objects?.[query] || [];
    } catch {}

    // NASA Image Library (search by query)
    let imageLibData = [];
    try {
      const imageLibUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
      const imageLibRes = await axios.get(imageLibUrl);
      imageLibData = imageLibRes.data.collection?.items || [];
    } catch {}

    res.json({
      apod: apodData,
      mars: marsData,
      epic: epicData,
      neo: neoData,
      imageLibrary: imageLibData,
    });
  } catch (err) {
    console.error('Unified NASA search error:', err);
    res.status(500).json({ error: 'Failed to search NASA APIs' });
  }
});

router.get('/mars-photos', async (req, res) => {
  try {
    const { rover = 'curiosity', camera = '', date } = req.query;
    let url;
    if (date) {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${API_KEY}`;
      if (camera) url += `&camera=${camera}`;
      const response = await axios.get(url);
      res.json(response.data.photos);
    } else {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API_KEY}`;
      if (camera) url += `&camera=${camera}`;
      const response = await axios.get(url);
      res.json(response.data.latest_photos);
    }
  } catch (err) {
    console.error('Mars Photos error:', err);
    res.status(500).json({ error: 'Failed to fetch Mars rover photos' });
  }
});

router.get('/rover-manifest', async (req, res) => {
  try {
    const { rover = 'curiosity' } = req.query;
    const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`;
    const response = await axios.get(url);
    // Return all dates with photos (may be a large array)
    const dates = response.data.photo_manifest.photos.map(p => p.earth_date);
    res.json({ dates });
  } catch (err) {
    console.error('Rover Manifest error:', err);
    res.status(500).json({ error: 'Failed to fetch rover manifest' });
  }
});


router.get('/neo', async (req, res) => {
  try {
    const { date } = req.query;

    // If a date is provided, validate and fetch for that date only
    if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
      }
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${API_KEY}`;
      const response = await axios.get(url);
      const neos = response.data.near_earth_objects?.[date] || [];
      if (!neos.length) {
        return res.status(404).json({ error: `No NEO data found for ${date}` });
      }
      return res.json({ date, near_earth_objects: neos });
    }

    // No date provided: get the latest available date in the feed
    // We'll use the last 7 days and pick the most recent date with data
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);
    const start_date = weekAgo.toISOString().slice(0, 10);
    const end_date = today.toISOString().slice(0, 10);

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;
    const response = await axios.get(url);

    // Find the latest date with NEOs
    const dates = Object.keys(response.data.near_earth_objects).sort().reverse();
    for (const d of dates) {
      const neos = response.data.near_earth_objects[d];
      if (Array.isArray(neos) && neos.length > 0) {
        return res.json({ date: d, near_earth_objects: neos });
      }
    }

    res.status(404).json({ error: 'No recent NEO data found.' });
  } catch (err) {
    console.error('NEO error:', err);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

router.get('/epic-latest', async (req, res) => {
  try {
    // Get all available dates
    const datesRes = await axios.get('https://epic.gsfc.nasa.gov/api/natural/all');
    const allDates = datesRes.data;
    if (!allDates.length) return res.status(404).json({ error: 'No EPIC images available.' });

    // Try dates from latest to earliest until we find images
    for (let i = allDates.length - 1; i >= 0; i--) {
      const dateStr = allDates[i].date.split(' ')[0];
      try {
        const imagesRes = await axios.get(`https://epic.gsfc.nasa.gov/api/natural/date/${dateStr}`);
        if (Array.isArray(imagesRes.data) && imagesRes.data.length > 0) {
          return res.json({ date: dateStr, images: imagesRes.data });
        }
      } catch (err) {
        // Try the next date
        continue;
      }
    }

    // If no images found for any date
    res.status(404).json({ error: 'No EPIC images found for any date.' });
  } catch (err) {
    console.error('EPIC error:', err);
    res.status(500).json({ error: 'Failed to fetch EPIC images.' });
  }
});

router.get('/image-library', async (req, res) => {
  let { query, media_type } = req.query;

  // If no query, fetch latest images (e.g., "moon" or just all images)
  let url = 'https://images-api.nasa.gov/search?';
  if (query) url += `q=${encodeURIComponent(query)}&`;
  if (media_type) url += `media_type=${encodeURIComponent(media_type)}&`;
  if (!query && !media_type) url += 'q=moon&media_type=image&'; // fallback to something

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('NASA Image Library error:', err);
    res.status(500).json({ error: 'Failed to fetch NASA Image Library data' });
  }
});

export default router;