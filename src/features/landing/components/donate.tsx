export const Donate = () => {
  return (
    <section
      id="donate"
      className="flex h-[800px] flex-col items-center justify-center gap-8 px-4 py-8"
    >
      <h2 className="text-3xl font-bold">Dona para ayudar</h2>
      <p className="text-lg text-gray-600">
        Tu donación ayuda a cuidar y proteger a nuestras mascotas. ¡Cada aporte
        cuenta!
      </p>
      <button className="mt-4 rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600">
        Donar ahora
      </button>
    </section>
  );
};
