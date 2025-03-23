
import { useState, useEffect } from 'react';
import Config from '../config/Config';

const useSettings = (language) => {
  const [settings, setSettings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${Config.apiUrl}settings/gets`);
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data = await response.json();
   // Assuming data is an array, but handle edge cases
        if (Array.isArray(data)) {
            setSettings(data);
        } else if (data !== null && typeof data === 'object') {
            setSettings([data]);
        } else {
          console.error('API returned unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError(error);
      }
    };

    fetchSettings();
  }, [language]);

  return { settings, error };
};

export default useSettings;
