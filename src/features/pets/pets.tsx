import { MainPetsTable } from './components/main-pets-table';
import { usePets } from './hooks/use-pets';

export const Pets = () => {
  const { pets } = usePets();

  return (
    <div className="container mx-auto py-10">
      <MainPetsTable data={pets} />
    </div>
  );
};
