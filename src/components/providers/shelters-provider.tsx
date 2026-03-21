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
  const shelters = user?.shelters ?? [];

  useEffect(() => {
    if (shelters.length > 0 && !currentShelter) {
      setCurrentShelter(shelters[0]);
    }
  }, [shelters, currentShelter]);

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
