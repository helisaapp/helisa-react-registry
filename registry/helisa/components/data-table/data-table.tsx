import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  PaginationState,
  Updater,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, ReactNode, useState } from "react";

import { DataTableCursorPagination } from "./data-table-cursor-pagination";
import { DataTablePagination } from "./data-table-pagination";

interface CursorPaginationConfig {
  hasNext: boolean;
  hasPrevious: boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /**
   * setPagination of useState
   */
  onPaginationChange?: (pagination: Updater<PaginationState>) => void;
  rowCount?: number;
  pagination?: PaginationState;
  renderExpandedRow?: (row: TData) => ReactNode;
  isRowExpanded?: (row: TData) => boolean;
  getRowId?: (row: TData) => string;
  // Cursor pagination props
  useCursorPagination?: boolean;
  cursorPagination?: CursorPaginationConfig;
  onCursorNavigate?: (direction: "next" | "previous") => void;
  onPageSizeChange?: (pageSize: number) => void;
  //
  pageSize?: number;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  renderExpandedRow,
  isRowExpanded,
  getRowId,
  useCursorPagination = false,
  cursorPagination,
  onCursorNavigate,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: rowCount || data.length,
    onPaginationChange: onPaginationChange,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: pagination || {
        pageIndex: 0,
        pageSize: 10,
      },
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border" data-test-id="data-table">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-medium">
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
            table.getRowModel().rows.map((row) => {
              const isExpanded = isRowExpanded
                ? isRowExpanded(row.original)
                : false;
              const rowId = getRowId ? getRowId(row.original) : row.id;

              return (
                <Fragment key={rowId}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {isExpanded && renderExpandedRow && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        {renderExpandedRow(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin Resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {useCursorPagination && cursorPagination && onCursorNavigate ? (
        <div className="flex items-center justify-between px-2 mt-4 mb-4 w-full">
          <DataTableCursorPagination
            pagination={cursorPagination}
            onNavigate={onCursorNavigate}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      ) : (
        pagination && (
          <div className="flex items-center justify-between px-2 mt-4 mb-4 w-full">
            <DataTablePagination
              table={table}
              pageSizeOptions={pageSizeOptions}
            />
          </div>
        )
      )}
    </div>
  );
}
