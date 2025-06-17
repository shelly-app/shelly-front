export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ups, algo salió mal :( </h2>
      <button
        className="pt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Recargar
      </button>
    </div>
  );
};
