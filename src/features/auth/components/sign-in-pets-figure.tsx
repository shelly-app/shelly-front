import DogPetGraphic from '@/assets/images/dog-pet-graphic.webp';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

export const SignInPetsFigure = ({ className }: { className?: string }) => {
  return (
    <article
      className={cn('flex h-full items-center justify-center', className)}
    >
      <Image
        src={DogPetGraphic}
        alt="Illustration of a dog and cat sitting together"
        className="flex max-w-[600px] items-center justify-center"
      />
    </article>
  );
};
