export const Image = ({
  src,
  alt,
  className,
  loading = "eager",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) => {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading={loading}
      />
    </figure>
  );
};
