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
  const [newColor, setNewColor] = useState("");
  const [newVaccine, setNewVaccine] = useState("");

  const handleSave = () => {
    onSave(editedPet);
    onOpenChange(false);
  };

  const addColor = () => {
    if (newColor.trim() && !editedPet.colors?.includes(newColor.trim())) {
      setEditedPet((prev) => ({
        ...prev,
        colors: [...(prev.colors || []), newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const removeColor = (colorToRemove: string) => {
    setEditedPet((prev) => ({
      ...prev,
      colors: prev.colors?.filter((color) => color !== colorToRemove),
    }));
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
                onValueChange={(
                  value: "in shelter" | "in transit" | "adopted" | "in vet",
                ) => setEditedPet((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in shelter">In Shelter</SelectItem>
                  <SelectItem value="in transit">In Transit</SelectItem>
                  <SelectItem value="adopted">Adopted</SelectItem>
                  <SelectItem value="in vet">In Vet</SelectItem>
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
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
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
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="mb-2 flex flex-wrap gap-2">
              {editedPet.colors?.map((color) => (
                <Badge key={color} variant="secondary" className="gap-1">
                  {color}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeColor(color)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addColor()}
              />
              <Button onClick={addColor} variant="outline" size="sm">
                Add
              </Button>
            </div>
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
