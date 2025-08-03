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
import { Badge } from "@/components/ui/badge";
import { petStatusColorMap } from "@/features/pets/utils/pet-table-utils";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { SearchPet, AddPet } from "@/features/pets/components";
import {
  PET_SPECIES_LABELS,
  PET_STATUS_LABELS,
  PetStatus,
} from "@/features/pets/constants";

export const columns: ColumnDef<Pet>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const pet = row.original;
      return (
        <div className="flex items-center gap-2">
          <PetAvatar pet={pet} size="sm" />
          <div className="font-medium text-amber-900">
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
        <div className="">
          <Badge
            className={`text-muted-foreground px-1.5 ${petStatusColorMap[status]} capitalize`}
          >
            {PET_STATUS_LABELS[status]}
          </Badge>
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
      <div className="flex flex-col items-center justify-between gap-4 pb-4 sm:flex-row">
        <SearchPet table={table} />
        <AddPet />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer transition-colors hover:bg-amber-100/60"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    navigate(paths.app.pet.getHref(row.original.id.toString()))
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
