import { useRef, useEffect } from 'react';

// https://usehooks.com/usePrevious/
function usePrevious(value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export { usePrevious };
