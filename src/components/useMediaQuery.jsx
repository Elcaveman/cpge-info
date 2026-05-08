import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQueryList = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", onChange);

    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
