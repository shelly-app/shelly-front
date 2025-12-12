import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PetAvatar } from "@/components/ui/pet-avatar";
import { PetStatusBadge } from "@/features/pets/components";
import { PET_SPECIES_LABELS, PetStatus } from "@/features/pets/constants";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "lucide-react";
import type { ShelterPet } from "@/features/shelters/constants/mock-shelter-pets";

const columns: ColumnDef<ShelterPet>[] = [
  {
    accessorKey: "name",
    header: "app.pets.name",
    cell: ({ row }) => {
      const pet = row.original;
      return (
        <div className="flex items-center gap-4">
          <PetAvatar pet={pet} size="md" />
          <div className="font-semibold">{row.getValue("name")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "species",
    header: "app.pets.species",
    cell: ({ row }) => (
      <div className="capitalize">
        {
          PET_SPECIES_LABELS[
            row.getValue("species") as keyof typeof PET_SPECIES_LABELS
          ]
        }
      </div>
    ),
  },
  {
    accessorKey: "breed",
    header: "app.pets.breed",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("breed")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "app.pets.status",
    cell: ({ row }) => {
      const status = row.getValue("status") as PetStatus;
      return (
        <div>
          <PetStatusBadge status={status} />
        </div>
      );
    },
  },
];

interface ShelterPetsTableProps {
  data: ShelterPet[];
}

export const ShelterPetsTable = ({ data }: ShelterPetsTableProps) => {
  const [petSearchFilter, setPetSearchFilter] = useState<ColumnFiltersState>(
    [],
  );
  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setPetSearchFilter,
    state: {
      columnFilters: petSearchFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
        <div className="flex w-full items-center sm:max-w-sm">
          <Input
            fullWidth
            placeholder={t("shelters.details.search_pet_placeholder")}
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            leftIcon={<SearchIcon className="h-4 w-4" />}
          />
        </div>
      </div>
      <div className="bg-card rounded-md border shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-muted py-6 text-sm first-of-type:pl-6 last-of-type:pr-6"
                  >
                    {!header.isPlaceholder &&
                      flexRender(
                        t(header.column.columnDef.header as string),
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group hover:bg-muted/40 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-6 first-of-type:pl-6 last-of-type:pr-6"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-24 p-6">
                <TableCell colSpan={columns.length} className="text-center">
                  {t("shelters.details.no_pets")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
