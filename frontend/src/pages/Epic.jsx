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

function Epic() {
  const [images, setImages] = useState([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('/api/nasa/epic-latest')
      .then(res => {
        setDate(res.data.date);
        setImages(res.data.images);
      })
      .catch(() => setError('Failed to fetch EPIC images.'))
      .finally(() => setLoading(false));
  }, []);

  function getEpicImageUrl(image, date) {
    const [year, month, day] = date.split('-');
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image.image}.jpg`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111118] overflow-x-hidden" style={{
      fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      backgroundImage: "url('/images/bg-epic.jpg')", // Earth/EPIC background
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
      <NavBar />
      <div className="px-0 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h1 className="text-white text-4xl font-black mb-4">EPIC: Earth Polychromatic Imaging Camera</h1>
          <p className="text-[#bdbdd7] mb-6">
            The EPIC API provides daily full-disc imagery of Earth from the DSCOVR satellite at the L1 Lagrange point. Below are the latest available images and metadata.
          </p>
          {loading ? (
            <p className="text-[#bdbdd7]">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <>
              <h2 className="text-white text-xl font-bold mb-2">Date: {date}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img) => (
                  <div key={img.identifier} className="bg-[#1c1c26] rounded-xl overflow-hidden">
                    <img
                      src={getEpicImageUrl(img, date)}
                      alt={img.caption}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 text-white text-sm">
                      <p><strong>Caption:</strong> {img.caption}</p>
                      <p><strong>Centroid Coordinates:</strong> Lat {img.centroid_coordinates.lat}, Lon {img.centroid_coordinates.lon}</p>
                      <p><strong>Date:</strong> {img.date}</p>
                      <a
                        href="https://epic.gsfc.nasa.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline mt-2 inline-block"
                      >
                        More info
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Epic;