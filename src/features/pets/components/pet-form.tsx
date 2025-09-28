import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
  PET_SPECIES_LABELS,
  PET_STATUS_LABELS,
  PET_COLORS,
  PET_SPECIES,
  PET_STATUS,
  PET_SEXES,
  PET_SIZES,
  VACCINES,
  PET_COLOR_LABELS,
} from "@/features/pets/constants";
import { useAddPet } from "@/features/pets/hooks";
import { Pet } from "@/features/pets/types/pet";
import { FileUploader } from "@/components/file-uploader";
import { useTranslation } from "react-i18next";
import { capitalize } from "@/lib/utils";

const getPetFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("app.pets.validation.name_required")),
    species: z.enum([PET_SPECIES.DOG, PET_SPECIES.CAT], {
      required_error: t("app.pets.validation.species_required"),
    }),
    status: z.enum(
      [
        PET_STATUS.IN_TRANSIT,
        PET_STATUS.IN_SHELTER,
        PET_STATUS.ADOPTED,
        PET_STATUS.IN_VET,
      ],
      {
        required_error: t("app.pets.validation.status_required"),
      },
    ),
    breed: z.string().optional(),
    age: z.number().min(0).max(30).optional(),
    sex: z.enum([PET_SEXES.MALE, PET_SEXES.FEMALE]).optional(),
    size: z
      .enum([PET_SIZES.SMALL, PET_SIZES.MEDIUM, PET_SIZES.LARGE])
      .optional(),
    colors: z.array(z.string()).optional(),
    vaccines: z.array(z.string()).optional(),
    description: z.string().optional(),
    photoUrl: z.string().optional(),
  });

type PetFormData = z.infer<ReturnType<typeof getPetFormSchema>>;

interface PetFormProps {
  mode: "add" | "edit";
  pet?: Pet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (updatedPet: Pet) => void;
}

