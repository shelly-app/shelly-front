import { MainPetsTable } from './components/main-pets-table';
import { usePets } from './hooks/use-pets';

export const Pets = () => {
  const { pets } = usePets();

  return (
    <section className="container mx-auto py-10">
      <MainPetsTable data={pets} />
    </section>
  );
};
