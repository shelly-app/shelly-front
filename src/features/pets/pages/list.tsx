import SectionError from "@/components/section-error";
import SectionLoader from "@/components/section-loader";
import { MainPetsTable } from "@/features/pets/components";
import { usePets } from "@/features/pets/hooks/use-pets";
import { useTranslation } from "react-i18next";

export const PetsListPage = () => {
  const { pets, isLoading, isError } = usePets();
  const { t } = useTranslation();

  if (isLoading) {
    return <SectionLoader text={t("app.pets.loading")} />;
  }

  if (isError) {
    return <SectionError text={t("app.pets.error")} />;
  }

  return (
    <section className="container mx-auto space-y-6 pt-5 md:pt-0">
      <h1 className="text-3xl font-bold">{t("app.pets.title")}</h1>
      <MainPetsTable data={pets} />
    </section>
  );
};
