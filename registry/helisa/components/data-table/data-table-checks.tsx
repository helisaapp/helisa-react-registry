import { Checkbox } from "@/components/ui/checkbox";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Row } from "@tanstack/react-table";

/**
 * Checkbox for selecting a row
 */
type CellCheckboxProps<T> = {
  row: Row<T>;
  isRowSelected?: (rows: T) => boolean;
  onRowSelected?: (rows: T) => void;
  onRowRemove?: (rows: T) => void;
  disabled?: boolean;
};
export const CellCheckbox = <T,>({
  row,
  isRowSelected,
  onRowSelected,
  onRowRemove,
  disabled,
}: CellCheckboxProps<T>) => {
  const isSelected = isRowSelected
    ? isRowSelected(row.original)
    : row.getIsSelected();

  return (
    <Checkbox
      checked={isSelected}
      disabled={disabled}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);
        if (onRowSelected && onRowRemove) {
          if (!isSelected) {
            onRowSelected(row.original);
          } else {
            onRowRemove(row.original);
          }
        }
      }}
      aria-label="Select row"
      data-test-id={`row-checkbox-${row.id}`}
    />
  );
};

/**
 * Header checkbox for selecting all rows
 */
type HeaderCheckboxProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
  isRowsSelected?: () => CheckedState;
  onRowsSelected?: (rows: T[]) => void;
  onRowsRemove?: (rows: T[]) => void;
  disabled?: boolean;
};

export const HeaderCheckbox = <T,>({
  table,
  isRowsSelected,
  onRowsSelected,
  onRowsRemove,
  disabled,
}: HeaderCheckboxProps<T>) => {
  const isAllSelected =
    isRowsSelected !== undefined
      ? isRowsSelected()
      : table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate");

  return (
    <Checkbox
      checked={isAllSelected}
      disabled={disabled}
      onCheckedChange={(value) => {
        if (isRowsSelected === undefined) {
          table.toggleAllPageRowsSelected(!!value);
        }
        if (onRowsSelected && onRowsRemove) {
          if (!isAllSelected || isAllSelected === "indeterminate") {
            onRowsSelected(
              table.getRowModel().rows.map((row: Row<T>) => row.original),
            );
          } else {
            onRowsRemove([]);
          }
        }
      }}
      aria-label="Select all"
      data-test-id="header-checkbox"
    />
  );
};
