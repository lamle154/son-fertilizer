import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/common/table';
import type { Category, Pagination } from '@/generated';
import { formatDate } from '@/lib/date';

interface CategoriesTableProps {
  data: Category[];
  pagination: Pagination;
  fetching: boolean;
}

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Tên',
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: 'detail',
    header: 'Chi tiết',
    cell: ({ row }) => <div className="capitalize">{row.original.detail}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => <div className="capitalize">{formatDate(row.original.createdAt)}</div>,
  },
];

export function CategoriesTable({ data, pagination, fetching }: CategoriesTableProps) {
  return (
    <DataTable<Category> columns={columns} data={data} loading={fetching} pagination={pagination} />
  );
}
