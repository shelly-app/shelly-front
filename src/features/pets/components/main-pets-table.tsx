import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pet, PetStatus } from '../types/pet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { petStatusColorMap } from '../utils/pet-table-utils';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';

export const columns: ColumnDef<Pet>[] = [
  {
    accessorKey: 'photoUrl',
    header: 'Nombre',
    cell: ({ row }) => {
      const { name, species } = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.getValue('photoUrl')} />
            <AvatarFallback>{species === 'gato' ? 'CT' : 'DG'}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'species',
    header: 'Especie',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('species')}</div>
    ),
  },
  {
    accessorKey: 'breed',
    header: () => 'Raza',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('breed')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: () => 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status') as PetStatus;
      return (
        <div className="">
          <Badge
            className={`text-muted-foreground px-1.5 ${petStatusColorMap[status]} capitalize`}
          >
            {row.getValue('status')}
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full">
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
                  className="cursor-pointer hover:bg-gray-100"
                  data-state={row.getIsSelected() && 'selected'}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
