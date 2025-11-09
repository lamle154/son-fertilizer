import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Category, Pagination } from '@/generated';
import { fetchCategories, insertCategory } from '@/generated';

interface CategoriesStore {
  categories: {
    fetching: boolean;
    data: Category[];
    pagination: Pagination;
  };
  saveState: {
    saving: boolean;
    error: Record<string, string> | null; // Changed from nested structure
  };
  fetch: (search: string, page: number, size: number) => Promise<void>;
  save: (data: Category) => Promise<void>;
}

export const useCategoriesStore = create(
  immer<CategoriesStore>(set => ({
    categories: {
      fetching: false,
      data: [] as Category[],
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      } as Pagination,
    },
    saveState: {
      saving: false,
      error: null,
    },
    fetch: async (search: string, page: number, size: number) => {
      set(state => {
        state.categories.fetching = true;
      });

      await fetchCategories(
        { search, page, size },
        {
          onSuccess: data => {
            set(state => {
              state.categories.fetching = false;
              state.categories.data = data.categories;
              state.categories.pagination = data.pagination;
            });
          },
        },
      );
    },
    save: async (data: Category) => {
      try {
        set(state => {
          state.saveState.saving = true;
        });

        await insertCategory({ params: { name: data.name, detail: data.detail } });
      } catch (error) {
        set(state => {
          state.saveState.error = (error as Record<string, string>) ?? null;
        });
      } finally {
        set(state => {
          state.saveState.saving = false;
        });
      }
    },
  })),
);
