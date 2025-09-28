import DogPetGraphic from "@/assets/images/dog-pet-graphic.webp";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const SignInPetsFigure = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <article
      className={cn(
        "relative flex h-full items-center justify-center",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-500 opacity-80"></div>
      <Image
        src={DogPetGraphic}
        alt={t("auth.dog_cat_graphic_alt")}
        className="flex max-w-[600px] items-center justify-center"
      />
    </article>
  );
};
