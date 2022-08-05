import { useEffect, useState } from "react";

interface UseFetchDataParams {
  endpoint: string;
}

const useFetchData = ({ endpoint }: UseFetchDataParams) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return { loading, data, error };
};

export default useFetchData;
