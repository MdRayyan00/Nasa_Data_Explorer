
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



// --- Navigation Bar Component ---
function NavBar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#292938] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2><Link className="text-white text-lg font-bold leading-tight tracking-[-0.015em]" to="/">AstroView</Link>
        </h2></div>
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


// --- Reusable SearchBar Component ---
function SearchBar({ value, onChange, onSubmit, max }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16 mt-4">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
        <div className="text-[#9d9db8] flex border border-[#3c3c53] bg-[#1c1c26] items-center justify-center pl-[15px] rounded-l-xl border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input
          type="date"
          placeholder="Enter a date"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c3c53] bg-[#1c1c26] focus:border-[#3c3c53] h-full placeholder:text-[#9d9db8] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base"
          value={value}
          onChange={onChange}
          max={max}
        />
        <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#3c3c53] bg-[#1c1c26] pr-[7px]">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1919e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base"
          >
            <span className="truncate">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}



// --- Reusable APOD Card Component ---
function ApodCard({ apod }) {
  if (!apod) return null;
  return (
    <div className="bg-[#19192a] rounded-2xl shadow-lg p-6 flex flex-col items-center w-full max-w-2xl">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">{apod.title}</h2>
      {apod.media_type === "image" ? (
        <img
          src={apod.url}
          alt={apod.title}
          className="w-full rounded-xl mb-6 bg-[#22223a]"
          style={{ background: "#22223a" }}
        />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          className="w-full aspect-video rounded-xl mb-6 bg-[#22223a]"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
      <p className="text-[#bdbdd7] text-base leading-relaxed text-center">{apod.explanation}</p>
      {apod.date && (
        <p className="text-[#9d9db8] text-sm mt-4">{apod.date}</p>
      )}
    </div>
  );
}

// --- Static APOD Cards Data (from Galileo HTML, using local images) ---
const staticApods = [
  {
    img: '/images/fe68938e-d211-4c16-b562-c4409359c436.png',
    title: 'The Milky Way over the Pinnacles in Australia',
    date: 'June 15, 2023',
  },
  {
    img: '/images/a402f99b-4fb8-4205-964e-7e194062ad46.png',
    title: 'Aurora over White Dome Geyser',
    date: 'June 14, 2023',
  },
  {
    img: '/images/2ca8170d-9b04-4129-b63c-69d97bd36c69.png',
    title: 'The Moon during a Lunar Eclipse',
    date: 'June 13, 2023',
  },
  {
    img: '/images/237dc09e-b2de-4e33-8093-8b31e376672a.png',
    title: 'The Andromeda Galaxy',
    date: 'June 12, 2023',
  },
  {
    img: '/images/df1eec4b-7b1c-4b6a-93f9-c1886450be08.png',
    title: 'The Great Nebula in Orion',
    date: 'June 11, 2023',
  },
];

function ApodPage() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchApod = (selectedDate = '') => {
    setLoading(true);
    axios
      .get('/api/nasa/apod', { params: selectedDate ? { date: selectedDate } : {} })
      .then(res => setApod(res.data))
      .catch(() => setApod(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchApod(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchApod(date);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#111118] overflow-x-hidden"
      style={{
      fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      backgroundImage: "url('/images/bg-apod.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "auto", 
    }}
  >
      <div className="layout-container flex h-full grow flex-col">
        <NavBar />
        <div className="px-0 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                {/* Hero Section */}
                <div
                  className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('/images/fe68938e-d211-4c16-b562-c4409359c436.png')",
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                      Astronomy Picture of the Day
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
                      Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.
                    </h2>
                  </div>
                  <SearchBar
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    onSubmit={handleSearch}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            {/* APOD Card */}
            <div className="flex flex-col items-center justify-center py-10">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-[#bdbdd7] text-lg">Loading...</p>
                </div>
              ) : apod ? (
                <ApodCard apod={apod} />
              ) : (
                <p className="text-[#bdbdd7] text-lg">No data found.</p>
              )}
            </div>
            {/* Static APOD Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 p-4">
              {staticApods.map(({ img, title, date }) => (
                <div className="flex flex-col gap-3 pb-3" key={img}>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: `url("${img}")` }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">{title}</p>
                    <p className="text-[#9d9db8] text-sm font-normal leading-normal">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApodPage;

