import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { PlusIcon, XIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// Schema for quick add (only essential fields)
const quickAddPetSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.enum(['gato', 'perro'] as const, {
    required_error: 'La especie es requerida',
  }),
  status: z.enum(['en transito', 'en refugio', 'adoptado'] as const, {
    required_error: 'El estado es requerido',
  }),
});

// Schema for complete add (all fields)
const completeAddPetSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.enum(['gato', 'perro'] as const, {
    required_error: 'La especie es requerida',
  }),
  status: z.enum(['en transito', 'en refugio', 'adoptado'] as const, {
    required_error: 'El estado es requerido',
  }),
  breed: z.string().optional(),
  age: z.number().min(0).max(30).optional(),
  sex: z.enum(['macho', 'hembra'] as const).optional(),
  size: z.enum(['pequeño', 'mediano', 'grande'] as const).optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
});

type QuickAddPetFormData = z.infer<typeof quickAddPetSchema>;
type CompleteAddPetFormData = z.infer<typeof completeAddPetSchema>;

export const AddPet = () => {
  const [open, setOpen] = useState(false);
  const [isCompleteMode, setIsCompleteMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const quickForm = useForm<QuickAddPetFormData>({
    resolver: zodResolver(quickAddPetSchema),
    defaultValues: {
      name: '',
      species: undefined,
      status: undefined,
    },
  });

  const completeForm = useForm<CompleteAddPetFormData>({
    resolver: zodResolver(completeAddPetSchema),
    defaultValues: {
      name: '',
      species: undefined,
      status: undefined,
      breed: '',
      age: undefined,
      sex: undefined,
      size: undefined,
      color: '',
      description: '',
      photoUrl: '',
    },
  });

  const currentForm = isCompleteMode ? completeForm : quickForm;

  const onSubmit = async (
    data: QuickAddPetFormData | CompleteAddPetFormData,
  ) => {
    try {
      // TODO: Implement API call to create pet
      console.log('Pet data:', data);
      console.log('Selected file:', selectedFile);

      // Close modal and reset forms
      setOpen(false);
      quickForm.reset();
      completeForm.reset();
      setSelectedFile(null);
      setIsCompleteMode(false);
    } catch (error) {
      console.error('Error creating pet:', error);
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
          completeForm.setValue('photoUrl', e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (isCompleteMode) {
      completeForm.setValue('photoUrl', '');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleModeChange = (checked: boolean) => {
    setIsCompleteMode(checked);
    // Sync form data between modes
    if (checked) {
      // Going from quick to complete - preserve essential fields
      const quickData = quickForm.getValues();
      completeForm.setValue('name', quickData.name);
      completeForm.setValue('species', quickData.species);
      completeForm.setValue('status', quickData.status);
    } else {
      // Going from complete to quick - preserve essential fields
      const completeData = completeForm.getValues();
      quickForm.setValue('name', completeData.name);
      quickForm.setValue('species', completeData.species);
      quickForm.setValue('status', completeData.status);
    }
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
              ? 'Completa toda la información de la mascota. Los campos marcados con * son requeridos.'
              : 'Información básica para agregar rápidamente una mascota. Puedes completar más detalles después.'}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                'text-muted-foreground text-xs sm:text-sm',
                !isCompleteMode && 'text-primary',
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
                'text-muted-foreground text-xs sm:text-sm',
                isCompleteMode && 'text-primary',
              )}
            >
              Modo completo
            </span>
          </div>
        </div>

        <Form {...currentForm}>
          <form
            onSubmit={currentForm.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Essential fields - always shown */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={currentForm.control}
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
                control={currentForm.control}
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
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={currentForm.control}
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
                        <SelectItem value="en transito">En tránsito</SelectItem>
                        <SelectItem value="en refugio">En refugio</SelectItem>
                        <SelectItem value="adoptado">Adoptado</SelectItem>
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
                    control={completeForm.control}
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
                    control={completeForm.control}
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
                    control={completeForm.control}
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
                            <SelectItem value="macho">Macho</SelectItem>
                            <SelectItem value="hembra">Hembra</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={completeForm.control}
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
                            <SelectItem value="pequeño">Pequeño</SelectItem>
                            <SelectItem value="mediano">Mediano</SelectItem>
                            <SelectItem value="grande">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={completeForm.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Marrón y blanco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={completeForm.control}
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
                  control={completeForm.control}
                  name="photoUrl"
                  render={() => (
                    <FormItem>
                      <FormLabel>Imagen</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div
                            {...getRootProps()}
                            className={cn(
                              'flex h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed',
                              isDragActive && 'border-primary',
                              selectedFile && 'border-primary bg-primary/5',
                            )}
                          >
                            <input {...getInputProps()} />

                            {selectedFile ? (
                              <>
                                <div className="flex h-full flex-col items-center justify-center text-center">
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
                                    ? 'Suelta la imagen aquí'
                                    : 'Sube una imagen de la mascota (JPG, PNG, WebP)'}
                                </p>
                              </div>
                            )}
                          </div>
                          {selectedFile && (
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <div className="text-muted-foreground truncate text-sm">
                                Archivo seleccionado: {selectedFile.name}
                              </div>
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
                            </div>
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
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isCompleteMode ? 'Agregar mascota' : 'Agregar rápidamente'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
