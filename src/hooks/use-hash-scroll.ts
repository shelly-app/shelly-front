import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useHashScroll = () => {
  const location = useLocation();

  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (location.hash) {
        const id = location.hash.substring(1);
        setTimeout(() => {
          scrollToElement(id);
        }, 100);
      } else if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [location.hash, location.pathname, scrollToElement]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const cleanId = sectionId.replace("#", "");
      const isHome = cleanId === "/" || cleanId === "";

      if (location.pathname === "/") {
        scrollToElement(isHome ? "hero" : cleanId);
        window.history.pushState(null, "", isHome ? "/" : `#${cleanId}`);
      }
    },
    [location.pathname, scrollToElement],
  );

  return { scrollToSection };
};
