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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Shelter } from "@/features/shelters/types/shelter";
import { SearchShelter } from "./search-shelter";
import { useTranslation } from "react-i18next";
import { MapPin, Mail, Phone, Globe, PawPrint } from "lucide-react";
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
            <AvatarImage src={shelter.logoUrl} alt={shelter.name} />
            <AvatarFallback className="text-sm font-medium">
              {getNameInitials(shelter.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{shelter.name}</span>
            {shelter.description && (
              <span className="text-muted-foreground line-clamp-1 max-w-xs text-xs text-ellipsis">
                {shelter.description}
              </span>
            )}
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
  {
    accessorKey: "petCount",
    header: "shelters.table.pets",
    cell: ({ row }) => {
      const petCount = row.getValue("petCount") as number;
      return (
        <Badge variant="secondary" className="gap-1">
          <PawPrint className="h-3 w-3" />
          {petCount}
        </Badge>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "shelters.table.contact",
    cell: ({ row }) => {
      const shelter = row.original;
      return (
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="text-muted-foreground h-3 w-3" />
            <a
              href={`mailto:${shelter.email}`}
              className="text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {shelter.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-muted-foreground h-3 w-3" />
            <a
              href={`tel:${shelter.phone}`}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {shelter.phone}
            </a>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "website",
    header: "shelters.table.website",
    cell: ({ row }) => {
      const shelter = row.original;
      if (!shelter.website) {
        return <span className="text-muted-foreground">—</span>;
      }
      return (
        <a
          href={shelter.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary flex items-center gap-1 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {shelter.website.replace(/^https?:\/\//, "")}
          </span>
        </a>
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
