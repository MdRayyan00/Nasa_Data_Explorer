import { useState, useEffect } from 'react';
import axios from 'axios';

function ApodPage() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get('/api/nasa/apod')
      .then(res => setApod(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Astronomy Picture of the Day</h1>
      {apod ? (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{apod.title}</h2>
          <img src={apod.url} alt={apod.title} className="w-full rounded mb-4" />
          <p className="text-gray-700">{apod.explanation}</p>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default ApodPage;