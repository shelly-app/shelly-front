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
import { Pet } from "@/features/pets/types/pet";
import { PetAvatar } from "@/components/ui/pet-avatar";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { SearchPet, AddPet, PetStatusBadge } from "@/features/pets/components";
import { PET_SPECIES_LABELS, PetStatus } from "@/features/pets/constants";

export const columns: ColumnDef<Pet>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
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
    accessorKey: "species",
    header: "Especie",
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
    header: () => "Raza",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("breed")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => "Estado",
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

interface MainPetsTableProps {
  data: Pet[];
}

export const MainPetsTable = ({ data }: MainPetsTableProps) => {
  const navigate = useNavigate();
  const [petSearchFilter, setPetSearchFilter] = useState<ColumnFiltersState>(
    [],
  );

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
        <SearchPet table={table} />
        <AddPet />
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
                  onClick={() =>
                    navigate(
                      paths.app.pets.pet.getHref(row.original.id.toString()),
                    )
                  }
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
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
