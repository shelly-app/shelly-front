import SectionError from "@/components/section-error";
import SectionLoader from "@/components/section-loader";
import { SheltersTable } from "@/features/shelters/components";
import { usePublicShelters } from "@/features/shelters/hooks/use-shelters";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

export const SheltersListPage = () => {
  const { shelters, isLoading, isError } = usePublicShelters();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) {
    return <SectionLoader text={t("shelters.loading")} />;
  }

  if (isError) {
    return <SectionError text={t("shelters.error")} />;
  }

  return (
    <section className="container mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(paths.home.path)}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{t("shelters.title")}</h1>
          <p className="text-muted-foreground">{t("shelters.subtitle")}</p>
        </div>
      </div>
      <SheltersTable data={shelters} />
    </section>
  );
};
