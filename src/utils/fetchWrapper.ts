import ky from 'ky';

const fetchWrapper = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  // const response = await fetch(url, {
  //   ...options,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // mode: 'no-cors',
  //     ...(options?.headers || {}),
  //   },
  // });
  // const data = await response.json();

  const response = await ky(url, options);
  const data = await response.json();

  return data as T;
};

export default fetchWrapper;
