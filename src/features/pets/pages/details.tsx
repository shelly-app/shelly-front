import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Text, H1, Muted, H2 } from "@/components/ui/text";
import { PetAvatar } from "@/components/ui/pet-avatar";
import { usePetDetails } from "@/features/pets/hooks/use-pet-details";
import {
  PET_SPECIES_LABELS,
  PET_STATUS_LABELS,
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
} from "@/features/pets/constants";
import { petStatusColorMap } from "@/features/pets/utils/pet-table-utils";
import { paths } from "@/config/paths";
import { Link } from "react-router";
import { formatDate } from "@/lib/utils";

export const PetDetailsPage = () => {
  const params = useParams();
  const petId = params.petId as string;
  const { pet, isLoading, isError, error } = usePetDetails(petId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-amber-500"></div>
          <Text variant="muted">Cargando mascota...</Text>
        </div>
      </div>
    );
  }

  if (isError || !pet) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Text variant="destructive" className="mb-4">
            {error?.message || "Error al cargar la mascota"}
          </Text>
          <Button asChild>
            <Link to={paths.app.pets.path}>Volver a la lista</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="flex p-8">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-col items-center justify-start gap-2 md:flex-row md:items-baseline">
          <H1 weight="semibold" className="text-2xl text-amber-900 lg:text-2xl">
            {pet.name}
          </H1>
          <div className="flex gap-2">
            <Muted className="hidden md:block">•</Muted>
            <Muted>ID: {pet.id}</Muted>
            <Muted>•</Muted>
            <Muted>Agregado el {formatDate(pet.createdAt)}</Muted>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 p-0 lg:flex-row">
          <div className="flex justify-center lg:items-baseline lg:justify-baseline">
            <PetAvatar pet={pet} />
          </div>
          <div className="flex flex-col gap-4">
            <H2 weight="semibold" className="text-xl text-amber-900 lg:text-xl">
              Información de la mascota
            </H2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Text
                  element="label"
                  variant="small"
                  className="text-muted-foreground"
                >
                  Nombre
                </Text>
                <Text variant="large" weight="semibold">
                  {pet.name}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text
                  element="label"
                  variant="small"
                  className="text-muted-foreground"
                >
                  Especie
                </Text>
                <Text variant="large">{PET_SPECIES_LABELS[pet.species]}</Text>
              </div>
              <div className="flex flex-col">
                <Text
                  element="label"
                  variant="small"
                  className="text-muted-foreground"
                >
                  Raza
                </Text>
                <Text variant="large">{pet.breed}</Text>
              </div>
              <div className="flex flex-col">
                <Text
                  element="label"
                  variant="small"
                  className="text-muted-foreground"
                >
                  Estado
                </Text>
                <Badge className={`mt-1 ${petStatusColorMap[pet.status]}`}>
                  {PET_STATUS_LABELS[pet.status]}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              {pet.age && (
                <div className="flex flex-col">
                  <Text
                    element="label"
                    variant="small"
                    className="text-muted-foreground"
                  >
                    Edad
                  </Text>
                  <Text variant="large">{pet.age} años</Text>
                </div>
              )}
              {pet.sex && (
                <div className="flex flex-col">
                  <Text
                    element="label"
                    variant="small"
                    className="text-muted-foreground"
                  >
                    Sexo
                  </Text>
                  <Text variant="large">{PET_SEX_LABELS[pet.sex]}</Text>
                </div>
              )}
              {pet.size && (
                <div className="flex flex-col">
                  <Text
                    element="label"
                    variant="small"
                    className="text-muted-foreground"
                  >
                    Tamaño
                  </Text>
                  <Text variant="large">{PET_SIZE_LABELS[pet.size]}</Text>
                </div>
              )}
              {pet.color && (
                <div className="flex flex-col">
                  <Text
                    element="label"
                    variant="small"
                    className="text-muted-foreground"
                  >
                    Color
                  </Text>
                  <Text variant="large">{pet.color}</Text>
                </div>
              )}
            </div>

            {/* Description */}
            {pet.description && (
              <>
                <Separator />
                <div className="flex flex-col">
                  <Text
                    element="label"
                    variant="small"
                    className="text-muted-foreground"
                  >
                    Descripción
                  </Text>
                  <Text variant="muted" className="mt-2">
                    {pet.description}
                  </Text>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
