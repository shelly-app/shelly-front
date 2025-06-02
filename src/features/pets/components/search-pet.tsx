import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Pet } from '../types/pet';
import type { Table } from '@tanstack/react-table';

const SearchPet = ({ table }: { table: Table<Pet> }) => {
  return (
    <div className="flex items-center py-4">
      <Input
        className="max-w-sm"
        placeholder="Buscar mascota..."
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        leftIcon={<SearchIcon className="h-4 w-4" />}
      />
    </div>
  );
};

export default SearchPet;
