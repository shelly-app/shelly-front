import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Shelter } from "@/features/shelters/types/shelter";
import { SearchShelter } from "./search-shelter";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { getNameInitials } from "@/lib/utils";
import { paths } from "@/config/paths";

const columns: ColumnDef<Shelter>[] = [
  {
    accessorKey: "name",
    header: "shelters.table.name",
    cell: ({ row }) => {
      const shelter = row.original;
      return (
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-sm font-medium">
              {getNameInitials(shelter.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{shelter.name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: "shelters.table.location",
    cell: ({ row }) => {
      const shelter = row.original;
      return (
        <div className="flex items-center gap-2">
          <MapPin className="text-muted-foreground h-4 w-4" />
          <span>
            {shelter.city}, {shelter.country}
          </span>
        </div>
      );
    },
  },
];

interface SheltersTableProps {
  data: Shelter[];
}

export const SheltersTable = ({ data }: SheltersTableProps) => {
  const [shelterSearchFilter, setShelterSearchFilter] =
    useState<ColumnFiltersState>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setShelterSearchFilter,
    state: {
      columnFilters: shelterSearchFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
        <SearchShelter table={table} />
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
                  className="group hover:bg-muted/40 cursor-pointer transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    navigate(
                      paths.shelters.shelter.getHref(
                        row.original.id.toString(),
                      ),
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
                  {t("shelters.no_results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
