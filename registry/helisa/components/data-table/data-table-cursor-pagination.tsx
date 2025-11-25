import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CursorPaginationConfig {
  hasNext: boolean;
  hasPrevious: boolean;
}

interface DataTableCursorPaginationProps {
  pagination: CursorPaginationConfig;
  onNavigate: (direction: "next" | "previous") => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTableCursorPagination({
  pagination,
  onNavigate,
  pageSize,
  pageSizeOptions = [5, 10, 20, 30, 40],
  onPageSizeChange,
}: DataTableCursorPaginationProps) {
  return (
    <div className="w-full flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        {pageSize !== undefined && onPageSizeChange && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Registros por página</p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                onPageSizeChange(Number(value));
              }}
            >
              <SelectTrigger
                className="h-8 w-[70px]"
                data-test-id="cursor-page-size-select"
              >
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {(pageSizeOptions && pageSizeOptions.length > 0
                  ? pageSizeOptions
                  : [5, 10, 20, 30, 40]
                ).map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("previous")}
            disabled={!pagination.hasPrevious}
            className="flex items-center gap-2"
            data-test-id="cursor-previous-button"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("next")}
            disabled={!pagination.hasNext}
            className="flex items-center gap-2"
            data-test-id="cursor-next-button"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
