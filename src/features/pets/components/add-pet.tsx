import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { PetColorMultiSelect } from "@/features/pets/components/pet-color-multi-select";
import { useAddPet } from "@/features/pets/hooks";
import {
  createSpeciesSchema,
  createStatusSchema,
  createSexSchema,
  createSizeSchema,
  getSpeciesOptions,
  getStatusOptions,
  getSexOptions,
  getSizeOptions,
} from "@/features/pets/constants";

// Single schema that handles both modes
const petFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  species: createSpeciesSchema(),
  status: createStatusSchema(),
  breed: z.string().optional(),
  age: z.number().min(0).max(30).optional(),
  sex: createSexSchema(),
  size: createSizeSchema(),
  colors: z.array(z.string()).optional(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
});

type PetFormData = z.infer<typeof petFormSchema>;

export const AddPet = () => {
  const [open, setOpen] = useState(false);
  const [isCompleteMode, setIsCompleteMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { addPetAsync, isLoading } = useAddPet();

  // Get options for form selects
  const speciesOptions = getSpeciesOptions();
  const statusOptions = getStatusOptions();
  const sexOptions = getSexOptions();
  const sizeOptions = getSizeOptions();

  const form = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: undefined,
      status: undefined,
      breed: "",
      age: undefined,
      sex: undefined,
      size: undefined,
      colors: [],
      description: "",
      photoUrl: "",
    },
  });

  const onSubmit = async (data: PetFormData) => {
    try {
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
      console.log("Mascota agregada exitosamente");

      // Close modal and reset form
      setOpen(false);
      form.reset();
      setSelectedFile(null);
      setIsCompleteMode(false);
    } catch {
      // Error is handled by the mutation, but we can show a message here too
      console.error(
        "Error al agregar la mascota. Por favor, intenta de nuevo.",
      );
    }
  };

  const handleFileChange = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
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
    setSelectedFile(null);
    if (isCompleteMode) {
      form.setValue("photoUrl", "");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleModeChange = (checked: boolean) => {
    setIsCompleteMode(checked);
    // No need to sync data since we're using a single form
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-amber-200 hover:bg-amber-300 sm:w-auto"
          size="lg"
        >
          <PlusIcon className="size-4" />
          <span>Agregar mascota</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] w-[95vw] flex-col overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Agregar nueva mascota</DialogTitle>
          <DialogDescription>
            {isCompleteMode
              ? "Completa toda la información de la mascota. Los campos marcados con * son requeridos."
              : "Información básica para agregar rápidamente una mascota. Puedes completar más detalles después."}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                "text-muted-foreground text-xs sm:text-sm",
                !isCompleteMode && "text-primary",
              )}
            >
              Modo rápido
            </span>
            <Switch
              checked={isCompleteMode}
              onCheckedChange={handleModeChange}
            />
            <span
              className={cn(
                "text-muted-foreground text-xs sm:text-sm",
                isCompleteMode && "text-primary",
              )}
            >
              Modo completo
            </span>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Essential fields - always shown */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Luna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especie *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una especie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {speciesOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional fields - only shown in complete mode */}
            {isCompleteMode && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Raza</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Golden Retriever"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edad (años)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ej: 3"
                            min="0"
                            max="30"
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sexo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona el sexo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sexOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
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
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tamaño</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona el tamaño" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
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
                    name="colors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Colores</FormLabel>
                        <FormControl>
                          <PetColorMultiSelect
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Seleccionar colores"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe la personalidad, características especiales, necesidades médicas, etc."
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
                    <FormItem>
                      <FormLabel>Imagen</FormLabel>
                      <FormControl>
                        <div className="space-y-2 overflow-hidden">
                          <div
                            {...getRootProps()}
                            className={cn(
                              "flex h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4",
                              isDragActive && "border-primary",
                              selectedFile && "border-primary bg-primary/5",
                            )}
                          >
                            <input {...getInputProps()} />

                            {selectedFile ? (
                              <>
                                <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
                                  <div className="text-muted-foreground truncate text-sm">
                                    {selectedFile.name}
                                  </div>
                                  <div className="text-muted-foreground mt-1 text-xs">
                                    Haz clic o arrastra para cambiar
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex h-full flex-col items-center justify-center text-center">
                                <p className="text-muted-foreground text-sm">
                                  {isDragActive
                                    ? "Suelta la imagen aquí (máx. 10MB)"
                                    : "Sube una imagen de la mascota (JPG, PNG, WebP) (máx. 10MB)"}
                                </p>
                              </div>
                            )}
                          </div>
                          {selectedFile && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveFile}
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground shrink-0"
                            >
                              <XIcon className="mr-1 h-3 w-3" />
                              Eliminar imagen
                            </Button>
                          )}
                        </div>
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
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Agregando..."
                  : isCompleteMode
                    ? "Agregar mascota"
                    : "Agregar rápidamente"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
