import express from 'express';
import axios from 'axios';
const router = express.Router();
import dotenv from 'dotenv';

dotenv.config();
// const API_KEY = "XYvTcd88xjryGNkrKlayOABhxqQm2EtMbmGvyfe7";
const API_KEY =  process.env.NASA_API_KEY;

router.get('/apod', async (req, res) => {
  try {
    const { date } = req.query;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (date) {
      url += `&date=${date}`;
    }
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('NASA APOD error:', err);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
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
    const { start_date = '2024-06-01', end_date = '2024-06-07' } = req.query;
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;
    const response = await axios.get(url);

    const data = Object.entries(response.data.near_earth_objects).map(([date, neos]) => ({
      date,
      count: neos.length,
    }));

    res.json(data);
  } catch (err) {
    console.error('NEO error:', err);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

export default router;