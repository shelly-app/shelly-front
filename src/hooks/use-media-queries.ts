import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

// Common breakpoint hooks
export const useMobile = () => useMediaQuery("(max-width: 767px)");
export const useTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useLargeDesktop = () => useMediaQuery("(min-width: 1280px)");

// Responsive utilities
export const useResponsive = () => ({
  isMobile: useMobile(),
  isTablet: useTablet(),
  isDesktop: useDesktop(),
  isLargeDesktop: useLargeDesktop(),
});
