import React, { useState } from "react";
import { Link } from "react-router-dom";

const imageIds = [
  "9b1b3725-9321-4454-86b8-7b9e73356912",
  "3267afc7-3862-4bf9-ad73-c3b9a907fdc8",
  "a80e11c0-4362-451e-a8c4-d2921d282b33",
  "159c13ea-fe23-4c3d-9b13-cf8c5125d654",
  "1ff2f3e7-0122-4504-9c2c-3a7b85564e0f",
];
const imageLinks = [
  "/apod",
  "/mars-rover",
  "/epic",
  "/neows",
  "/nasa-iv",
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch(`/api/nasa/search?query=${encodeURIComponent(search)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setResults(null);
    }
    setLoading(false);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111118] overflow-x-hidden"
      style={{
        fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#292938] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">AstroView</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link className="text-white text-sm font-medium leading-normal" to="/apod">Astronomy Picture of the Day</Link>
              <Link className="text-white text-sm font-medium leading-normal" to="/mars-rover">Mars Rover Photos</Link>
              <Link className="text-white text-sm font-medium leading-normal" to="/epic">Earth Polychromatic Imaging Camera</Link>
              <Link className="text-white text-sm font-medium leading-normal" to="/neows">Near Earth Objects </Link>
              <Link className="text-white text-sm font-medium leading-normal" to="/nasa-iv">NASA Image Library</Link>
            </div>
            <div className="flex gap-2"></div>
          </div>
        </header>
        <div className="px-0 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('/images/49656c36-18f5-482d-951d-a879df0ad662.png')",
                  }}
                >
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center">
                    Explore the universe with Galaxy
                  </h1>
                  {/* Search Bar */}
                  <form
                    onSubmit={handleSearch}
                    className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16 mt-4"
                  >
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                      <div className="text-[#9d9db8] flex border border-[#3c3c53] bg-[#1c1c26] items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search NASA images"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c3c53] bg-[#1c1c26] focus:border-[#3c3c53] h-full placeholder:text-[#9d9db8] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                      <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#3c3c53] bg-[#1c1c26] pr-[7px]">
                        <button
                          type="submit"
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1919e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base"
                        >
                          <span className="truncate">Go</span>
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* Search Results */}
                  <div className="w-full mt-6">
                    {loading && <p className="text-[#bdbdd7]">Searching...</p>}
                    {!loading && results && (
                      <div className="flex flex-col gap-6">
                        {/* APOD */}
                        {results.apod && (
                          <div className="bg-[#1c1c26] rounded-xl p-4 text-white">
                            <h3 className="font-bold mb-2">Astronomy Picture of the Day</h3>
                            <img src={results.apod.url} alt={results.apod.title} className="w-full max-w-xs mb-2" />
                            <div>{results.apod.title}</div>
                            <div className="text-xs">{results.apod.explanation?.slice(0, 120)}...</div>
                          </div>
                        )}
                        {/* Mars Rover */}
                        {results.mars && results.mars.length > 0 && (
                          <div className="bg-[#1c1c26] rounded-xl p-4 text-white">
                            <h3 className="font-bold mb-2">Mars Rover Photos</h3>
                            <div className="flex flex-wrap gap-2">
                              {results.mars.slice(0, 3).map(photo => (
                                <img key={photo.id} src={photo.img_src} alt={photo.camera.full_name} className="w-32 h-32 object-cover rounded" />
                              ))}
                            </div>
                          </div>
                        )}
                        {/* EPIC */}
                        {results.epic && results.epic.length > 0 && (
                          <div className="bg-[#1c1c26] rounded-xl p-4 text-white">
                            <h3 className="font-bold mb-2">EPIC Earth Images</h3>
                            <div className="flex flex-wrap gap-2">
                              {results.epic.slice(0, 3).map(img => {
                                const [year, month, day] = img.date.split(" ")[0].split("-");
                                const url = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${img.image}.jpg`;
                                return (
                                  <img key={img.identifier} src={url} alt={img.caption} className="w-32 h-32 object-cover rounded" />
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {/* NeoWs */}
                        {results.neo && results.neo.length > 0 && (
                          <div className="bg-[#1c1c26] rounded-xl p-4 text-white">
                            <h3 className="font-bold mb-2">Near Earth Objects</h3>
                            <ul className="text-xs">
                              {results.neo.slice(0, 3).map(obj => (
                                <li key={obj.id}>{obj.name} - Diameter: {obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* NASA Image Library */}
                        {results.imageLibrary && results.imageLibrary.length > 0 && (
                          <div className="bg-[#1c1c26] rounded-xl p-4 text-white">
                            <h3 className="font-bold mb-2">NASA Image Library</h3>
                            <div className="flex flex-wrap gap-2">
                              {results.imageLibrary.slice(0, 3).map(item => (
                                <a key={item.data[0].nasa_id} href={item.links && item.links[0] ? item.links[0].href : "#"} target="_blank" rel="noopener noreferrer">
                                  <img src={item.links && item.links[0] ? item.links[0].href : ""} alt={item.data[0].title} className="w-32 h-32 object-cover rounded" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* No Results */}
                        {(!results.apod && (!results.mars || results.mars.length === 0) && (!results.epic || results.epic.length === 0) && (!results.neo || results.neo.length === 0) && (!results.imageLibrary || results.imageLibrary.length === 0)) && (
                          <p className="text-[#bdbdd7]">No results found.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {imageIds.map((id, idx) => (
                <div className="flex flex-col gap-3" key={id}>
                  <Link to={imageLinks[idx]}>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl transition-transform hover:scale-105"
                      style={{
                        backgroundImage: `url("/images/${id}.png")`,
                      }}
                    ></div>
                  </Link>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;