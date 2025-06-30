import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


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

function NasaIV() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch latest 10 images on mount
  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      setError('');
      try {
        // NASA's image API sorts by date_created desc with media_type=image
        const res = await fetch(`/api/nasa/image-library?query=&media_type=image`);
        const data = await res.json();
        setLatest((data.collection?.items || []).slice(0, 10));
      } catch {
        setError('Failed to fetch latest images.');
      }
      setLoading(false);
    };
    fetchLatest();
  }, []);

  // Search for any type of images (image, video, audio)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`/api/nasa/image-library?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.collection?.items || []);
      if (!data.collection?.items?.length) setError('No results found.');
    } catch {
      setError('Failed to fetch images.');
    }
    setLoading(false);
  };

  // Helper to render image cards
  const renderItems = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {items.map(item => (
        <div key={item.data[0].nasa_id} className="bg-[#1c1c26] rounded-xl overflow-hidden p-4 text-white text-sm flex flex-col items-center">
          <a
            href={item.links && item.links[0] ? item.links[0].href : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={item.links && item.links[0] ? item.links[0].href : ""}
              alt={item.data[0].title}
              className="w-full h-48 object-cover rounded mb-2"
            />
          </a>
          <div className="w-full">
            <p className="font-bold">{item.data[0].title}</p>
            <p className="text-[#bdbdd7] text-xs">{item.data[0].date_created?.slice(0, 10)}</p>
          </div>
        </div>
      ))}
    </div>
  );

   return (
    <div
      className="min-h-screen flex flex-col bg-[#111118] overflow-x-hidden"
      style={{
        fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
        backgroundImage: "url('/images/bg-nasaiv.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "auto", 
      }}
    >
      <NavBar />
      <div className="p-8 flex flex-col items-center">
        <h1 className="bg-black bg-opacity-70 text-white text-3xl font-black mb-6 px-4 py-2 rounded drop-shadow-lg">
          NASA Image Library
        </h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-xl mb-8">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-l bg-[#1c1c26] text-white border border-[#3c3c53] focus:outline-none"
            placeholder="Search NASA images, videos, or audio (e.g. Saturn, Moon, Shuttle)"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#1919e6] text-white font-bold rounded-r"
          >
            Search
          </button>
        </form>
        {loading && <p className="text-[#bdbdd7]">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {results.length > 0 ? (
          <>
            <h2 className="text-white text-xl font-bold mb-4">Search Results</h2>
            {renderItems(results)}
          </>
        ) : (
          <>
            <h2 className="text-white text-xl font-bold mb-4">Latest Images</h2>
            {renderItems(latest)}
          </>
        )}
      </div>
    </div>
  );
}

export default NasaIV;