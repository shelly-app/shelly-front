import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
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
  PET_SPECIES,
  PET_STATUS,
  PET_SEXES,
  PET_SIZES,
} from "@/features/pets/constants";
import { useAddPet } from "@/features/pets/hooks";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useShelters } from "@/components/providers/shelters-provider";
import { colorStyles } from "@/features/pets/components/color-badge";
import { usePetColors } from "@/features/pets/hooks/use-pet-colors";
import { usePetVaccines } from "@/features/pets/hooks/use-pet-vaccines";
import { DetailedPet, Pet } from "@/features/pets/types/pet";
import { useTranslation } from "react-i18next";
import { capitalize, toDateInputValue } from "@/lib/utils";

const getPetFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("app.pets.validation.name_required")),
    specie: z.enum([PET_SPECIES.DOG, PET_SPECIES.CAT], {
      required_error: t("app.pets.validation.species_required"),
    }),
    status: z.enum(
      [
        PET_STATUS.IN_SHELTER,
        PET_STATUS.ADOPTED,
        PET_STATUS.IN_FOSTER,
        PET_STATUS.DECEASED,
      ],
      {
        required_error: t("app.pets.validation.status_required"),
      },
    ),
    breed: z.string().optional(),
    birthDate: z.string().optional(),
    ageYears: z.coerce.number().int().min(0).max(30).optional(),
    ageMonths: z.coerce.number().int().min(0).max(11).optional(),
    sex: z.enum([PET_SEXES.MALE, PET_SEXES.FEMALE], {
      required_error: t("app.pets.validation.sex_required"),
    }),
    size: z
      .enum([PET_SIZES.SMALL, PET_SIZES.MEDIUM, PET_SIZES.LARGE])
      .optional(),
    colors: z.array(z.string()).optional(),
    vaccines: z.array(z.string()).optional(),
    description: z.string().optional(),
  });

const approximateToBirthDate = (years: number, months: number): string => {
  const today = new Date();
  const birth = new Date(
    Date.UTC(
      today.getUTCFullYear() - years,
      today.getUTCMonth() - months,
      today.getUTCDate(),
    ),
  );
  return birth.toISOString().split("T")[0];
};

const birthDateToApproximate = (
  birthDate: string,
): {
  years: number;
  months: number;
} => {
  const birth = new Date(birthDate);
  const today = new Date();
  let years = today.getUTCFullYear() - birth.getUTCFullYear();
  let months = today.getUTCMonth() - birth.getUTCMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years: Math.max(0, years), months: Math.max(0, months) };
};

type PetFormData = z.infer<ReturnType<typeof getPetFormSchema>>;

