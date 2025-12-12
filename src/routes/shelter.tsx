import { useEffect } from "react";
import { ShelterDetailsPage } from "@/features/shelters/pages";

export const ShelterRoute = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <ShelterDetailsPage />;
};
