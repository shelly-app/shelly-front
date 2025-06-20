import DogPetGraphic from '@/assets/images/dog-pet-graphic.webp';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

export const SignInPetsFigure = ({ className }: { className?: string }) => {
  return (
    <article
      className={cn(
        'relative flex h-full items-center justify-center',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-500 opacity-80"></div>
      <Image
        src={DogPetGraphic}
        alt="Dog Cat Graphic"
        className="flex max-w-[600px] items-center justify-center"
      />
    </article>
  );
};
