import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RequestCard } from "@/features/requests/components";
import { useRequests } from "@/features/requests/hooks/use-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import SectionLoader from "@/components/section-loader";
import SectionError from "@/components/section-error";
import { useTranslation } from "react-i18next";

export const RequestsListPage = () => {
  const { requests, isLoading, isError } = useRequests();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

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
    return <SectionLoader text={t("app.requests.loading")} />;
  }

  if (isError) {
    return <SectionError text={t("app.requests.error")} />;
  }

  return (
    <section className="container mx-auto space-y-6 pt-5 md:pt-0">
      <h1 className="text-3xl font-bold">{t("app.requests.title")}</h1>
      <Tabs value={tabParam} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-center md:w-fit md:justify-start">
          <TabsTrigger value="pending">
            {t("app.requests.status.pending")}
          </TabsTrigger>
          <TabsTrigger value="approved">
            {t("app.requests.status.approved")}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {t("app.requests.status.rejected")}
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Input
            placeholder={t("app.requests.search_placeholder")}
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
                  {t("app.requests.no_results")}
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
