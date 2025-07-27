import { useState, useCallback } from 'react';

const apiKey = "xDpY0tKaj01CqTEe1eEWcKCCxypoRuOq";
const baseUrl = "https://api.giphy.com/v1/gifs";

export const useApi = () => {
  const [error, setError] = useState(null);

  const searchGifs = useCallback(async (query) => {
    if (!query.trim()) return [];

    setError(null);
    
    try {
      const response = await fetch(
        `${baseUrl}/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=20`
      );
      const data = await response.json();

      return data.data || [];
    } catch (error) {
      setError(error.message);
      console.error(error);

      return [];
    }
  }, []);

  return { searchGifs, error };
};