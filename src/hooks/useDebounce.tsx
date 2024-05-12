import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500, length = 2) => {
  const [debounce, setDebounce] = useState('');

  useEffect(() => {
    const clear = setTimeout(
      () => setDebounce(value?.length > length ? value : ''),
      delay,
    );
    return () => clearTimeout(clear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounce;
};

export default useDebounce;
