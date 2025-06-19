import { useState, useEffect } from 'react';
import axios from 'axios';

function MarsRover() {
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [selectedRover, setSelectedRover] = useState('curiosity');

  useEffect(() => {
    axios
      .get(`/api/nasa/mars-photos?rover=${selectedRover}`)
      .then((res) => setMarsPhotos(res.data))
      .catch(() => setMarsPhotos([]));
  }, [selectedRover]);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111118] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#292938] px-10 py-3 text-white">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Space Data</h2>
        </div>
        <div className="flex flex-1 justify-end gap-6 text-sm">
          <a href="#" className="text-white">APOD</a>
          <a href="#" className="text-white">EPIC</a>
          <a href="#" className="text-white">NeoWs</a>
          <a href="#" className="text-white">NASA Images</a>
        </div>
      </header>

      {/* Hero */}
      <section
        className="flex flex-col justify-end px-10 py-20 bg-cover bg-center min-h-[400px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://cdn.usegalileo.ai/sdxl10/f0133a91-d51b-4e73-8977-db1d60e57ca9.png")',
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-black mb-2">Mars Rover Photos</h1>
        <p className="text-white max-w-xl">
          Explore the red planet through the eyes of NASA's Mars rovers.
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
            {marsPhotos.slice(0, 9).map((photo) => (
              <div key={photo.id} className="bg-[#1c1c26] rounded-xl overflow-hidden">
                <img
                  src={photo.img_src}
                  alt={`Mars Rover ${photo.rover.name}`}
                  className="w-full h-48 object-cover"
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
    </div>
  );
}

export default MarsRover;
