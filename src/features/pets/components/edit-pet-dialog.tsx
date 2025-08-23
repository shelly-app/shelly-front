import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PetColorMultiSelect } from "@/features/pets/components/pet-color-multi-select";
import {
  PET_SEX_LABELS,
  PET_SIZE_LABELS,
  PET_SPECIES_LABELS,
  PET_STATUS_LABELS,
  PetStatus,
  VACCINES,
} from "@/features/pets/constants";
import { X } from "lucide-react";
import { Pet } from "@/features/pets/types/pet";
import {
  PetSex,
  PetSize,
  PetSpecies,
  Vaccine,
} from "@/features/pets/constants";

interface EditPetDialogProps {
  pet: Pet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPet: Pet) => void;
}

export const EditPetDialog = ({
  pet,
  open,
  onOpenChange,
  onSave,
}: EditPetDialogProps) => {
  const [editedPet, setEditedPet] = useState<Pet>(pet);
  const [newVaccine, setNewVaccine] = useState("");

  const handleSave = () => {
    onSave(editedPet);
    onOpenChange(false);
  };

  const addVaccine = () => {
    if (
      newVaccine.trim() &&
      !editedPet.vaccines?.includes(newVaccine.trim() as Vaccine)
    ) {
      setEditedPet((prev) => ({
        ...prev,
        vaccines: [...(prev.vaccines || []), newVaccine.trim() as Vaccine],
      }));
      setNewVaccine("");
    }
  };

  const removeVaccine = (vaccineToRemove: string) => {
    setEditedPet((prev) => ({
      ...prev,
      vaccines: prev.vaccines?.filter((vaccine) => vaccine !== vaccineToRemove),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar información de la mascota</DialogTitle>
          <DialogDescription>
            Actualiza los detalles de la mascota a continuación. Todos los
            cambios se guardarán cuando hagas clic en "Guardar cambios".
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                value={editedPet.name}
                onChange={(e) =>
                  setEditedPet((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Especie</Label>
              <Select
                value={editedPet.species}
                onValueChange={(value: PetSpecies) =>
                  setEditedPet((prev) => ({ ...prev, species: value }))
                }
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PET_SPECIES_LABELS).map(([value, label]) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="cursor-pointer"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Raza</Label>
              <Input
                id="breed"
                type="text"
                value={editedPet.breed}
                onChange={(e) =>
                  setEditedPet((prev) => ({ ...prev, breed: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                value={editedPet.age}
                onChange={(e) =>
                  setEditedPet((prev) => ({
                    ...prev,
                    age: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                value={editedPet.status}
                onValueChange={(value: PetStatus) =>
                  setEditedPet((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PET_STATUS_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sexo</Label>
              <Select
                value={editedPet.sex}
                onValueChange={(value: PetSex) =>
                  setEditedPet((prev) => ({ ...prev, sex: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PET_SEX_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Tamaño</Label>
              <Select
                value={editedPet.size}
                onValueChange={(value: PetSize) =>
                  setEditedPet((prev) => ({ ...prev, size: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PET_SIZE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Colores</Label>
            <PetColorMultiSelect
              value={editedPet.colors}
              onValueChange={(colors) =>
                setEditedPet((prev) => ({ ...prev, colors }))
              }
              placeholder="Seleccionar colores"
            />
          </div>

          <div className="space-y-2">
            <Label>Vacunas</Label>
            <div className="mb-2 flex flex-wrap gap-2">
              {editedPet.vaccines?.map((vaccine) => (
                <Badge key={vaccine} variant="secondary" className="gap-1">
                  {VACCINES[editedPet.species][vaccine as Vaccine]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeVaccine(vaccine)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Agregar nueva vacuna"
                value={newVaccine}
                onChange={(e) => setNewVaccine(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addVaccine()}
              />
              <Button onClick={addVaccine} variant="outline" size="sm">
                Agregar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={4}
              value={editedPet.description}
              onChange={(e) =>
                setEditedPet((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
