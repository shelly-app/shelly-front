import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export const PetShowcaseCard = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn("relative h-full w-60 overflow-hidden", className)}
    />
  );
};
