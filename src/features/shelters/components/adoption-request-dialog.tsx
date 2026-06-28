import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Send, CheckCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PetAvatar } from "@/components/ui/pet-avatar";
import { Text } from "@/components/ui/text";

import type { DetailedPet } from "@/features/pets/types/pet";
import type { Shelter } from "@/features/shelters/types/shelter";
import { useSubmitAdoptionRequest } from "@/features/shelters/hooks/use-submit-adoption-request";
import { getNameInitials } from "@/lib/utils";

interface AdoptionRequestDialogProps {
  pet: DetailedPet | null;
  shelter: Shelter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdoptionRequestDialog = ({
  pet,
  shelter,
  open,
  onOpenChange,
}: AdoptionRequestDialogProps) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submitAsync, isLoading, isError, reset } = useSubmitAdoptionRequest();

  const adoptionSchema = z.object({
    name: z
      .string()
      .min(2, { message: t("shelters.adoption.validation.name") }),
    email: z
      .string()
      .email({ message: t("shelters.adoption.validation.email") }),
    phone: z
      .string()
      .min(6, { message: t("shelters.adoption.validation.phone") }),
    location: z
      .string()
      .min(2, { message: t("shelters.adoption.validation.location") }),
    familyComposition: z.string().optional(),
    hasYard: z.boolean().optional(),
    message: z
      .string()
      .min(10, { message: t("shelters.adoption.validation.message") }),
  });

  type AdoptionFormData = z.infer<typeof adoptionSchema>;

  const form = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      familyComposition: "",
      hasYard: false,
      message: "",
    },
  });

  const handleSubmit = async (data: AdoptionFormData) => {
    if (!pet || !shelter) return;

    try {
      await submitAsync({
        shelterId: shelter.id,
        petId: pet.id,
        requesterName: data.name,
        requesterEmail: data.email,
        requesterPhone: data.phone,
        location: data.location,
        familyComposition: data.familyComposition || undefined,
        hasYard: data.hasYard,
        message: data.message,
      });
      setIsSubmitted(true);
    } catch {
      // Error surfaced inline via `isError`; keep the dialog open.
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after dialog close animation
    setTimeout(() => {
      form.reset();
      setIsSubmitted(false);
      reset();
    }, 200);
  };

  if (!pet || !shelter) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {isSubmitted ? (
          // Success state
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {t("shelters.adoption.success.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("shelters.adoption.success.description", {
                  petName: pet.name,
                  shelterName: shelter.name,
                })}
              </p>
            </div>
            <Button onClick={handleClose}>
              {t("shelters.adoption.success.close")}
            </Button>
          </div>
        ) : (
          // Form state
          <>
            <DialogHeader>
              <DialogTitle>{t("shelters.adoption.title")}</DialogTitle>
              <DialogDescription>
                {t("shelters.adoption.description")}
              </DialogDescription>
            </DialogHeader>

            {/* Pet & Shelter Info */}
            <div className="bg-muted/30 flex items-center gap-4 rounded-lg border p-4">
              <PetAvatar pet={pet} size="lg" />
              <div className="flex h-full w-full flex-col justify-around">
                <div className="flex flex-col items-start justify-start">
                  <Text weight="semibold" size="3xl">
                    {pet.name}
                  </Text>
                  <Text variant="secondary" size="base">
                    {pet.breed}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getNameInitials(shelter.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <Text
                      variant="secondary"
                      size="xs"
                      className="max-w-24 truncate"
                    >
                      {shelter.name}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("shelters.adoption.form.name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "shelters.adoption.form.name_placeholder",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("shelters.adoption.form.email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t(
                              "shelters.adoption.form.email_placeholder",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("shelters.adoption.form.phone")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t(
                              "shelters.adoption.form.phone_placeholder",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("shelters.adoption.form.location")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "shelters.adoption.form.location_placeholder",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Family composition */}
                <FormField
                  control={form.control}
                  name="familyComposition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("shelters.adoption.form.family_composition")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "shelters.adoption.form.family_composition_placeholder",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Has yard */}
                <FormField
                  control={form.control}
                  name="hasYard"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("shelters.adoption.form.has_yard")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("shelters.adoption.form.message")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t(
                            "shelters.adoption.form.message_placeholder",
                          )}
                          className="min-h-24 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isError && (
                  <p className="text-destructive text-sm">
                    {t("shelters.adoption.error")}
                  </p>
                )}

                <DialogFooter className="gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    {t("shelters.adoption.form.cancel")}
                  </Button>
                  <Button type="submit" disabled={isLoading} className="gap-2">
                    {isLoading ? (
                      t("shelters.adoption.form.sending")
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t("shelters.adoption.form.submit")}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
