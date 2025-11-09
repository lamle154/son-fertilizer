'use client';

import { useCallback, useMemo, useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as TableType,
} from '@tanstack/react-table';

import { Pagination } from '@/components/common/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Pagination as PaginationType } from '@/generated';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  pagination?: PaginationType;
}

function TableBodyContent<T>(props: {
  table: TableType<T>;
  loading?: boolean;
  columnLength: number;
}) {
  const { table, loading, columnLength } = props;

  const skeletonRows = useMemo(() => {
    return (
      <TableRow>
        {Array.from({ length: columnLength }).map((_, index) => (
          <TableCell className="h-8 text-center" key={index}>
            <Skeleton className="w-full h-8" />
          </TableCell>
        ))}
      </TableRow>
    );
  }, [columnLength]);

  if (loading) {
    return (
      <>
        {skeletonRows}
        {skeletonRows}
        {skeletonRows}
      </>
    );
  }

  if (table.getRowModel().rows?.length === 0) {
    return (
      <TableRow>
        <TableCell className="h-24 text-center" colSpan={columnLength}>
          Không có dữ liệu.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {table.getRowModel().rows.map(row => (
        <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function DataTable<T>(props: DataTableProps<T>) {
  const { data, columns, loading, pagination } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableBodyContent columnLength={columns.length} loading={loading} table={table} />
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div />
        {pagination && (
          <div className="space-x-2">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.total}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
