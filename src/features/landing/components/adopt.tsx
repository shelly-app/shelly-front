import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2, H3, Lead, Paragraph } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { HeartPlus, House, PawPrint, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShellyGradient } from "@/components/ui/shelly-gradient";
import { useTranslation } from "react-i18next";
import { paths } from "@/config/paths";

const ADOPT_FEATURES = [
  {
    i18nKey: "unconditional_love",
    icon: HeartPlus,
    iconColor: "text-red-500",
    bgColor: "from-red-100 to-red-50",
  },
  {
    i18nKey: "save_a_life",
    icon: House,
    iconColor: "text-green-600",
    bgColor: "from-green-100 to-green-50",
  },
  {
    i18nKey: "faithful_company",
    icon: PawPrint,
    iconColor: "text-sky-600",
    bgColor: "from-sky-100 to-sky-50",
  },
] as const;

type AdoptFeature = (typeof ADOPT_FEATURES)[number];

const AdoptFeatureCard = ({ feature }: { feature: AdoptFeature }) => {
  const Icon = feature.icon;
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        feature.bgColor,
      )}
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="rounded-xl bg-white/90 p-4 shadow-md transition-transform duration-300 group-hover:scale-110">
        <Icon className={cn("h-8 w-8", feature.iconColor)} />
      </div>
      <H3 className="text-xl font-semibold">
        {t(`landing.adopt.features.${feature.i18nKey}.title`)}
      </H3>
      <Separator orientation="horizontal" className="w-full" />
      <Paragraph className="text-gray-600">
        {t(`landing.adopt.features.${feature.i18nKey}.description`)}
      </Paragraph>
    </div>
  );
};

export const Adopt = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCtaClick = () => {
    navigate(paths.shelters.path);
  };

  return (
    <section
      id="adopt"
      className="relative flex min-h-[800px] flex-col items-center justify-center gap-16 overflow-hidden bg-gradient-to-b from-amber-200 to-amber-100 px-4 pb-32"
    >
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <H2 className="text-center text-4xl font-bold md:text-5xl">
          {t("landing.adopt.title")}{" "}
          <ShellyGradient variant="h2" size="5xl">
            {t("brand.name")}
          </ShellyGradient>
        </H2>
        <Lead className="max-w-2xl text-lg md:text-xl">
          {t("landing.adopt.subtitle")}
        </Lead>
        <Button size="lg" className="mt-4" onClick={handleCtaClick}>
          {t("landing.adopt.cta")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator className="w-full max-w-3xl bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {ADOPT_FEATURES.map((feature) => (
          <AdoptFeatureCard key={feature.i18nKey} feature={feature} />
        ))}
      </div>
    </section>
  );
};
