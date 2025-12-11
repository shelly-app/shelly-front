import SectionError from "@/components/section-error";
import SectionLoader from "@/components/section-loader";
import { NavigationLayout } from "@/components/layouts/navigation-layout";
import { SheltersTable } from "@/features/shelters/components";
import { usePublicShelters } from "@/features/shelters/hooks/use-shelters";
import { useTranslation } from "react-i18next";

export const SheltersListPage = () => {
  const { shelters, isLoading, isError } = usePublicShelters();
  const { t } = useTranslation();

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
        <div>
          <h1 className="text-3xl font-bold">{t("shelters.title")}</h1>
          <p className="text-muted-foreground">{t("shelters.subtitle")}</p>
        </div>
        <SheltersTable data={shelters} />
      </section>
    </NavigationLayout>
  );
};