export const PetForm = ({
  mode,
  pet,
  open,
  onOpenChange,
  onSave,
}: PetFormProps) => {
  const { t } = useTranslation();
  const petFormSchema = getPetFormSchema(t);
  const [isCompleteMode, setIsCompleteMode] = useState(
    mode === "edit" ? true : false,
  );
  const { addPetAsync, isLoading } = useAddPet();

  const form = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet?.name || "",
      species: pet?.species || PET_SPECIES.DOG,
      status: pet?.status || PET_STATUS.IN_SHELTER,
      breed: pet?.breed || "",
      age: pet?.age,
      sex: pet?.sex,
      size: pet?.size,
      colors: pet?.colors || [],
      vaccines: pet?.vaccines || [],
      description: pet?.description || "",
      photoUrl: pet?.photoUrl || "",
    },
  });

  // Function to determine if a color is light or dark for text contrast
  const isLightColor = (hexColor: string): boolean => {
    // Remove # if present
    const hex = hexColor.replace("#", "");

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance using relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if light (luminance > 0.5)
    return luminance > 0.5;
  };

  // Get color options with proper styling
  const getColorOptions = () => {
    return Object.entries(PET_COLORS).map(([color, hex]) => {
      const isLight = isLightColor(hex);
      const textColor = isLight ? "#000000" : "#FFFFFF";

      return {
        value: color,
        label: capitalize(
          PET_COLOR_LABELS[color as keyof typeof PET_COLOR_LABELS],
        ),
        icon: () => (
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: hex }}
          />
        ),
        style: {
          // Use solid color with proper text contrast
          badgeColor: hex,
          // Force the text color based on background
          color: textColor,
          // Add border for better definition
          border: isLight
            ? "1px solid rgba(0, 0, 0, 0.1)"
            : "1px solid rgba(255, 255, 255, 0.2)",
          // Add subtle shadow for depth
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        },
      };
    });
  };

  const species = form.watch("species");

  // Sync form values when dialog is (re)opened in EDIT mode
  useEffect(() => {
    if (open && mode === "edit" && pet) {
      form.reset({
        name: pet.name ?? "",
        species: pet.species,
        status: pet.status,
        breed: pet.breed ?? "",
        age: pet.age,
        sex: pet.sex,
        size: pet.size,
        colors: pet.colors ?? [],
        vaccines: pet.vaccines ?? [],
        description: pet.description ?? "",
        photoUrl: pet.photoUrl ?? "",
      });
    }
  }, [open, mode, pet, form]);

  // Clear state when dialog closes in ADD mode only
  useEffect(() => {
    if (!open && mode === "add") {
      form.reset();
      setIsCompleteMode(false);
    }
  }, [open, mode, form]);

  // Get vaccine options based on the selected species
  const vaccineOptions = useMemo(() => {
    const speciesVaccines = VACCINES[species];
    return Object.entries(speciesVaccines).map(([value, labelKey]) => ({
      value,
      label: t(labelKey),
    }));
  }, [species, t]);

  // Get options for form selects
  const speciesOptions = Object.entries(PET_SPECIES_LABELS).map(
    ([value, labelKey]) => ({
      value,
      label: t(labelKey),
    }),
  );
  const statusOptions = Object.entries(PET_STATUS_LABELS).map(
    ([value, labelKey]) => ({
      value,
      label: t(labelKey),
    }),
  );
  const sexOptions = Object.entries(PET_SEX_LABELS).map(
    ([value, labelKey]) => ({
      value,
      label: t(labelKey),
    }),
  );
  const sizeOptions = Object.entries(PET_SIZE_LABELS).map(
    ([value, labelKey]) => ({
      value,
      label: t(labelKey),
    }),
  );

  const onSubmit = async (data: PetFormData) => {
    try {
      if (mode === "edit" && onSave) {
        // Edit mode - call onSave with updated data
        const updatedPet: Pet = {
          ...pet!,
          ...data,
          vaccines: data.vaccines as Array<
            keyof (typeof VACCINES)[keyof typeof PET_SPECIES]
          >,
        };
        onSave(updatedPet);
        onOpenChange(false);
      } else {
        // Add mode - use existing addPetAsync logic
        // If in quick mode, only send essential fields
        const submitData = isCompleteMode
          ? data
          : {
              name: data.name,
              species: data.species,
              status: data.status,
            };

        await addPetAsync(submitData);

        // Show success message
        console.log(t("app.pets.notifications.added_successfully"));

        // Close modal and reset form
        onOpenChange(false);
        form.reset();
        setIsCompleteMode(false);
      }
    } catch {
      // Error is handled by the mutation, but we can show a message here too
      console.error(t("app.pets.notifications.error_processing"));
    }
  };

  const handleFileChange = (file: File) => {
    if (file) {
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isCompleteMode) {
          form.setValue("photoUrl", e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    if (isCompleteMode) {
      form.setValue("photoUrl", "");
    }
  };

  const handleModeChange = (checked: boolean) => {
    setIsCompleteMode(checked);
    if (!checked) {
      // Reset non-essential fields when switching to quick mode
      form.setValue("breed", "");
      form.setValue("age", undefined);
      form.setValue("sex", undefined);
      form.setValue("size", undefined);
      form.setValue("colors", []);
      form.setValue("vaccines", []);
      form.setValue("description", "");
      form.setValue("photoUrl", "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-full max-w-2xl overflow-y-auto p-4 sm:max-h-[90dvh] sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg">
            {mode === "edit" ? t("app.pets.edit_pet") : t("app.pets.add_pet")}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {mode === "edit"
              ? t("app.pets.form.edit_description")
              : t("app.pets.form.add_description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Mode toggle - only show in add mode */}
            {mode === "add" && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="mode"
                  checked={isCompleteMode}
                  onCheckedChange={handleModeChange}
                />
                <label
                  htmlFor="mode"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("app.pets.form.complete_mode")}
                </label>
              </div>
            )}

            {/* Basic fields - always visible */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <FormItem className="min-w-0 space-y-1">
                <FormLabel className="text-sm">
                  {t("app.pets.name")} *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("app.pets.form.name_placeholder")}
                    className="h-9"
                    {...form.register("name")}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>

              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem className="min-w-0 space-y-1">
                    <FormLabel className="text-sm">
                      {t("app.pets.species")} *
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("vaccines", []);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-9 w-full cursor-pointer">
                          <SelectValue
                            placeholder={t("app.pets.form.select_species")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {speciesOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="min-w-0 space-y-1">
                    <FormLabel className="text-sm">
                      {t("app.pets.status")} *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-9 w-full cursor-pointer">
                          <SelectValue
                            placeholder={t("app.pets.form.select_status")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormItem className="min-w-0 space-y-1">
                <FormLabel className="text-sm">{t("app.pets.breed")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("app.pets.form.breed_placeholder")}
                    className="h-9"
                    {...form.register("breed")}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            </div>

            {/* Complete mode fields */}
            {isCompleteMode && (
              <>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-sm">
                          {t("app.pets.form.age")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={t("app.pets.form.age_placeholder")}
                            className="h-9 w-full sm:max-w-[49%]"
                            max={40}
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem className="min-w-0 space-y-1">
                          <FormLabel className="text-sm">
                            {t("app.pets.form.sex")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-9 w-full cursor-pointer">
                                <SelectValue
                                  placeholder={t("app.pets.form.select_sex")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sexOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="cursor-pointer"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem className="min-w-0 space-y-1">
                          <FormLabel className="text-sm">
                            {t("app.pets.form.size")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-9 w-full cursor-pointer">
                                <SelectValue
                                  placeholder={t("app.pets.form.select_size")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sizeOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="cursor-pointer"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem className="min-w-0">
                      <FormLabel className="w-fit">
                        {t("app.pets.form.colors")}
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          searchable
                          hideBadgeIcon
                          options={getColorOptions()}
                          defaultValue={field.value || []}
                          onValueChange={field.onChange}
                          placeholder={t("app.pets.form.select_colors")}
                          maxCount={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaccines"
                  render={({ field }) => (
                    <FormItem className="min-w-0">
                      <FormLabel className="w-fit">
                        {t("app.pets.form.vaccines")}
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          disabled={!form.getValues("species") || isLoading}
                          options={vaccineOptions || []}
                          defaultValue={field.value || []}
                          onValueChange={field.onChange}
                          placeholder={t("app.pets.form.select_vaccines")}
                          maxCount={4}
                          searchable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="min-w-0">
                      <FormLabel className="w-fit">
                        {t("app.pets.form.description")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t(
                            "app.pets.form.description_placeholder",
                          )}
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={() => (
                    <FormItem className="min-w-0">
                      <FormLabel className="w-fit">
                        {t("app.pets.form.image")}
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          onFileChange={handleFileChange}
                          onRemoveFile={handleRemoveFile}
                          types={["image"]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {t("app.pets.form.cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? mode === "edit"
                    ? t("app.pets.form.saving")
                    : t("app.pets.form.adding")
                  : mode === "edit"
                    ? t("app.pets.form.save")
                    : isCompleteMode
                      ? t("app.pets.form.add")
                      : t("app.pets.form.add_quickly")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Keep the old AddPet component for backward compatibility
export const AddPet = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <PlusIcon className="mr-2 h-4 w-4" />
          {t("app.pets.add_pet")}
        </Button>
      </DialogTrigger>
      <PetForm mode="add" open={open} onOpenChange={setOpen} />
    </Dialog>
  );
};
