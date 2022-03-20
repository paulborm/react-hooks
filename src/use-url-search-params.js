import { useEffect } from 'react';
import { useForceUpdate } from '.';
import { CustomURLSearchParams } from './helpers';

function updateURL(params) {
  const newSearchParams = params;
  const newURL = new URL(window.location);

  newSearchParams.sort();
  newURL.search = newSearchParams;

  window.history.replaceState({}, '', newURL);
  window.dispatchEvent(new CustomEvent('replacestate'));
}

function useURLSearchParams() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const onChange = () => {
      forceUpdate();
    };

    window.addEventListener('replacestate', onChange);

    return () => {
      window.addEventListener('replacestate', onChange);
    };
  }, []);

  const customURLSearchParams = new CustomURLSearchParams(
    window.location.search,
    { onUpdate: updateURL }
  );

  return customURLSearchParams;
}

export { useURLSearchParams };
