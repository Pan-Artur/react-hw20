import { useState } from 'react';

import { useApi } from './hooks/useApi';

import { GifSearch } from './components/GifSearch/GifSearch';
import { GifList } from './components/GifList/GifList';

import './App.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [gifs, setGifs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { searchGifs, error } = useApi();

  const handleInputChange = (value) => {
    setSearchValue(value);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    
    const results = await searchGifs(searchValue);

    setGifs(results);
    setHasSearched(true);
  };

  return (
    <div className="app-container">
      <GifSearch 
        value={searchValue} 
        onInputChange={handleInputChange} 
        onSearch={handleSearch} 
      />

      {error && <div className="error">{error}</div>}
      
      <GifList gifs={gifs} hasSearched={hasSearched} />
    </div>
  );
};