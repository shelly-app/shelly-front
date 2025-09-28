import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

interface TermsConditionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsConditionsDialog = ({
  open,
  onOpenChange,
}: TermsConditionsDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-12 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("terms.title")}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="adopters" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="adopters">
              {t("terms.adopters.tab")}
            </TabsTrigger>
            <TabsTrigger value="shelters">
              {t("terms.shelters.tab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="adopters" className="mt-6 space-y-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="pb-1 text-lg font-semibold">
                {t("terms.adopters.title")}
              </h3>
              <p className="text-muted-foreground mb-4 text-xs italic">
                {t("terms.last_updated", { date: "August 18, 2025" })}
              </p>
              <div className="text-muted-foreground space-y-3 text-sm">
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.object.title")}
                </h4>
                <p className="pl-5">{t("terms.adopters.object.description")}</p>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.platform_use.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.adopters.platform_use.item_1")}</li>
                  <li>{t("terms.adopters.platform_use.item_2")}</li>
                  <li>{t("terms.adopters.platform_use.item_3")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.data_protection.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.adopters.data_protection.item_1")}</li>
                  <li>{t("terms.adopters.data_protection.item_2")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.liability_limitation.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.adopters.liability_limitation.item_1")}</li>
                  <li>{t("terms.adopters.liability_limitation.item_2")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.prohibited_conduct.title")}
                </h4>
                <p className="pl-5">
                  {t("terms.prohibited_conduct.description")}
                </p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.adopters.prohibited_conduct.item_1")}</li>
                  <li>{t("terms.adopters.prohibited_conduct.item_2")}</li>
                  <li>{t("terms.adopters.prohibited_conduct.item_3")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.breach_consequences.title")}
                </h4>
                <p className="pl-5">
                  {t("terms.breach_consequences.description")}
                </p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.adopters.breach_consequences.item_1")}</li>
                  <li>{t("terms.adopters.breach_consequences.item_2")}</li>
                  <li>{t("terms.adopters.breach_consequences.item_3")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.acceptance.title")}
                </h4>
                <p className="pl-5">{t("terms.acceptance.description")}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shelters" className="mt-6 space-y-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="pb-1 text-lg font-semibold">
                {t("terms.shelters.title")}
              </h3>
              <p className="text-muted-foreground mb-4 text-xs italic">
                {t("terms.last_updated", { date: "August 18, 2025" })}
              </p>
              <div className="text-muted-foreground space-y-3 text-sm">
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.object.title")}
                </h4>
                <p className="pl-5">{t("terms.shelters.object.description")}</p>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.shelter_responsibilities.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.shelters.shelter_responsibilities.item_1")}</li>
                  <li>{t("terms.shelters.shelter_responsibilities.item_2")}</li>
                  <li>{t("terms.shelters.shelter_responsibilities.item_3")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.data_protection.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.shelters.data_protection.item_1")}</li>
                  <li>{t("terms.shelters.data_protection.item_2")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.intellectual_property.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.shelters.intellectual_property.item_1")}</li>
                  <li>{t("terms.shelters.intellectual_property.item_2")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.liability_limitation.title")}
                </h4>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.shelters.liability_limitation.item_1")}</li>
                  <li>{t("terms.shelters.liability_limitation.item_2")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.prohibited_conduct.title")}
                </h4>
                <p className="pl-5">
                  {t("terms.prohibited_conduct.description")}
                </p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.shelters.prohibited_conduct.item_1")}</li>
                  <li>{t("terms.shelters.prohibited_conduct.item_2")}</li>
                  <li>{t("terms.shelters.prohibited_conduct.item_3")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.breach_consequences.title")}
                </h4>
                <p className="pl-5">
                  {t("terms.breach_consequences.description")}
                </p>
                <ul className="ml-5 list-disc space-y-2 pl-5">
                  <li>{t("terms.shelters.breach_consequences.item_1")}</li>
                  <li>{t("terms.shelters.breach_consequences.item_2")}</li>
                </ul>
                <h4 className="text-md text-foreground font-semibold">
                  {t("terms.acceptance.title")}
                </h4>
                <p className="pl-5">{t("terms.acceptance.description")}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
