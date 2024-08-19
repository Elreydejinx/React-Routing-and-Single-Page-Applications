// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import BrowseCharacters from './BrowseCharacters';
import CharacterDetails from './CharacterDetails';
import Comics from './Comics';
import NotFound from './NotFound';
import TestFetch from './TestFetch'; 

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/browse-characters">Browse Characters</a></li>
          <li><a href="/comics">Comics</a></li>
          <li><a href="/test-fetch">Test Fetch</a></li> {/* Add a link to test fetch */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-characters" element={<BrowseCharacters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/test-fetch" element={<TestFetch />} /> {/* Add route for test fetch */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
