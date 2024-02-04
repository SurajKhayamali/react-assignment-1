import { useState } from 'react';

import fetchWrapper from '../utils/fetchWrapper';

interface UseFetchProps {
  method?: 'GET' | 'POST';
  headers?: HeadersInit;
  object?: boolean;
}

const useFetch = <T>(props: UseFetchProps = {}) => {
  const { method, headers, object } = props;
  const [data, setData] = useState<T>((object ? {} : []) as T);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const triggerFetch = async <T>(endpoint: string): Promise<T | undefined> => {
    if (!endpoint) return;

    setIsLoading(true);

    try {
      const data = await fetchWrapper<T>(endpoint, {
        method,
        headers,
      });
      if (!data) return;

      setData(data as any);

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
