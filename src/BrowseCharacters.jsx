// src/components/BrowseCharacters.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BrowseCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=61a85c0b3c756eff33873cd555b1479a');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error loading characters: {error}</p>;
  if (characters.length === 0) return <p>No characters found.</p>;

  return (
    <div>
      <h2>Browse Characters</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseCharacters;
