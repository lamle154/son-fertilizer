import { useCallback, useEffect, useState } from 'react';

import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/animate-ui/components/buttons/button';
import { CategoriesForm } from '@/components/categories/form';
import { CategoriesTable } from '@/components/categories/table';
import { Input } from '@/components/ui/input';
import { Category } from '@/generated/types';
import { useCategoriesStore } from '@/stores/categories';

export const Categories = () => {
  const [search, setSearch] = useState('');
  const { categories, fetch, save, saveState } = useCategoriesStore();
  const { data, pagination, fetching } = categories;

  useEffect(() => {
    (async () => await fetch('', 1, 10))();
  }, []);

  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      (async () => await fetch(search, 1, 10))();
    },
    [search, fetch],
  );

  const handleSaveCategory = useCallback(async (data: Category) => {
    await save(data);
  }, []);

  console.log(saveState);

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 rounded-xl bg-muted/50 p-4">
        <form className="flex w-full max-w-sm items-center gap-2" onSubmit={handleSearch}>
          <Input
            placeholder="Lọc theo tên"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button disabled={fetching} size="icon" type="submit" variant="outline">
            <SearchIcon />
          </Button>
        </form>
        <div />
        <div className="flex justify-end">
          <CategoriesForm {...saveState} onSubmit={handleSaveCategory} />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <CategoriesTable data={data} fetching={fetching} pagination={pagination} />
      </div>
    </>
  );
};
