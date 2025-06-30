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
        <div className="flex gap-2">
          <button
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#292938] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <span className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </span>
          </button>
          <button
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#292938] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <span className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function MarsRover() {
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  useEffect(() => {
    axios
      .get(`/api/nasa/mars-photos?rover=${selectedRover}`)
      .then((res) => setMarsPhotos(res.data))
      .catch(() => setMarsPhotos([]));
  }, [selectedRover]);

  // Modal close on background or ESC
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);


  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111118] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      backgroundImage: "url('/images/mars.jpg')", // Mars rover background
      backgroundSize: "cover",
      backgroundPosition: "center", }}
    >
      <NavBar />
      {/* Hero */}
      <section
        className="flex flex-col justify-end px-10 py-20 bg-cover bg-center min-h-[400px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("/images/f0133a91-d51b-4e73-8977-db1d60e57ca9.png")',
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-black mb-2">Mars Rover Photos</h1>
        <p className="text-white max-w-xl">
          Explore the red planet through the eyes of NASA&apos;s Mars rovers.
        </p>
      </section>

      {/* Filter */}
      <div className="flex justify-center my-8">
        <select
          value={selectedRover}
          onChange={(e) => setSelectedRover(e.target.value)}
          className="px-4 py-2 rounded-xl bg-[#292938] text-white border-none"
        >
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>
      </div>

      {/* Photos */}
      <section className="px-4 md:px-20 pb-20">
        {marsPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {marsPhotos
              .filter(photo =>
                typeof photo.img_src === "string" &&
                /\.(jpg|jpeg|png|gif)$/i.test(photo.img_src) &&
                !brokenImages[photo.img_src]
              )
              .slice(0, 9)
              .map((photo) => (
                <div key={photo.id} className="bg-[#1c1c26] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => { setModalImg(photo.img_src); setModalOpen(true); }}>
                  <img
                    src={photo.img_src}
                    alt={`Mars Rover ${photo.rover.name}`}
                    className="w-full h-48 object-cover transition-transform hover:scale-105"
                    onError={() =>
                      setBrokenImages(prev => ({ ...prev, [photo.img_src]: true }))
                    }
                  />
                  <div className="p-4 text-white text-sm">
                    <p><strong>{photo.rover.name}</strong> - {photo.camera.full_name}</p>
                    <p>{photo.earth_date}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No photos found for this rover.</p>
        )}
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setModalOpen(false)}
        >
          <img
            src={modalImg}
            alt="Mars Rover Enlarged"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
        </div>)}
    </div>
  );
}

export default MarsRover;
