import { useState } from "react";
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
import { DetailedPet, Pet } from "@/features/pets/types/pet";
import {
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
  PET_SPECIES_LABELS,
  PET_STATUS_LABELS,
} from "@/features/pets/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePetDetails } from "@/features/pets/hooks/use-pet-details";
import { useUpdatePet } from "@/features/pets/hooks/use-update-pet";
import { useDeletePet } from "@/features/pets/hooks/use-delete-pet";
import { calculateAge } from "@/features/pets/utils/age";
import { PetAvatar } from "@/components/ui/pet-avatar";
import { paths } from "@/config/paths";

// Skeleton component shown while fetching data
const PetDetailsSkeleton = () => (
  <div className="min-h-screen py-6">
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const { petId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pet, isLoading } = usePetDetails(petId ?? "");
  const { updatePetAsync } = useUpdatePet(Number(petId));
  const { deletePetAsync } = useDeletePet(Number(petId));

  const handleEditPet = async (
    updatedPet: Pet,
    vaccines: string[],
    photoKey?: string,
  ) => {
    await updatePetAsync({
      name: updatedPet.name,
      specie: updatedPet.specie,
      status: updatedPet.status,
      breed: updatedPet.breed,
      birthDate: updatedPet.birthDate ?? undefined,
      sex: updatedPet.sex,
      size: updatedPet.size || undefined,
      colors: updatedPet.colors,
      description: updatedPet.description,
      vaccines,
      ...(photoKey !== undefined ? { photoKey } : {}),
    });
  };

  const handleArchivePet = async () => {
    await deletePetAsync();
    navigate(paths.app.pets.path);
  };

  const translateValue = (
    labels: Record<string, string>,
    value?: string | null,
  ) => (value ? t(labels[value] ?? value) : "");

  const getEventContent = (event: DetailedPet["events"][number]) => {
    const from = event.metadata?.from;
    const to = event.metadata?.to;
    // Legacy change events created before structured metadata existed only have
    // an untranslated free-text description, so show the translated title alone.
    const hasMetadata = from != null || to != null;

    switch (event.type) {
      case "status_change":
        return {
          title: t("app.pets.events.status_change.title"),
          description: hasMetadata
            ? t("app.pets.events.status_change.description", {
                from: translateValue(PET_STATUS_LABELS, from),
                to: translateValue(PET_STATUS_LABELS, to),
              })
            : null,
        };
      case "size_change":
        return {
          title: t("app.pets.events.size_change.title"),
          description: hasMetadata
            ? t("app.pets.events.size_change.description", {
                from: translateValue(PET_SIZE_LABELS, from),
                to: translateValue(PET_SIZE_LABELS, to),
              })
            : null,
        };
      case "name_change":
        return {
          title: t("app.pets.events.name_change.title"),
          description: hasMetadata
            ? t("app.pets.events.name_change.description", {
                from: from ?? "",
                to: to ?? "",
              })
            : null,
        };
      default:
        return { title: event.name, description: event.description };
    }
  };

  if (isLoading) {
    return <PetDetailsSkeleton />;
  }

  if (!pet) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center py-6">
        <Card className="max-w-md text-center shadow-lg">
          <CardContent className="p-6">
            <Archive className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">
              {t("app.pets.details.archived.title")}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("app.pets.details.archived.description", { name: "" })}
            </p>
            <Button
              onClick={() => navigate(paths.app.pets.path)}
              variant="outline"
            >
              {t("app.pets.back")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const age = calculateAge(pet.birthDate, t);

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Pet Image */}
          <div className="flex flex-1 items-center justify-center lg:aspect-square">
            <Card className="flex aspect-square max-h-[500px] w-full items-center justify-center overflow-hidden py-0 shadow-lg lg:aspect-auto lg:h-full">
              <CardContent className="flex h-full w-full items-center justify-center">
                <PetAvatar
                  pet={pet}
                  size="lg"
                  className="h-full w-full rounded-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Basic Info */}
          <div className="flex-2 space-y-4 lg:w-2/3">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-foreground text-3xl font-bold">
                      {pet.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      {pet.breed && pet.breed !== "" ? `${pet.breed} • ` : ""}
                      {t(
                        PET_SPECIES_LABELS[
                          pet.specie as keyof typeof PET_SPECIES_LABELS
                        ] ?? pet.specie,
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
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
                      {t("app.pets.details.edit")}
                    </Button>
                    <Button
                      onClick={handleArchivePet}
                      variant="outline"
                      className="text-destructive hover:text-destructive gap-2 px-2! py-1 text-xs lg:px-3 lg:py-2 lg:text-sm"
                    >
                      <Archive className="h-4 w-4" />
                      {t("app.pets.details.archive")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex w-full flex-wrap justify-between gap-4">
                  <div className="flex gap-2">
                    <Clock className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {t("app.pets.details.age")}
                      </p>
                      {age ? (
                        <p className="font-medium">{age}</p>
                      ) : (
                        <p className="text-muted-foreground text-sm">--</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <User className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {t("app.pets.details.sex")}
                      </p>
                      {pet.sex ? (
                        <p className="font-medium">
                          {t(
                            PET_SEX_LABELS[
                              pet.sex as keyof typeof PET_SEX_LABELS
                            ] ?? pet.sex,
                          )}
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-sm">--</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Ruler className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {t("app.pets.details.size")}
                      </p>
                      {pet.size ? (
                        <p className="font-medium">
                          {t(
                            PET_SIZE_LABELS[
                              pet.size as keyof typeof PET_SIZE_LABELS
                            ] ?? pet.size,
                          )}
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-sm">--</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Palette className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-muted-foreground text-sm">
                        {t("app.pets.details.colors")}
                      </p>
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
                  {t("app.pets.details.about", { name: pet.name })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    !pet.description && "italic",
                  )}
                >
                  {pet.description ||
                    t("app.pets.details.no_description", { name: pet.name })}
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
                {t("app.pets.details.vaccines")}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              {pet.vaccinations && pet.vaccinations.length > 0 ? (
                <ol className="border-border relative space-y-4 border-l">
                  {pet.vaccinations.map((v, i) => (
                    <li key={i} className="ml-4">
                      <div className="border-background bg-primary absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border" />
                      <p className="text-sm leading-tight font-medium">
                        {v.vaccine}
                      </p>
                      <time className="text-muted-foreground text-xs">
                        {new Date(v.administeredAt).toLocaleDateString("es-AR")}
                      </time>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {t("app.pets.details.no_vaccines")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Events Timeline */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="text-primary h-5 w-5" />
                {t("app.pets.details.recent_events")}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              {pet.events && pet.events.length > 0 ? (
                <ol className="border-border relative space-y-4 border-l">
                  {pet.events.map((event) => {
                    const { title, description } = getEventContent(event);
                    return (
                      <li key={event.id} className="ml-4">
                        <div className="border-background bg-primary absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border" />
                        <p className="text-sm leading-tight font-medium">
                          {title}
                        </p>
                        <time className="text-muted-foreground text-xs">
                          {new Date(event.createdAt).toLocaleDateString(
                            "es-AR",
                          )}
                        </time>
                        {description && (
                          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                            {description}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {t("app.pets.details.no_recent_events")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Shelter Info */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="text-primary h-5 w-5" />
                {t("app.pets.details.shelter_info")}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <div className="space-y-2">
                <p className="text-sm font-medium">{pet.shelter.name}</p>
                <p className="text-muted-foreground text-sm">
                  {pet.shelter.city}
                </p>
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
