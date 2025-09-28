const SectionLoader = ({ text }: { text: string }) => (
  <section className="container mx-auto h-full space-y-6 pt-5 md:pt-0">
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-amber-500"></div>
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  </section>
);

export default SectionLoader;
