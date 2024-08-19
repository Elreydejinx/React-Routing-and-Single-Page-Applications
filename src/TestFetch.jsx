import React, { useState, useEffect } from 'react';

const TestFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = '61a85c0b3c756eff33873cd555b1479a'; 
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <div>
      <h2>Test Fetch</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestFetch;
