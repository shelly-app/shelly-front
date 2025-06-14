export const Image = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="eager"
      />
    </figure>
  );
};
