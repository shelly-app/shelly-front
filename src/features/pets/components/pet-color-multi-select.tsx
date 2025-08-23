import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PetColorBadge } from "./pet-color-badge";
import { PET_COLORS } from "../constants";

interface PetColorMultiSelectProps {
  value?: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const PetColorMultiSelect: React.FC<PetColorMultiSelectProps> = ({
  value = [],
  onValueChange,
  placeholder = "Seleccionar colores",
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (color: string) => {
    if (value.includes(color)) {
      // Remove color if already selected
      onValueChange(value.filter((c) => c !== color));
    } else {
      // Add color if not selected
      onValueChange([...value, color]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-auto min-h-[40px] w-full justify-between",
            className,
          )}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              value.map((color) => (
                <PetColorBadge
                  key={color}
                  color={color}
                  className="text-xs"
                  showPalette={true}
                />
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar color..." />
          <CommandList>
            <CommandEmpty>No se encontraron colores.</CommandEmpty>
            <CommandGroup>
              {Object.entries(PET_COLORS).map(([colorName, hexValue]) => (
                <CommandItem
                  key={colorName}
                  value={colorName}
                  onSelect={() => handleSelect(colorName)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="border-border h-3 w-3 rounded-full border"
                    style={{
                      backgroundColor: hexValue,
                      boxShadow:
                        hexValue === "#FFFFFF"
                          ? "inset 0 0 0 1px #e5e7eb"
                          : "none",
                    }}
                  />
                  <span className="flex-1">{colorName}</span>
                  {value.includes(colorName) && <Check className="h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
