import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import {
  DataTableColumnHeader,
  getColumnAriaSort,
} from "@/components/ui/data-table-column-header";
import { Input } from "@/components/ui/input";
import { PetAvatar } from "@/components/ui/pet-avatar";
import { PetStatusBadge } from "@/features/pets/components";
import { PET_SEX_LABELS, PET_SPECIES_LABELS } from "@/features/pets/constants";
import { calculateAge } from "@/features/pets/utils/age";
import {
  comparePetAge,
  comparePetName,
  comparePetSex,
  comparePetSpecies,
  comparePetStatus,
} from "@/features/pets/utils/pet-table-sorting";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "lucide-react";
import type { DetailedPet } from "@/features/pets/types/pet";
import type { Shelter } from "@/features/shelters/types/shelter";
import { AdoptionRequestDialog } from "./adoption-request-dialog";

interface ShelterPetsTableProps {
  data: DetailedPet[];
  shelter: Shelter | null;
}

export const ShelterPetsTable = ({ data, shelter }: ShelterPetsTableProps) => {
  const [petSearchFilter, setPetSearchFilter] = useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedPet, setSelectedPet] = useState<DetailedPet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setSorting([]);
  }, [shelter?.id]);

  const columns = useMemo<ColumnDef<DetailedPet>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="app.pets.name" />
        ),
        sortingFn: (rowA, rowB) => comparePetName(rowA.original, rowB.original),
        cell: ({ row }) => {
          const pet = row.original;
          return (
            <div className="flex items-center gap-4">
              <PetAvatar pet={pet} size="md" />
              <div className="group-hover:text-primary font-semibold transition-colors">
                {row.getValue("name")}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "specie",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="app.pets.species" />
        ),
        sortingFn: (rowA, rowB) =>
          comparePetSpecies(rowA.original, rowB.original),
        cell: ({ row }) => (
          <div className="capitalize">
            {t(
              PET_SPECIES_LABELS[
                row.getValue("specie") as keyof typeof PET_SPECIES_LABELS
              ] ?? row.getValue("specie"),
            )}
          </div>
        ),
      },
      {
        accessorKey: "sex",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="app.pets.details.sex" />
        ),
        sortingFn: (rowA, rowB) => comparePetSex(rowA.original, rowB.original),
        cell: ({ row }) => {
          const sex = row.getValue("sex") as string | null;
          return (
            <div className="capitalize">
              {sex
                ? t(PET_SEX_LABELS[sex as keyof typeof PET_SEX_LABELS] ?? sex)
                : "--"}
            </div>
          );
        },
      },
      {
        id: "age",
        accessorFn: (pet) => pet.birthDate,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="app.pets.details.age" />
        ),
        sortingFn: (rowA, rowB) => comparePetAge(rowA.original, rowB.original),
        cell: ({ row }) => (
          <div>{calculateAge(row.original.birthDate, t) ?? "--"}</div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="app.pets.status" />
        ),
        sortingFn: (rowA, rowB) =>
          comparePetStatus(rowA.original, rowB.original),
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <div>
              <PetStatusBadge status={status} />
            </div>
          );
        },
      },
    ],
    [t],
  );

  const table = useReactTable({
    data,
    columns,
    enableMultiSort: false,
    enableSortingRemoval: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setPetSearchFilter,
    onSortingChange: setSorting,
    state: {
      columnFilters: petSearchFilter,
      sorting,
    },
  });

  const handleRowClick = (pet: DetailedPet) => {
    setSelectedPet(pet);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full pb-12">
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
                    aria-sort={getColumnAriaSort(header.column)}
                    className="bg-muted py-6 text-sm first-of-type:pl-6 last-of-type:pr-6"
                  >
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
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
                  className="group hover:bg-muted/40 cursor-pointer transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original)}
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

      <AdoptionRequestDialog
        pet={selectedPet}
        shelter={shelter}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};
