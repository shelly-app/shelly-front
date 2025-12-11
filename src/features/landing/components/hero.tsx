import { Button } from "@/components/ui/button";
import { H1, Lead } from "@/components/ui/text";
import { PetShowcaseCard } from "@/features/landing/components/pet-showcase-card";
import { ArrowDown } from "lucide-react";
import LimonImage from "@/assets/images/limon.webp";
import LilaImage from "@/assets/images/lila.webp";
import LuciferImage from "@/assets/images/lucifer.webp";
import { useMobile } from "@/hooks/use-media-queries";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export const Hero = () => {
  const isMobile = useMobile();
  const { scrollToSection } = useHashScroll();
  const { t } = useTranslation();

  const handleCtaClick = () => {
    scrollToSection("#contact");
  };

  return (
    <section
      id="hero"
      className="relative grid min-h-[93vh] place-items-center overflow-hidden bg-gradient-to-b from-amber-200/80 to-amber-300/70"
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-20 md:flex-row md:gap-8 md:py-24">
        <div className="flex flex-1 flex-col gap-6 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <Trans
                i18nKey="landing.hero.title"
                components={{
                  span: <span className="text-amber-600" />,
                }}
              />
            </H1>
            <Lead className="text-lg md:text-xl">
              {t("landing.hero.subtitle")}
            </Lead>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleCtaClick}
            >
              {t("landing.hero.cta")}
            </Button>
            {/* <div className="flex items-center gap-2 text-sm text-amber-900/80">
              <PawPrint className="h-4 w-4" />
              <span>{t("landing.hero.used_by")}</span>
            </div> */}
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative grid h-[400px] w-full max-w-[500px] grid-cols-2 gap-4">
            <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
              {/* TODO: Get images from pets in adoption from the database */}
              <PetShowcaseCard
                src={LuciferImage}
                alt={t("landing.pet_showcase_card.featured_alt")}
                className="h-full w-full -translate-x-5 translate-y-5 scale-120 brightness-95"
              />
            </div>
            <div className="col-span-1 row-span-2 overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105">
              <PetShowcaseCard
                src={LimonImage}
                alt={t("landing.pet_showcase_card.alt")}
                className="h-full w-full -translate-x-5 scale-140"
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105">
              <PetShowcaseCard
                src={LilaImage}
                alt={t("landing.pet_showcase_card.alt")}
                className="h-full w-full -translate-x-5 scale-120"
              />
            </div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div
          onClick={() => scrollToSection("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer rounded-full bg-amber-300/80 p-2 shadow-lg"
        >
          <ArrowDown className="h-6 w-6 text-amber-900/60" />
        </div>
      )}
    </section>
  );
};
