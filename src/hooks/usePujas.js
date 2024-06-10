// src/hooks/usePujas.js

import { useState, useEffect } from 'react';
import Config from '../config/Config';

const usePujas = (language) => {
  const [pujas, setPujas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const response = await fetch(`${Config.apiUrl}${Config.endpoints.pujastore}?lang=${language}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPujas(data);
        } else if (data !== null && typeof data === 'object') {
          setPujas([data]);
        } else {
          console.error("API returned unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching pujas:", error);
        setError(error);
      }
    };

    fetchPujas();
  }, [language]);

  return { pujas, error };
};

export default usePujas;
