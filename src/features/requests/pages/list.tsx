import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RequestCard } from "@/features/requests/components";
import { useRequests } from "@/features/requests/hooks/use-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { REQUEST_STATUS_LABELS } from "@/features/requests/constants";

export const RequestsListPage = () => {
  const { requests, isLoading, isError } = useRequests();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tabParam = searchParams.get("tab") ?? "pending";
  const [search, setSearch] = useState("");

  const handleTabChange = (value: string) => {
    navigate({ search: `?tab=${value}` });
  };

  const visibleRequests = useMemo(() => {
    return requests
      .filter((r) => r.status === tabParam)
      .filter((r) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          r.petName.toLowerCase().includes(q) ||
          r.requesterName.toLowerCase().includes(q)
        );
      });
  }, [requests, tabParam, search]);

  if (isLoading) {
    return (
      <section className="container mx-auto py-10">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-amber-500" />
            <p className="text-muted-foreground">Cargando solicitudes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container mx-auto py-10">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-destructive mb-4">
              Error al cargar las solicitudes
            </p>
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
  }

  return (
    <section className="container mx-auto space-y-6 pt-5">
      <h1 className="text-3xl font-bold">Solicitudes de Adopción</h1>
      <Tabs value={tabParam} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-center md:w-fit md:justify-start">
          <TabsTrigger value="pending">
            {REQUEST_STATUS_LABELS.pending}
          </TabsTrigger>
          <TabsTrigger value="approved">
            {REQUEST_STATUS_LABELS.approved}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {REQUEST_STATUS_LABELS.rejected}
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Input
            placeholder="Buscar por mascota o solicitante..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </div>

        {("pending approved rejected" as string).split(" ").map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <div className="flex flex-col gap-4">
              {visibleRequests.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No hay resultados.
                </p>
              ) : (
                visibleRequests.map((req) => (
                  <RequestCard key={req.id} request={req} />
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
