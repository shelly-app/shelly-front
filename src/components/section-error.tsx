const SectionError = ({ text }: { text: string }) => (
  <section className="container mx-auto h-full py-10">
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-center">
        <p className="text-destructive mb-4">{text}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
        >
          Reintentar
        </button>
      </div>
    </div>
  </section>
);

export default SectionError;
