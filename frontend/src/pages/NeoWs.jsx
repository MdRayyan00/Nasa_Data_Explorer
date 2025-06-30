import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#292938] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2><Link className="text-white text-lg font-bold leading-tight tracking-[-0.015em]" to="/">AstroView</Link></h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-white text-sm font-medium leading-normal" to="/apod">Astronomy Picture of the Day</Link>
          <Link className="text-white text-sm font-medium leading-normal" to="/mars-rover">Mars Rover Photos</Link>
          <Link className="text-white text-sm font-medium leading-normal" to="/epic">Earth Polychromatic Imaging Camera</Link>
          <Link className="text-white text-sm font-medium leading-normal" to="/neows">Near Earth Objects </Link>
          <Link className="text-white text-sm font-medium leading-normal" to="/nasa-iv">NASA Image Library</Link>
        </div>
      </div>
    </header>
  );
}

function NeoWs() {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('/api/nasa/neo')
      .then(res => setNeos(res.data.near_earth_objects || []))
      .catch(() => setError('Failed to fetch NEO data.'))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#111118] overflow-x-hidden" style={{
      fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      backgroundImage: "url('/images/bg-asteroid.jpg')", // Asteroid/NEO background
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <NavBar />
      <div className="px-0 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h1 className="bg-black bg-opacity-70 text-white text-4xl font-black mb-4 px-4 py-2 rounded drop-shadow-lg">
            Near Earth Objects
          </h1>
          <p className="bg-black bg-opacity-60 text-white mb-6 px-4 py-2 rounded drop-shadow-lg">
            The NeoWs API provides information about asteroids and comets that come close to Earth. Below are some of the latest detected NEOs.
          </p>
          {loading ? (
            <p className="text-[#bdbdd7]">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {neos.slice(0, 12).map((neo) => (
                <div key={neo.id} className="bg-[#1c1c26] rounded-xl overflow-hidden p-4 text-white text-sm">
                  <p><strong>Name:</strong> {neo.name}</p>
                  <p><strong>Magnitude:</strong> {neo.absolute_magnitude_h}</p>
                  <p><strong>Potentially Hazardous:</strong> {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                  <p><strong>Estimated Diameter (meters):</strong> {Math.round(neo.estimated_diameter.meters.estimated_diameter_min)} - {Math.round(neo.estimated_diameter.meters.estimated_diameter_max)}</p>
                  <p><strong>Close Approach Date:</strong> {neo.close_approach_data?.[0]?.close_approach_date_full || 'N/A'}</p>
                  <p><strong>Miss Distance (km):</strong> {neo.close_approach_data?.[0]?.miss_distance?.kilometers || 'N/A'}</p>
                  <a
                    href={neo.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    More Info
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NeoWs;