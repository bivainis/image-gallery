import { useEffect, useState } from "react";
import { Image } from "ts/interfaces";
interface UseFetchDataParams {
  endpoint: string;
  params: {
    page: number;
    pageSize?: number;
  };
}

const useFetchData = ({
  endpoint,
  params,
}: UseFetchDataParams): {
  loading: boolean;
  data: Image[];
  error: Error | undefined;
} => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const { page } = params;

  useEffect(() => {
    setLoading(true);

    fetch(endpoint + "?page=" + page)
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
  }, [endpoint, page]);

  return { loading, data, error };
};

export default useFetchData;
