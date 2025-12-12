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
import { Pet } from "@/features/pets/types/pet";
import {
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
  PET_SPECIES_LABELS,
  VACCINES,
} from "@/features/pets/constants";
import { intlFormat } from "date-fns";
import { BulletList } from "@/components/ui/bullet-list";
import { Image } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePetDetails } from "@/features/pets/hooks/use-pet-details";

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
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const { petId } = useParams();
  const { t } = useTranslation();

  // Fetch pet details from API
  const { pet, isLoading, isError } = usePetDetails(petId || "");

  const handleEditPet = (updatedPet: Pet) => {
    console.log("updatedPet", updatedPet);
    // Pet will be automatically refetched by React Query
  };

  const handleArchivePet = () => {
    setIsArchived(true);
  };

  if (isLoading) {
    return <PetDetailsSkeleton />;
  }

  if (isError || !pet) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center py-6">
        <Card className="max-w-md text-center shadow-lg">
          <CardContent className="p-6">
            <Archive className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">Pet Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The pet you're looking for could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isArchived) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center py-6">
        <Card className="max-w-md text-center shadow-lg">
          <CardContent className="p-6">
            <Archive className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">
              {t("app.pets.details.archived.title")}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("app.pets.details.archived.description", { name: pet?.name })}
            </p>
            <Button onClick={() => setIsArchived(false)} variant="outline">
              {t("app.pets.details.archived.restore")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Separate past and future events
  const now = new Date();
  const pastEvents =
    pet.events
      ?.filter((event) => new Date(event.dateTime) <= now)
      .sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
      ) || [];
  const futureEvents =
    pet.events
      ?.filter((event) => new Date(event.dateTime) > now)
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
      ) || [];

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Pet Photos */}
          <div className="flex-1 space-y-4">
            {/* Main Photo */}
            <div className="h-[300px] lg:aspect-square lg:h-auto">
              <Card className="h-full overflow-hidden py-0 shadow-lg">
                <CardContent className="h-full max-h-[500px] p-0">
                  <Image
                    alt={pet.name}
                    src={pet.photoUrl || "/placeholder-pet.jpg"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Additional Photos Gallery */}
            {pet.photos && pet.photos.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {pet.photos.slice(1, 4).map((photoUrl, index) => (
                  <Card key={index} className="overflow-hidden shadow-md">
                    <CardContent className="p-0">
                      <Image
                        alt={`${pet.name} photo ${index + 2}`}
                        src={photoUrl}
                        className="aspect-square h-full w-full object-cover"
                        loading="lazy"
                      />
                    </CardContent>
                  </Card>
                ))}
                {pet.photos.length > 4 && (
                  <Card className="relative overflow-hidden shadow-md">
                    <CardContent className="p-0">
                      <Image
                        alt={`${pet.name} more photos`}
                        src={pet.photos[4]}
                        className="aspect-square h-full w-full object-cover opacity-50"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-lg font-bold text-white">
                          +{pet.photos.length - 4}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
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
                      {t(PET_SPECIES_LABELS[pet.species])}
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
                      {pet.age ? (
                        <p className="font-medium">
                          {t(
                            pet.age === 1
                              ? "app.pets.details.year"
                              : "app.pets.details.years_plural",
                            { count: pet.age },
                          )}
                        </p>
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
                            ],
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
                            ],
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
            <CardContent>
              <div className="space-y-2">
                {pet.vaccines && pet.vaccines.length > 0 ? (
                  <BulletList
                    variant="success"
                    options={
                      pet.vaccines?.map((vaccine) =>
                        t(
                          VACCINES[pet.species][
                            vaccine as keyof (typeof VACCINES)[typeof pet.species]
                          ],
                        ),
                      ) || []
                    }
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {t("app.pets.details.no_vaccines")}
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
                {t("app.pets.details.recent_events")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastEvents.length > 0 ? (
                  pastEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="border-l-2 pl-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.name}</p>
                        <span className="text-muted-foreground text-xs">
                          {intlFormat(new Date(event.dateTime), {
                            locale: "es-AR",
                          })}
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
                    {t("app.pets.details.no_recent_events")}
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
                {t("app.pets.details.future_events")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {futureEvents.length > 0 ? (
                  futureEvents.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="border-primary border-l-2 pl-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.name}</p>
                        <span className="text-muted-foreground text-xs">
                          {intlFormat(new Date(event.dateTime), {
                            locale: "es-AR",
                          })}
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
                    {t("app.pets.details.no_future_events")}
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
