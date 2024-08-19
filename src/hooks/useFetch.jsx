import { useEffect, useState } from "react";

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function fetchedData() {
    const send = async () => {
      setLoading(true);
      const newOptions = {...options,credentials: "include"}
      try {
        const res = await fetch(url, newOptions);
        if(res.status==400||res.status==500||res.status==404){
          setError(res.message);
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
    send();
  }, []);

  return {data, error, loading};
}
export default useFetch;