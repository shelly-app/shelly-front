export const About = () => {
  return (
    <section
      id="about"
      className="flex h-[800px] flex-col items-center justify-center gap-8 px-4 py-8"
    >
      <h2 className="text-3xl font-bold">Adopta una mascota</h2>
      <p className="text-lg text-gray-600">
        ¡Dale un hogar a un amigo peludo! Explora nuestras mascotas disponibles
        para adopción.
      </p>
      <button className="mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        Ver mascotas
      </button>
    </section>
  );
};
