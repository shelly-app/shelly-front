import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useAddEvent } from "@/features/pets/hooks";

const EVENT_NOTES_MAX_LENGTH = 300;

const todayInputValue = (): string => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

const getEventFormSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z
        .string()
        .min(1, t("app.pets.event_form.validation.name_required")),
      scheduledFor: z
        .string()
        .min(1, t("app.pets.event_form.validation.date_required"))
        .refine((value) => value >= todayInputValue(), {
          message: t("app.pets.event_form.validation.date_future"),
        }),
      scheduledTime: z.string().optional(),
      description: z
        .string()
        .max(
          EVENT_NOTES_MAX_LENGTH,
          t("app.pets.event_form.validation.notes_max"),
        )
        .optional(),
    })
    .superRefine(({ scheduledFor, scheduledTime }, context) => {
      if (
        scheduledFor &&
        scheduledTime &&
        new Date(`${scheduledFor}T${scheduledTime}`).getTime() < Date.now()
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("app.pets.event_form.validation.date_future"),
          path: ["scheduledTime"],
        });
      }
    });

type EventFormData = z.infer<ReturnType<typeof getEventFormSchema>>;

interface EventFormProps {
  petId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventForm = ({ petId, open, onOpenChange }: EventFormProps) => {
  const { t } = useTranslation();
  const eventFormSchema = getEventFormSchema(t);
  const { addEventAsync, isLoading } = useAddEvent(petId);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      scheduledFor: "",
      scheduledTime: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = async (data: EventFormData) => {
    try {
      await addEventAsync({
        name: data.name,
        description: data.description || undefined,
        scheduledFor: data.scheduledTime
          ? new Date(`${data.scheduledFor}T${data.scheduledTime}`).toISOString()
          : data.scheduledFor,
        hasTime: Boolean(data.scheduledTime),
      });
      onOpenChange(false);
      form.reset();
    } catch {
      console.error(t("app.pets.event_form.error"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-full max-w-full grid-rows-[auto_1fr] overflow-y-auto p-4 sm:max-h-[90dvh] sm:max-w-lg sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg">
            {t("app.pets.event_form.title")}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t("app.pets.event_form.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between space-y-4 sm:space-y-6"
          >
            <div className="flex flex-col gap-4">
              <FormItem className="relative min-w-0 space-y-1">
                <FormLabel className="text-sm">
                  {t("app.pets.event_form.name")} *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("app.pets.event_form.name_placeholder")}
                    className="h-9"
                    {...form.register("name")}
                  />
                </FormControl>
                <FormMessage className="absolute top-full left-0 text-xs" />
              </FormItem>

              <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-3">
                <FormField
                  control={form.control}
                  name="scheduledFor"
                  render={({ field }) => (
                    <FormItem className="relative min-w-0 space-y-1">
                      <FormLabel className="text-sm">
                        {t("app.pets.event_form.date")} *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          min={todayInputValue()}
                          className="h-9 w-full [&::-webkit-calendar-picker-indicator]:ml-auto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute top-full left-0 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduledTime"
                  render={({ field }) => (
                    <FormItem className="relative min-w-0 space-y-1">
                      <FormLabel className="text-sm">
                        {t("app.pets.event_form.time")}
                      </FormLabel>
                      <FormControl>
                        <Input type="time" className="h-9 w-full" {...field} />
                      </FormControl>
                      <FormMessage className="absolute top-full left-0 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel className="text-sm">
                      {t("app.pets.event_form.description_label")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          "app.pets.event_form.description_placeholder",
                        )}
                        maxLength={EVENT_NOTES_MAX_LENGTH}
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-start justify-between gap-2">
                      <FormMessage />
                      <span className="text-muted-foreground ml-auto text-xs">
                        {field.value?.length ?? 0}/{EVENT_NOTES_MAX_LENGTH}
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {t("app.pets.event_form.cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? t("app.pets.event_form.adding")
                  : t("app.pets.event_form.add")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
