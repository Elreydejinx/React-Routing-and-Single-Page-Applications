// src/components/CharacterDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=61a85c0b3c756eff33873cd555b1479a`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCharacter(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <p>Loading character details...</p>;
  if (error) return <p>Error loading character details: {error}</p>;
  if (!character) return <p>No character details found.</p>;

  return (
    <div>
      <h2>{character.name}</h2>
      <p>{character.description || 'No description available.'}</p>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
    </div>
  );
};

export default CharacterDetails;
