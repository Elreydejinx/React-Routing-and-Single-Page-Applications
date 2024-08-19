// src/components/Comics.jsx
import React, { useState, useEffect } from 'react';

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch('https://gateway.marvel.com:443/v1/public/comics?apikey=61a85c0b3c756eff33873cd555b1479a');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  if (loading) return <p>Loading comics...</p>;
  if (error) return <p>Error loading comics: {error}</p>;
  if (comics.length === 0) return <p>No comics found.</p>;

  return (
    <div>
      <h2>Comics</h2>
      <ul>
        {comics.map(comic => (
          <li key={comic.id}>
            <h3>{comic.title}</h3>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comics;
