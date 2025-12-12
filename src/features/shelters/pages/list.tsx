import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import SectionError from "@/components/section-error";
import SectionLoader from "@/components/section-loader";
import { NavigationLayout } from "@/components/layouts/navigation-layout";
import { Button } from "@/components/ui/button";
import { SheltersTable } from "@/features/shelters/components";
import { usePublicShelters } from "@/features/shelters/hooks/use-shelters";
import { useTranslation } from "react-i18next";
import { paths } from "@/config/paths";

export const SheltersListPage = () => {
  const { shelters, isLoading, isError } = usePublicShelters();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <NavigationLayout>
        <SectionLoader text={t("shelters.loading")} />
      </NavigationLayout>
    );
  }

  if (isError) {
    return (
      <NavigationLayout>
        <SectionError text={t("shelters.error")} />
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout>
      <section className="container mx-auto max-w-6xl space-y-6 px-4 pt-28 pb-12">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(paths.home.path)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("shelters.back_to_home")}
        </Button>

        <div>
          <h1 className="text-3xl font-bold">{t("shelters.title")}</h1>
          <p className="text-muted-foreground">{t("shelters.subtitle")}</p>
        </div>
        <SheltersTable data={shelters} />
      </section>
    </NavigationLayout>
  );
};
