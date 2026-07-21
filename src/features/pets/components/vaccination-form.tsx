import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddVaccination, usePetVaccines } from "@/features/pets/hooks";

const todayInputValue = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

const getVaccinationFormSchema = (t: (key: string) => string) =>
  z.object({
    vaccineCode: z
      .string()
      .min(1, t("app.pets.vaccination_form.validation.vaccine_required")),
    administeredAt: z
      .string()
      .min(1, t("app.pets.vaccination_form.validation.date_required"))
      .refine((value) => value <= todayInputValue(), {
        message: t("app.pets.vaccination_form.validation.date_future"),
      }),
  });

type VaccinationFormData = z.infer<ReturnType<typeof getVaccinationFormSchema>>;

interface VaccinationFormProps {
  petId: number;
  petName: string;
  specie: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VaccinationForm = ({
  petId,
  petName,
  specie,
  open,
  onOpenChange,
}: VaccinationFormProps) => {
  const { t } = useTranslation();
  const { vaccines, isLoading: areVaccinesLoading } = usePetVaccines();
  const { addVaccinationAsync, isLoading } = useAddVaccination(petId);
  const form = useForm<VaccinationFormData>({
    resolver: zodResolver(getVaccinationFormSchema(t)),
    defaultValues: {
      vaccineCode: "",
      administeredAt: todayInputValue(),
    },
  });

  const vaccineOptions = useMemo(
    () => vaccines.filter((vaccine) => vaccine.specie === specie),
    [specie, vaccines],
  );

  useEffect(() => {
    if (!open) {
      form.reset({
        vaccineCode: "",
        administeredAt: todayInputValue(),
      });
    }
  }, [form, open]);

  const onSubmit = async (data: VaccinationFormData) => {
    try {
      await addVaccinationAsync({
        vaccineCode: data.vaccineCode,
        administeredAt: new Date(
          `${data.administeredAt}T00:00:00`,
        ).toISOString(),
      });
      onOpenChange(false);
    } catch {
      console.error(t("app.pets.vaccination_form.error"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full p-4 sm:max-w-md sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle>{t("app.pets.vaccination_form.title")}</DialogTitle>
          <DialogDescription>
            {t("app.pets.vaccination_form.description", { name: petName })}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="vaccineCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("app.pets.vaccination_form.vaccine")} *
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={areVaccinesLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t(
                            "app.pets.vaccination_form.vaccine_placeholder",
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vaccineOptions.map((vaccine) => (
                        <SelectItem key={vaccine.code} value={vaccine.code}>
                          {vaccine.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="administeredAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("app.pets.vaccination_form.date")} *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      max={todayInputValue()}
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => onOpenChange(false)}
              >
                {t("app.pets.vaccination_form.cancel")}
              </Button>
              <Button type="submit" disabled={isLoading || areVaccinesLoading}>
                {isLoading
                  ? t("app.pets.vaccination_form.adding")
                  : t("app.pets.vaccination_form.add")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
