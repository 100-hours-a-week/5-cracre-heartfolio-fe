import { useEffect, useState } from 'react';
import { fetchWithToken } from '../utils/api';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchWithToken(url);
        // 응답이 null이 아닌 경우에만 데이터를 설정
        if (res !== null) {
          setData(res);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
