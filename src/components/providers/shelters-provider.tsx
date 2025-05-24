import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Shelter } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

type SheltersContextProps = {
  shelters: Shelter[];
  currentShelter: Shelter | null;
  setCurrentShelter: React.Dispatch<React.SetStateAction<Shelter | null>>;
  isLoading: boolean;
};

// Shelters should be retrieved from a context or a global state.
const MOCK_SHELTERS: Shelter[] = [
  {
    id: 1,
    name: 'Adopta un Camperito',
    address: 'Calle Falsa 123',
    phone: '1243312421',
    email: 'example@example.com',
    website: 'example.com',
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    name: 'Zaguastes',
    address: 'Calle Falsa 321',
    phone: '998876667',
    email: 'example1@example.com',
    website: 'example1.com',
    createdAt: new Date().getTime(),
  },
];

const SheltersContext = createContext<SheltersContextProps | null>(null);

const SheltersProvider = ({ children }: { children: ReactNode }) => {
  const [currentShelter, setCurrentShelter] = useState<Shelter | null>(null);

  const {
    // data: shelters = [],
    isLoading,
    // TODO: Handle errors properly
    // isError,
  } = useQuery({
    queryKey: ['shelters'],
    queryFn: async () => {
      // const response = await fetch('/api/shelters');
      // // TODO: Handle errors properly
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const data = await response.json();

      // setCurrentShelter(data[0] || null);

      // return data as Shelter[];
      setCurrentShelter(MOCK_SHELTERS[0] || null);
      return MOCK_SHELTERS;
    },
  });

  const value = useMemo(
    () => ({
      shelters: MOCK_SHELTERS,
      currentShelter,
      setCurrentShelter,
      isLoading,
    }),
    // [shelters, currentShelter, isLoading],
    [currentShelter, isLoading],
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
    throw new Error('useShelters must be used within a SheltersProvider.');
  }

  return context;
};

export { SheltersProvider, useShelters };
