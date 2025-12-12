import { useEffect } from "react";
import { SheltersListPage } from "@/features/shelters/pages";

export const SheltersRoute = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <SheltersListPage />;
};
