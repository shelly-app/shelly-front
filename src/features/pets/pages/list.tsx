import { MainPetsTable } from "@/features/pets/components";
import { usePets } from "@/features/pets/hooks/use-pets";

export const PetsListPage = () => {
  const { pets, isLoading, isError } = usePets();

  if (isLoading) {
    return (
      <section className="container mx-auto space-y-6 pt-5 md:pt-0">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-amber-500"></div>
            <p className="text-muted-foreground">Cargando mascotas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container mx-auto space-y-6 pt-5 md:pt-0">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-destructive mb-4">
              Error al cargar las mascotas
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto space-y-6 pt-5 md:pt-0">
      <h1 className="text-3xl font-bold">Mascotas</h1>
      <MainPetsTable data={pets} />
    </section>
  );
};
