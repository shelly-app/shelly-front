import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorBadge } from "@/features/pets/components/color-badge";
import { Button } from "@/components/ui/button";
import { PetStatusBadge, PetForm } from "@/features/pets/components";
import {
  Clock,
  Palette,
  Ruler,
  User,
  Edit,
  Archive,
  HeartPlus,
  BookOpenText,
  CalendarDays,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import lilaImage from "@/assets/images/lila.webp";
import limonImage from "@/assets/images/limon.webp";
import { Pet } from "@/features/pets/types/pet";
import {
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
  PET_SPECIES_LABELS,
  VACCINES,
} from "@/features/pets/constants";
import { addDays, intlFormat, subDays } from "date-fns";
import { BulletList } from "@/components/ui/bullet-list";
import { Image } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

// Mock data for demonstration (simulates API response)
const mockPetDataLila: Pet = {
  id: 1,
  name: "Lila",
  species: "DOG",
  breed: "Mestiza",
  status: "ADOPTED",
  age: 6,
  sex: "FEMALE",
  size: "LARGE",
  colors: ["Canela", "Cervato", "Negro"],
  description:
    "Lila es una perrita muy cariñosa y juguetona. Le encanta jugar con los niños y es muy buena con otros perros.",
  vaccines: ["rabia", "sextuple1"],
  photoUrl: lilaImage,
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  archivedAt: null,
};

const mockPetDataLimon: Pet = {
  id: 2,
  name: "Limón",
  species: "DOG",
  breed: "Mestizo, Labrador, Pitbull",
  status: "ADOPTED",
  age: 5,
  sex: "MALE",
  size: "MEDIUM",
  colors: ["Blanco", "Cervato"],
  description:
    "Limón es un perro que puede parecer ansioso y distante en un principio, pero una vez que se le conoce, se hace muy cariñoso y leal.",
  vaccines: ["rabia", "sextuple1"],
  photoUrl: limonImage,
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  archivedAt: null,
};

const MOCK_EVENTS = [
  {
    id: "2",
    title: "Vacunación",
    date: intlFormat(new Date().getTime(), {
      locale: "es-AR",
    }),
    description: "Lila recibió sus primeras vacunas",
  },
  {
    id: "1",
    title: "Ingreso al refugio",
    date: intlFormat(subDays(new Date(), 15).getTime(), {
      locale: "es-AR",
    }),
    description: "Lila fue recibida en el refugio",
  },
];

const MOCK_FUTURE_EVENTS = [
  {
    id: "1",
    title: "Veterinaria",
    date: intlFormat(addDays(new Date(), 15).getTime(), {
      locale: "es-AR",
    }),
    description: "Visita de control",
  },
];

// Skeleton component shown while fetching data
const PetDetailsSkeleton = () => (
  <div className="min-h-screen p-6">
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header Section Skeleton */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <Skeleton className="h-72 w-full lg:w-1/3" />
        <div className="w-full space-y-4 lg:w-2/3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
      {/* Bottom Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  </div>
);

export const PetDetailsPage = () => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { petId } = useParams();

  // const { toast } = useToast();

  const handleEditPet = (updatedPet: Pet) => {
    console.log("updatedPet", updatedPet);
    setPet(updatedPet);
    // toast({
    //   title: "Pet Updated",
    //   description: `${updatedPet.name}'s information has been successfully updated.`,
    // });
  };

  const handleArchivePet = () => {
    setIsArchived(true);
    // toast({
    //   title: "Pet Archived",
    //   description: `${pet.name} has been archived successfully.`,
    // });
  };

  // Simulate data fetching
  useEffect(() => {
    // Replace with real API call
    const timer = setTimeout(() => {
      setPet(petId === "2" ? mockPetDataLimon : mockPetDataLila);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PetDetailsSkeleton />;
  }

  if (isArchived || !pet) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md text-center shadow-lg">
          <CardContent className="p-6">
            <Archive className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">Mascota archivada</h2>
            <p className="text-muted-foreground mb-4">
              {pet?.name} ha sido archivada y ya no está disponible en el
              sistema.
            </p>
            <Button onClick={() => setIsArchived(false)} variant="outline">
              Restaurar mascota
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Pet Image */}
          <div className="h-[300px] lg:aspect-square lg:h-auto">
            <Card className="h-full overflow-hidden py-0 shadow-lg">
              <CardContent className="h-full p-0">
                <Image
                  alt={pet.name}
                  src={pet.photoUrl}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 lg:w-2/3">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-foreground text-3xl font-bold">
                      {pet.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      {pet.breed && pet.breed !== "" ? `${pet.breed} • ` : ""}
                      {PET_SPECIES_LABELS[pet.species]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PetStatusBadge
                      status={pet.status}
                      className="px-2! py-1 text-xs lg:px-3 lg:py-2 lg:text-sm"
                    />
                    <Button
                      onClick={() => setIsEditDialogOpen(true)}
                      variant="outline"
                      className="gap-2 px-2! py-1 text-xs lg:px-3 lg:py-2 lg:text-sm"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={handleArchivePet}
                      variant="outline"
                      className="text-destructive hover:text-destructive gap-2 px-2! py-1 text-xs lg:px-3 lg:py-2 lg:text-sm"
                    >
                      <Archive className="h-4 w-4" />
                      Archivar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex w-full flex-wrap justify-between gap-4">
                  <div className="flex gap-2">
                    <Clock className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-sm">Edad</p>
                      {pet.age ? (
                        <p className="font-medium">
                          {pet.age} {pet.age === 1 ? "año" : "años"}
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-sm">--</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <User className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-sm">Sexo</p>
                      {pet.sex ? (
                        <p className="font-medium">
                          {
                            PET_SEX_LABELS[
                              pet.sex as keyof typeof PET_SEX_LABELS
                            ]
                          }
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-sm">--</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Ruler className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-sm">Tamaño</p>
                      {pet.size ? (
                        <p className="font-medium">
                          {
                            PET_SIZE_LABELS[
                              pet.size as keyof typeof PET_SIZE_LABELS
                            ]
                          }
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-sm">--</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Palette className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-muted-foreground text-sm">Colores</p>
                      <div className="flex flex-wrap gap-1">
                        {pet.colors && pet.colors.length > 0 ? (
                          pet.colors?.map((color) => (
                            <ColorBadge
                              key={color}
                              color={color}
                              className="text-xs"
                            />
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">--</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpenText className="text-primary h-5 w-5" />
                  Acerca de {pet.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    !pet.description && "italic",
                  )}
                >
                  {pet.description || `${pet.name} no tiene descripción aún.`}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Vaccines */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HeartPlus className="text-primary h-5 w-5" />
                Vacunas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pet.vaccines && pet.vaccines.length > 0 ? (
                  <BulletList
                    variant="success"
                    options={
                      pet.vaccines?.map(
                        (vaccine) =>
                          VACCINES[pet.species][
                            vaccine as keyof (typeof VACCINES)[typeof pet.species]
                          ],
                      ) || []
                    }
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No hay vacunas registradas
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Events Timeline */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="text-primary h-5 w-5" />
                Eventos Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_EVENTS.length > 0 ? (
                  MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="border-l-2 pl-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.title}</p>
                        <span className="text-muted-foreground text-xs">
                          {event.date}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {event.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No hay eventos recientes
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Future Events */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="text-primary h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_FUTURE_EVENTS.length > 0 ? (
                  MOCK_FUTURE_EVENTS.map((event) => (
                    <div
                      key={event.id}
                      className="border-primary border-l-2 pl-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.title}</p>
                        <span className="text-muted-foreground text-xs">
                          {event.date}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {event.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No hay eventos próximos
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialog */}
        <PetForm
          mode="edit"
          pet={pet}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleEditPet}
        />
      </div>
    </div>
  );
};
