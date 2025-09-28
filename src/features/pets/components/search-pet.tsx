import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Pet } from "@/features/pets/types/pet";
import type { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

export const SearchPet = ({ table }: { table: Table<Pet> }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full items-center sm:max-w-sm">
      <Input
        fullWidth
        placeholder={t("app.pets.search_placeholder")}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        leftIcon={<SearchIcon className="h-4 w-4" />}
      />
    </div>
  );
};
