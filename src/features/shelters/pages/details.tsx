import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, MapPin, Mail, Phone, Globe, PawPrint } from "lucide-react";

import SectionError from "@/components/section-error";
import SectionLoader from "@/components/section-loader";
import { NavigationLayout } from "@/components/layouts/navigation-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { ShelterPetsTable } from "@/features/shelters/components/shelter-pets-table";
import { useShelterDetails } from "@/features/shelters/hooks/use-shelter-details";
import { useShelterPets } from "@/features/shelters/hooks/use-shelter-pets";
import { getNameInitials } from "@/lib/utils";
import { paths } from "@/config/paths";

export const ShelterDetailsPage = () => {
  const { shelterId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const shelterIdNum = Number(shelterId);
  const { shelter, isLoading: shelterLoading } =
    useShelterDetails(shelterIdNum);
  const {
    pets,
    isLoading: petsLoading,
    isError: petsError,
  } = useShelterPets(shelterIdNum);

  const isLoading = shelterLoading || petsLoading;

  if (isLoading) {
    return (
      <NavigationLayout>
        <SectionLoader text={t("shelters.details.loading")} />
      </NavigationLayout>
    );
  }

  if (!shelter) {
    return (
      <NavigationLayout>
        <SectionError text={t("shelters.details.not_found")} />
      </NavigationLayout>
    );
  }

  if (petsError) {
    return (
      <NavigationLayout>
        <SectionError text={t("shelters.details.error_pets")} />
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout>
      <section className="container mx-auto max-w-6xl space-y-8 px-4 pt-28 pb-28">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(paths.shelters.path)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("shelters.details.back_to_shelters")}
        </Button>

        {/* Shelter Header Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar className="h-20 w-20 shrink-0">
                <AvatarImage src={shelter.logoUrl} alt={shelter.name} />
                <AvatarFallback className="text-xl font-medium">
                  {getNameInitials(shelter.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <CardTitle className="text-2xl font-bold">
                    {shelter.name}
                  </CardTitle>
                  <Badge variant="secondary" className="gap-1">
                    <PawPrint className="h-3 w-3" />
                    {t("shelters.details.pets_available", {
                      count: pets.length,
                    })}
                  </Badge>
                </div>
                {shelter.description && (
                  <Text variant="secondary" className="text-sm">
                    {shelter.description}
                  </Text>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <Text size="xs" variant="secondary">
                    {t("shelters.details.location")}
                  </Text>
                  <Text size="sm" weight="medium" className="truncate">
                    {shelter.city}, {shelter.country}
                  </Text>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <Text size="xs" variant="secondary">
                    {t("shelters.details.email")}
                  </Text>
                  <a
                    href={`mailto:${shelter.email}`}
                    className="text-primary block truncate text-sm font-medium hover:underline"
                  >
                    {shelter.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <Phone className="text-primary h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <Text size="xs" variant="secondary">
                    {t("shelters.details.phone")}
                  </Text>
                  <a
                    href={`tel:${shelter.phone}`}
                    className="block truncate text-sm font-medium hover:underline"
                  >
                    {shelter.phone}
                  </a>
                </div>
              </div>

              {/* Website */}
              {shelter.website && (
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Globe className="text-primary h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <Text size="xs" variant="secondary">
                      {t("shelters.details.website")}
                    </Text>
                    <a
                      href={shelter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary block truncate text-sm font-medium hover:underline"
                    >
                      {shelter.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Pets Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t("shelters.details.available_pets")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("shelters.details.click_to_adopt")}
          </p>
          <ShelterPetsTable data={pets} shelter={shelter} />
        </div>
      </section>
    </NavigationLayout>
  );
};
