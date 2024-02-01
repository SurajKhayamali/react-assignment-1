import { useEffect, useState } from 'react';

interface UseFetchProps {
  // endpoint: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, unknown>;
  object?: boolean;
}

const useFetch = <T>(props: UseFetchProps = {}) => {
  const { method, headers, object } = props;
  const [data, setData] = useState<T>((object ? {} : []) as T);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [endpoint, setEndpoint] = useState<string>();

  // useEffect(() => {
  //   handleFetch();
  // }, []);

  const triggerFetch = async <T>(endpoint: string): Promise<T | undefined> => {
    if (!endpoint) return;

    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // mode: 'no-cors',
          ...headers,
        },
      });
      const data = await response.json();

      setData(data);

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isError: Boolean(error), isLoading, triggerFetch };
};

export default useFetch;
