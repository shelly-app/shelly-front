import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pet } from "@/features/pets/types/pet";
import { PET_SPECIES } from "@/features/pets/constants";
import { useState, useEffect } from "react";

interface PetAvatarProps {
  pet: Pet;
  size?: "sm" | "md" | "lg";
}

export const PetAvatar = ({ pet, size = "lg" }: PetAvatarProps) => {
  const [placeholderImage, setPlaceholderImage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const loadPlaceholderImage = async () => {
      try {
        let imageModule;

        if (pet.species === PET_SPECIES.CAT) {
          imageModule = await import("@/assets/images/cat.webp");
        } else if (pet.species === PET_SPECIES.DOG) {
          imageModule = await import("@/assets/images/dog.webp");
        }

        if (imageModule?.default) {
          setPlaceholderImage(imageModule.default);
        }
      } catch (error) {
        console.error("Error loading placeholder image:", error);
      }
    };

    loadPlaceholderImage();
  }, [pet.species]);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-48 w-48",
  };

  const fallbackSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-2xl",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={pet.photoUrl || placeholderImage} alt={pet.name} />
      <AvatarFallback className={fallbackSizeClasses[size]}>
        {pet.species === PET_SPECIES.CAT ? "CT" : "DG"}
      </AvatarFallback>
    </Avatar>
  );
};
