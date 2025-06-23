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
  VACCINES,
} from "@/features/pets/constants";
import { petStatusColorMap } from "@/features/pets/utils/pet-table-utils";
import { paths } from "@/config/paths";
import { Link } from "react-router";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export const PetDetailsPage = () => {
  const params = useParams();
  const petId = params.petId as string;
  const { pet, isLoading, isError, error } = usePetDetails(petId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to={paths.app.pets.path}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-amber-500"></div>
              <Text variant="muted">Cargando información de la mascota...</Text>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !pet) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to={paths.app.pets.path}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center">
              <Text variant="destructive" className="mb-4">
                {error?.message || "Error al cargar la mascota"}
              </Text>
              <Button asChild>
                <Link to={paths.app.pets.path}>Volver a la lista</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to={paths.app.pets.path}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <H1 weight="semibold" size="4xl" className="text-amber-900">
                {pet.name}
              </H1>
              <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                <Muted>ID: {pet.id}</Muted>
                <Muted>•</Muted>
                <Muted>Agregado el {formatDate(pet.createdAt)}</Muted>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex justify-center lg:flex-shrink-0">
              <PetAvatar pet={pet} />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <H2 weight="semibold" className="mb-4 text-xl text-amber-900">
                  Información de la mascota
                </H2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
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
                      <Text variant="large">
                        {PET_SPECIES_LABELS[pet.species]}
                      </Text>
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
                      <Badge
                        className={`mt-1 w-fit ${petStatusColorMap[pet.status]}`}
                      >
                        {PET_STATUS_LABELS[pet.status]}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
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
                </div>
              </div>

              {pet.description && (
                <div className="space-y-2">
                  <Separator />
                  <div className="flex flex-col">
                    <Text
                      element="label"
                      variant="small"
                      className="text-muted-foreground"
                    >
                      Descripción
                    </Text>
                    <Text variant="muted" className="mt-2 leading-relaxed">
                      {pet.description}
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <H2 weight="semibold" className="mb-4 text-xl text-amber-900">
                Salud
              </H2>
              <div className="flex flex-col gap-2">
                <Text
                  element="label"
                  variant="small"
                  className="text-muted-foreground"
                >
                  Vacunas
                </Text>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(VACCINES[pet.species]).map(([key, value]) => (
                    <Badge
                      key={key}
                      variant={
                        pet.vaccines?.includes(
                          key as keyof (typeof VACCINES)[typeof pet.species],
                        )
                          ? "default"
                          : "secondary"
                      }
                      className="w-fit"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <H2 weight="semibold" className="mb-4 text-xl text-amber-900">
                Eventos
              </H2>
              <Text variant="muted" className="mt-2 leading-relaxed">
                {pet.description}
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
