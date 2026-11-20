import { useEffect, useState } from 'react';

/** Tiny hash router: `#/home` → "home". Keeps the app static-hostable with no server rewrites. */
export function useHashRoute(fallback: string): string {
  const read = () => window.location.hash.replace(/^#\/?/, '') || fallback;
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const href = (route: string) => `#/${route}`;
