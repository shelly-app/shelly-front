import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserShelter } from "@/types/api";
import { useUser } from "@/hooks/use-user";

const CURRENT_SHELTER_STORAGE_KEY = "currentShelterId";

type SheltersContextProps = {
  shelters: UserShelter[];
  currentShelter: UserShelter | null;
  setCurrentShelter: React.Dispatch<React.SetStateAction<UserShelter | null>>;
  isLoading: boolean;
};

const SheltersContext = createContext<SheltersContextProps | null>(null);

const SheltersProvider = ({ children }: { children: ReactNode }) => {
  const [currentShelter, setCurrentShelter] = useState<UserShelter | null>(
    null,
  );
  const { data: user, isLoading } = useUser();
  const shelters = useMemo(() => user?.shelters ?? [], [user?.shelters]);

  useEffect(() => {
    if (shelters.length === 0) {
      return;
    }

    const currentShelterIsAvailable = shelters.some(
      (shelter) => shelter.id === currentShelter?.id,
    );
    if (currentShelterIsAvailable) return;

    const storedShelterId = Number(
      window.localStorage.getItem(CURRENT_SHELTER_STORAGE_KEY),
    );
    const storedShelter = shelters.find(
      (shelter) => shelter.id === storedShelterId,
    );

    setCurrentShelter(storedShelter ?? shelters[0]);
  }, [shelters, currentShelter]);

  useEffect(() => {
    if (currentShelter) {
      window.localStorage.setItem(
        CURRENT_SHELTER_STORAGE_KEY,
        currentShelter.id.toString(),
      );
    }
  }, [currentShelter]);

  const value = useMemo(
    () => ({
      shelters,
      currentShelter,
      setCurrentShelter,
      isLoading,
    }),
    [shelters, currentShelter, setCurrentShelter, isLoading],
  );

  return (
    <SheltersContext.Provider value={value}>
      {children}
    </SheltersContext.Provider>
  );
};

const useShelters = () => {
  const context = useContext(SheltersContext);
  if (!context) {
    throw new Error("useShelters must be used within a SheltersProvider.");
  }

  return context;
};

export { SheltersProvider, useShelters };
