import SectionError from "@/components/section-error";
import SectionLoader from "@/components/section-loader";
import { MainPetsTable } from "@/features/pets/components";
import { usePets } from "@/features/pets/hooks/use-pets";

export const PetsListPage = () => {
  const { pets, isLoading, isError } = usePets();

  if (isLoading) {
    return <SectionLoader text="Cargando mascotas..." />;
  }

  if (isError) {
    return <SectionError text="Error al cargar las mascotas" />;
  }

  return (
    <section className="container mx-auto space-y-6 pt-5 md:pt-0">
      <h1 className="text-3xl font-bold">Mascotas</h1>
      <MainPetsTable data={pets} />
    </section>
  );
};
