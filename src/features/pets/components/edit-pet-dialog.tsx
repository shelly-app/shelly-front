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
  PET_SEXES,
  PET_SIZE_LABELS,
  PET_SIZES,
  PET_STATUS,
  PET_STATUS_LABELS,
  PetStatus,
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
          <DialogTitle>Edit Pet Information</DialogTitle>
          <DialogDescription>
            Update the pet's details below. All changes will be saved when you
            click "Save Changes".
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedPet.name}
                onChange={(e) =>
                  setEditedPet((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species</Label>
              <Input
                id="species"
                value={editedPet.species}
                onChange={(e) =>
                  setEditedPet((prev) => ({
                    ...prev,
                    species: e.target.value as PetSpecies,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                value={editedPet.breed}
                onChange={(e) =>
                  setEditedPet((prev) => ({ ...prev, breed: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
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
              <Label htmlFor="status">Status</Label>
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
                  <SelectItem value={PET_STATUS.IN_SHELTER}>
                    {PET_STATUS_LABELS[PET_STATUS.IN_SHELTER]}
                  </SelectItem>
                  <SelectItem value={PET_STATUS.IN_TRANSIT}>
                    {PET_STATUS_LABELS[PET_STATUS.IN_TRANSIT]}
                  </SelectItem>
                  <SelectItem value={PET_STATUS.ADOPTED}>
                    {PET_STATUS_LABELS[PET_STATUS.ADOPTED]}
                  </SelectItem>
                  <SelectItem value={PET_STATUS.IN_VET}>
                    {PET_STATUS_LABELS[PET_STATUS.IN_VET]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
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
                  <SelectItem value={PET_SEXES.MALE}>
                    {PET_SEX_LABELS[PET_SEXES.MALE]}
                  </SelectItem>
                  <SelectItem value={PET_SEXES.FEMALE}>
                    {PET_SEX_LABELS[PET_SEXES.FEMALE]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
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
                  <SelectItem value={PET_SIZES.SMALL}>
                    {PET_SIZE_LABELS[PET_SIZES.SMALL]}
                  </SelectItem>
                  <SelectItem value={PET_SIZES.MEDIUM}>
                    {PET_SIZE_LABELS[PET_SIZES.MEDIUM]}
                  </SelectItem>
                  <SelectItem value={PET_SIZES.LARGE}>
                    {PET_SIZE_LABELS[PET_SIZES.LARGE]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Colors</Label>
            <PetColorMultiSelect
              value={editedPet.colors}
              onValueChange={(colors) =>
                setEditedPet((prev) => ({ ...prev, colors }))
              }
              placeholder="Seleccionar colores"
            />
          </div>

          <div className="space-y-2">
            <Label>Vaccines</Label>
            <div className="mb-2 flex flex-wrap gap-2">
              {editedPet.vaccines?.map((vaccine) => (
                <Badge key={vaccine} variant="secondary" className="gap-1">
                  {vaccine}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeVaccine(vaccine)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new vaccine"
                value={newVaccine}
                onChange={(e) => setNewVaccine(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addVaccine()}
              />
              <Button onClick={addVaccine} variant="outline" size="sm">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
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
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
