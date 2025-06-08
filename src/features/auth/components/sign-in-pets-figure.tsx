import DogPetGraphic from '@/assets/images/dog-pet-graphic.webp';

export const SignInPetsFigure = () => {
  return (
    <article className="flex h-full items-center justify-center">
      <figure className="relative flex h-full max-w-[600px] items-center justify-center">
        <img src={DogPetGraphic} alt="Dog Cat Graphic" loading="eager" />
      </figure>
    </article>
  );
};
