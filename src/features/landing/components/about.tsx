import { TwoSectionsLayout } from "@/components/layouts/two-sections-layout";
import { Image } from "@/components/ui/image";
import { TiltImage } from "@/components/ui/tilt-image";
import { H2, H3, Lead } from "@/components/ui/text";
import ShellyAppDesktop from "@/assets/images/shelly-app-desktop.webp";
import { ShellyGradient } from "@/components/ui/shelly-gradient";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BotMessageSquareIcon,
  ClipboardListIcon,
  DogIcon,
  UserPenIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ABOUT_FEATURES = {
  firstSection: [
    {
      icon: DogIcon,
      color: "green",
      i18nKey: "visualization",
    },
    {
      icon: UserPenIcon,
      color: "sky",
      i18nKey: "adoptions",
    },
  ],
  secondSection: [
    {
      icon: BotMessageSquareIcon,
      color: "purple",
      i18nKey: "chatbot",
    },
    {
      icon: ClipboardListIcon,
      color: "orange",
      i18nKey: "details",
    },
  ],
};

const COLOR_CLASSES = {
  green: "bg-gradient-to-br from-green-200 to-green-300 text-green-500",
  orange: "bg-gradient-to-br from-orange-200 to-orange-300 text-orange-500",
  sky: "bg-gradient-to-br from-sky-200 to-sky-300 text-sky-500",
  purple: "bg-gradient-to-br from-purple-200 to-purple-300 text-purple-500",
} as const;

export const About = () => {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className="flex flex-col gap-16 bg-gradient-to-b from-amber-300/70 to-amber-200 px-4 pt-8 pb-32"
    >
      <TwoSectionsLayout
        className="mx-auto flex w-full max-w-7xl items-center gap-16 px-0"
        firstSectionContent={
          <TwoSectionsLayout.SectionContent className="flex flex-col items-center gap-16">
            <div className="flex flex-col gap-4">
              <H2 className="leading-tight" size="4xl">
                {t("landing.about.title")}
              </H2>
              <Lead size="lg">
                {t("landing.about.subtitle")}{" "}
                <ShellyGradient variant="lead" size="lg">
                  {t("brand.name")}
                </ShellyGradient>{" "}
                {t("landing.about.subtitle_shelly")}
              </Lead>
            </div>
            <Separator className="w-full bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />
          </TwoSectionsLayout.SectionContent>
        }
        secondSectionContent={
          <TwoSectionsLayout.SectionContent className="flex flex-col items-center">
            <div className="hidden md:block">
              <TiltImage
                src={ShellyAppDesktop}
                alt="Shelly App Desktop"
                className="drop-shadow-lg"
              />
            </div>
            <div className="block md:hidden">
              <Image
                src={ShellyAppDesktop}
                alt="Shelly App Desktop"
                className="drop-shadow-lg"
              />
            </div>
          </TwoSectionsLayout.SectionContent>
        }
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-0 md:grid-cols-2 md:grid-rows-2 md:px-8">
        {ABOUT_FEATURES.firstSection.map((feature) => (
          <AboutFeature key={feature.i18nKey} {...feature} />
        ))}
        {ABOUT_FEATURES.secondSection.map((feature) => (
          <AboutFeature key={feature.i18nKey} {...feature} />
        ))}
      </div>
    </section>
  );
};

const AboutFeature = ({
  icon: Icon,
  i18nKey,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  i18nKey: string;
  color: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl p-2 shadow-lg transition-transform hover:scale-110",
          COLOR_CLASSES[color as keyof typeof COLOR_CLASSES],
        )}
      >
        <Icon
          className={cn(
            COLOR_CLASSES[color as keyof typeof COLOR_CLASSES].split(" ")[2],
          )}
        />
      </div>
      <div className="flex flex-col gap-4">
        <H3 size="lg">{t(`landing.about.features.${i18nKey}.title`)}</H3>
        <Lead>{t(`landing.about.features.${i18nKey}.description`)}</Lead>
      </div>
    </div>
  );
};
