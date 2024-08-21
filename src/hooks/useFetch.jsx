import { useEffect, useState } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newOptions = { ...options };

      try {
        const res = await fetch(url, newOptions);
        if (!res.ok) {
          setError(new Error(res.statusText));
          setLoading(false);
          return;
        }
        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
}

export default useFetch;
