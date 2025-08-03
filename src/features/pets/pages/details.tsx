import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PetStatusBadge, EditPetDialog } from "@/features/pets/components";
import {
  Clock,
  Heart,
  Palette,
  Ruler,
  User,
  Edit,
  Archive,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import petHero from "@/assets/images/lila.webp";
import { Pet } from "@/features/pets/types/pet";
import {
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
  PET_SPECIES_LABELS,
} from "@/features/pets/constants";
import { addDays, intlFormat, subDays } from "date-fns";

// interface PetEvent {
//   id: string;
//   type: "vaccine" | "vet_visit" | "adoption" | "arrival";
//   title: string;
//   date: string;
//   description?: string;
// }

// interface FutureEvent {
//   id: string;
//   type: "vaccine" | "vet_appointment" | "checkup";
//   title: string;
//   date: string;
//   description?: string;
// }

// Mock data for demonstration
const mockPetData: Pet = {
  id: 1,
  name: "Lila",
  species: "DOG",
  breed: "Golden Retriever",
  status: "IN_SHELTER",
  age: 3,
  sex: "MALE",
  size: "LARGE",
  colors: ["Marrón", "Crema", "Negro"],
  description:
    "Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He's great with kids and other dogs. Buddy is looking for an active family who can provide him with plenty of exercise and love.",
  vaccines: ["Rabia", "Triple 1er", "Triple 2da", "Triple 3ra"],
  photoUrl: petHero,
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  archivedAt: null,
};

const MOCK_EVENTS = [
  {
    id: "2",
    title: "Vacuna 2",
    date: intlFormat(new Date().getTime(), {
      locale: "es-AR",
    }),
    description: "Triple",
  },
  {
    id: "1",
    title: "Vacuna 1",
    date: intlFormat(subDays(new Date(), 15).getTime(), {
      locale: "es-AR",
    }),
    description: "Rabia",
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

export const PetDetailsPage = () => {
  const [pet, setPet] = useState<Pet>(mockPetData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  // const { toast } = useToast();

  const handleEditPet = (updatedPet: Pet) => {
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

  if (isArchived) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md text-center shadow-lg">
          <CardContent className="p-6">
            <Archive className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">Pet Archived</h2>
            <p className="text-muted-foreground mb-4">
              {pet.name} has been archived and is no longer active in the
              system.
            </p>
            <Button onClick={() => setIsArchived(false)} variant="outline">
              Restore Pet
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
          <div className="lg:w-1/3">
            <Card className="overflow-hidden py-0 shadow-lg">
              <CardContent className="p-0">
                <img
                  src={pet.photoUrl}
                  alt={pet.name}
                  className="h-80 w-full object-cover lg:h-96"
                />
              </CardContent>
            </Card>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 lg:w-2/3">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-foreground text-3xl font-bold">
                      {pet.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      {pet.breed} • {PET_SPECIES_LABELS[pet.species]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <PetStatusBadge status={pet.status} />
                    <Button
                      onClick={() => setIsEditDialogOpen(true)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={handleArchivePet}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive gap-2"
                    >
                      <Archive className="h-4 w-4" />
                      Archivar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-sm">Edad</p>
                      <p className="font-medium">{pet.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-sm">Sexo</p>
                      <p className="font-medium">
                        {PET_SEX_LABELS[pet.sex as keyof typeof PET_SEX_LABELS]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-sm">Tamaño</p>
                      <p className="font-medium">
                        {
                          PET_SIZE_LABELS[
                            pet.size as keyof typeof PET_SIZE_LABELS
                          ]
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-sm">Colores</p>
                      <div className="flex flex-wrap gap-1">
                        {pet.colors?.map((color) => (
                          <Badge
                            key={color}
                            variant="secondary"
                            className="text-xs"
                          >
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-primary h-5 w-5" />
                  Acerca de {pet.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {pet.description}
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
              <CardTitle className="text-lg">Vacunas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pet.vaccines?.map((vaccine) => (
                  <div key={vaccine} className="flex items-center gap-2">
                    <div className="bg-success h-2 w-2 rounded-full"></div>
                    <span className="text-sm">{vaccine}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events Timeline */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Eventos recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_EVENTS.map((event) => (
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
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Future Events */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_FUTURE_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="border-warning border-l-2 pl-3"
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialog */}
        <EditPetDialog
          pet={pet}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleEditPet}
        />
      </div>
    </div>
  );
};
