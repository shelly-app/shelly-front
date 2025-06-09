import { cn } from '@/lib/utils';

export const PetShowcaseCard = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  return (
    <figure className={cn('relative h-48 w-60 overflow-hidden', className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </figure>
  );
};