interface PetFormProps {
  mode: "add" | "edit";
  pet?: DetailedPet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // photoKey: undefined = unchanged, "" = remove existing, otherwise a new key.
  onSave?: (updatedPet: Pet, vaccines: string[], photoKey?: string) => void;
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
  const [birthDateMode, setBirthDateMode] = useState<"approximate" | "exact">(
    "approximate",
  );
  const { addPetAsync, isLoading } = useAddPet();
  const { currentShelter } = useShelters();
  const { upload: uploadPhoto, isUploading } = useImageUpload(
    `/shelters/${currentShelter?.id}/pets/photo-upload-url`,
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const { colors: apiColors } = usePetColors();
  const { vaccines: apiVaccines } = usePetVaccines();

  const showExistingPhoto =
    mode === "edit" && !!pet?.photoUrl && !photoRemoved && !photoFile;

  const form = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet?.name || "",
      specie: (pet?.specie as PetFormData["specie"]) || PET_SPECIES.DOG,
      status: (pet?.status as PetFormData["status"]) || PET_STATUS.IN_SHELTER,
      breed: pet?.breed || "",
      birthDate: pet?.birthDate || "",
      ageYears: undefined,
      ageMonths: undefined,
      sex: pet?.sex as PetFormData["sex"],
      size: (pet?.size ?? undefined) as PetFormData["size"],
      colors: pet?.colors || [],
      vaccines: [],
      description: pet?.description || "",
    },
  });

  // Sync form values when dialog is (re)opened in EDIT mode
  useEffect(() => {
    if (open && mode === "edit" && pet) {
      setPhotoFile(null);
      setPhotoRemoved(false);
      const hasExactDate = !!pet.birthDate;
      setBirthDateMode(hasExactDate ? "exact" : "approximate");
      const approx = hasExactDate
        ? birthDateToApproximate(pet.birthDate!)
        : { years: undefined, months: undefined };
      form.reset({
        name: pet.name ?? "",
        specie: (pet.specie as PetFormData["specie"]) || PET_SPECIES.DOG,
        status: (pet.status as PetFormData["status"]) || PET_STATUS.IN_SHELTER,
        breed: pet.breed ?? "",
        birthDate: pet.birthDate ?? "",
        ageYears: approx.years,
        ageMonths: approx.months,
        sex: pet.sex as PetFormData["sex"],
        size: (pet.size ?? undefined) as PetFormData["size"],
        colors: pet.colors ?? [],
        vaccines: pet.vaccinations?.map((v) => v.vaccineCode) ?? [],
        description: pet.description ?? "",
      });
    }
  }, [open, mode, pet, form]);

  // Clear state when dialog closes in ADD mode only
  useEffect(() => {
    if (!open && mode === "add") {
      form.reset();
      setIsCompleteMode(false);
      setBirthDateMode("approximate");
      setPhotoFile(null);
      setPhotoRemoved(false);
    }
  }, [open, mode, form]);

  const selectedSpecie = form.watch("specie");

  // Get color options from API
  const colorOptions = useMemo(() => {
    return apiColors.map((color) => {
      const styles = colorStyles[color];
      return {
        value: color,
        label: t(`app.pets.color_labels.${color}`, {
          defaultValue: capitalize(color),
        }),
        style: styles
          ? {
              badgeColor: styles.bg,
              color: styles.text,
              border: `1px solid ${styles.border ?? styles.bg}`,
            }
          : undefined,
      };
    });
  }, [apiColors, t]);

  const vaccineOptions = useMemo(() => {
    return apiVaccines
      .filter((v) => v.specie === selectedSpecie)
      .map((v) => ({ value: v.code, label: v.name }));
  }, [apiVaccines, selectedSpecie]);

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
      let resolvedBirthDate = data.birthDate;
      if (isCompleteMode && birthDateMode === "approximate") {
        const years = data.ageYears ?? 0;
        const months = data.ageMonths ?? 0;
        resolvedBirthDate = approximateToBirthDate(years, months);
      }

      const resolvedData = {
        ...data,
        birthDate: resolvedBirthDate,
        ageYears: undefined,
        ageMonths: undefined,
      };

      // Resolve the photo change: upload a new file, clear an existing one, or
      // leave it untouched (undefined).
      let photoKey: string | undefined;
      if (photoFile) {
        photoKey = await uploadPhoto(photoFile);
      } else if (photoRemoved) {
        photoKey = "";
      }

      if (mode === "edit" && onSave) {
        const updatedPet: Pet = {
          ...pet!,
          ...resolvedData,
          birthDate: resolvedData.birthDate || null,
          description: resolvedData.description || null,
          colors: resolvedData.colors || [],
        };
        onSave(updatedPet, resolvedData.vaccines ?? [], photoKey);
        onOpenChange(false);
      } else {
        const submitData = isCompleteMode
          ? resolvedData
          : {
              name: data.name,
              specie: data.specie,
              status: data.status,
              sex: data.sex,
            };

        await addPetAsync({
          ...submitData,
          ...(photoKey ? { photoKey } : {}),
        });

        console.log(t("app.pets.notifications.added_successfully"));

        onOpenChange(false);
        form.reset();
        setIsCompleteMode(false);
        setBirthDateMode("approximate");
      }
    } catch {
      console.error(t("app.pets.notifications.error_processing"));
    }
  };

  const handleModeChange = (checked: boolean) => {
    setIsCompleteMode(checked);
    if (!checked) {
      form.setValue("breed", "");
      form.setValue("birthDate", "");
      form.setValue("ageYears", undefined);
      form.setValue("ageMonths", undefined);
      form.setValue("size", undefined);
      form.setValue("colors", []);
      form.setValue("vaccines", []);
      form.setValue("description", "");
      setBirthDateMode("approximate");
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
              <FormItem className="relative min-w-0 space-y-1">
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
                <FormMessage className="absolute top-full left-0 text-xs" />
              </FormItem>

              <FormField
                control={form.control}
                name="specie"
                render={({ field }) => (
                  <FormItem className="relative min-w-0 space-y-1">
                    <FormLabel className="text-sm">
                      {t("app.pets.species")} *
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
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
                    <FormMessage className="absolute top-full left-0 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="relative min-w-0 space-y-1">
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
                    <FormMessage className="absolute top-full left-0 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem className="relative min-w-0 space-y-1">
                    <FormLabel className="text-sm">
                      {t("app.pets.form.sex")} *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
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
                    <FormMessage className="absolute top-full left-0 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <p className="text-sm leading-none font-medium">
                {t("app.pets.form.photo")}
              </p>
              {showExistingPhoto ? (
                <div className="flex items-center gap-3">
                  <img
                    src={pet?.photoUrl ?? undefined}
                    alt={pet?.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPhotoRemoved(true)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground shrink-0"
                  >
                    <XIcon className="mr-1 h-3 w-3" />
                    {t("app.pets.form.remove_photo")}
                  </Button>
                </div>
              ) : (
                <FileUploader
                  types={["image"]}
                  onFileChange={setPhotoFile}
                  onRemoveFile={() => setPhotoFile(null)}
                />
              )}
            </div>

            {/* Complete mode fields */}
            {isCompleteMode && (
              <>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm leading-none font-medium">
                      {t("app.pets.form.age_label")}
                    </p>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setBirthDateMode("approximate");
                          const currentDate =
                            form.getValues("birthDate") || pet?.birthDate;
                          if (currentDate) {
                            const { years, months } =
                              birthDateToApproximate(currentDate);
                            form.setValue("ageYears", years);
                            form.setValue("ageMonths", months);
                          }
                          form.setValue("birthDate", "");
                        }}
                        className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${birthDateMode === "approximate" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-input hover:bg-accent"}`}
                      >
                        {t("app.pets.form.age_approximate")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBirthDateMode("exact");
                          form.setValue("ageYears", undefined);
                          form.setValue("ageMonths", undefined);
                          if (!form.getValues("birthDate") && pet?.birthDate) {
                            form.setValue("birthDate", pet.birthDate);
                          }
                        }}
                        className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${birthDateMode === "exact" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-input hover:bg-accent"}`}
                      >
                        {t("app.pets.form.age_exact")}
                      </button>
                    </div>

                    {birthDateMode === "approximate" ? (
                      <div className="flex gap-3">
                        <FormField
                          control={form.control}
                          name="ageYears"
                          render={({ field }) => (
                            <FormItem className="relative flex-1 space-y-1">
                              <FormLabel className="text-sm">
                                {t("app.pets.form.age_years")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={30}
                                  className="h-9"
                                  placeholder="0"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value === ""
                                        ? undefined
                                        : Number(e.target.value),
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage className="absolute top-full left-0 text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ageMonths"
                          render={({ field }) => (
                            <FormItem className="relative flex-1 space-y-1">
                              <FormLabel className="text-sm">
                                {t("app.pets.form.age_months")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={11}
                                  className="h-9"
                                  placeholder="0"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value === ""
                                        ? undefined
                                        : Number(e.target.value),
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage className="absolute top-full left-0 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="relative space-y-1">
                            <FormControl>
                              <Input
                                type="date"
                                className="h-9 w-full sm:max-w-[49%] [&::-webkit-calendar-picker-indicator]:ml-auto"
                                {...field}
                                value={toDateInputValue(field.value)}
                              />
                            </FormControl>
                            <FormMessage className="absolute top-full left-0 text-xs" />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormItem className="relative min-w-0 space-y-1">
                      <FormLabel className="text-sm">
                        {t("app.pets.breed")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("app.pets.form.breed_placeholder")}
                          className="h-9"
                          {...form.register("breed")}
                        />
                      </FormControl>
                      <FormMessage className="absolute top-full left-0 text-xs" />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem className="relative min-w-0 space-y-1">
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
                          <FormMessage className="absolute top-full left-0 text-xs" />
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
                          options={colorOptions}
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
                          searchable
                          hideBadgeIcon
                          options={vaccineOptions}
                          defaultValue={field.value || []}
                          onValueChange={field.onChange}
                          placeholder={t("app.pets.form.select_vaccines")}
                          maxCount={5}
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
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading || isUploading}
              >
                {t("app.pets.form.cancel")}
              </Button>
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading || isUploading
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
        <Button size="lg" className="w-full sm:w-auto">
          <PlusIcon className="mr-2 h-4 w-4" />
          {t("app.pets.add_pet")}
        </Button>
      </DialogTrigger>
      <PetForm mode="add" open={open} onOpenChange={setOpen} />
    </Dialog>
  );
};
