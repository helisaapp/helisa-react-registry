"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import React from "react";

interface FormSkeletonProps {
  fields?: number;
  withLabels?: boolean;
  withButton?: boolean;
  fieldHeight?: "small" | "medium" | "large";
  layout?: "vertical" | "horizontal";
  className?: string;
  fieldClassName?: string;
  labelWidth?: "sm" | "md" | "lg" | "full";
}

const FormSkeleton = ({
  fields = 4,
  withLabels = true,
  withButton = true,
  fieldHeight = "medium",
  layout = "vertical",
  className,
  fieldClassName,
  labelWidth = "md",
}: FormSkeletonProps) => {
  const getFieldHeight = () => {
    switch (fieldHeight) {
      case "small":
        return "h-8";
      case "large":
        return "h-24";
      default:
        return "h-10";
    }
  };

  const getLabelWidth = () => {
    switch (labelWidth) {
      case "sm":
        return "w-16";
      case "lg":
        return "w-32";
      case "full":
        return "w-full";
      default:
        return "w-24";
    }
  };

  return (
    <div className={cn("w-full space-y-4 my-4", className)}>
      {Array(fields)
        .fill(null)
        .map((_, i) => (
          <div
            key={`field-${i}`}
            className={cn(
              "space-y-2",
              layout === "horizontal"
                ? "grid grid-cols-3 items-center gap-4 space-y-0"
                : "",
            )}
          >
            {withLabels && (
              <Skeleton
                className={cn(
                  `h-4 ${getLabelWidth()} bg-gray-200 dark:bg-gray-700 mb-1`,
                  layout === "horizontal" ? "col-span-1" : "",
                )}
              />
            )}
            <Skeleton
              className={cn(
                `${getFieldHeight()} w-full bg-gray-100 dark:bg-gray-800 rounded`,
                layout === "horizontal" ? "col-span-2" : "",
                fieldClassName,
              )}
            />
          </div>
        ))}

      {withButton && (
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      )}
    </div>
  );
};

interface SelectSkeletonProps {
  withLabel?: boolean;
  labelText?: string;
  height?: "sm" | "md" | "lg";
  className?: string;
  withHelperText?: boolean;
}

const SelectSkeleton = ({
  withLabel = true,
  labelText,
  height = "md",
  className,
  withHelperText = false,
}: SelectSkeletonProps) => {
  const getHeight = () => {
    switch (height) {
      case "sm":
        return "h-8";
      case "lg":
        return "h-12";
      default:
        return "h-10";
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {withLabel &&
        (labelText ? (
          <div className="text-sm font-medium text-gray-500">{labelText}</div>
        ) : (
          <Skeleton className="h-4 w-24 mb-1 bg-gray-200 dark:bg-gray-700" />
        ))}
      <Skeleton
        className={cn(
          getHeight(),
          "w-full rounded-md bg-gray-100 dark:bg-gray-800",
        )}
      />
      {withHelperText && (
        <Skeleton className="h-3 w-32 mt-1 bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showPagination?: boolean;
  className?: string;
  rowClassName?: string;
  cellClassName?: string;
  withHeaderFilter?: boolean;
}

const TableSkeleton = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  showPagination = true,
  className,
  rowClassName,
  cellClassName,
  withHeaderFilter = false,
}: TableSkeletonProps) => {
  const columnsHeader = Array(columns > 12 ? 12 : columns).fill(null);
  return (
    <div
      className={cn(
        "w-full space-y-4 container mx-auto p-4 my-4 rounded-xl border bg-card",
        className,
      )}
    >
      {withHeaderFilter && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[200px] bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-[100px] bg-gray-200 dark:bg-gray-700" />
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        {showHeader && (
          <div className="bg-gray-50 dark:bg-gray-800 px-3">
            <div className="flex items-center h-10">
              {columnsHeader.map((_, i) => (
                <Skeleton
                  key={`header-${i}`}
                  className={cn(
                    "h-6 mx-2 flex-1 bg-gray-200 dark:bg-gray-700",
                    cellClassName,
                  )}
                />
              ))}
            </div>
          </div>
        )}

        <div className="px-3">
          {Array(rows)
            .fill(null)
            .map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={cn(`flex items-center border-t h-10`, rowClassName)}
              >
                {columnsHeader.map((_, colIndex) => (
                  <Skeleton
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(
                      "h-2 mx-2 flex-1 bg-gray-100 dark:bg-gray-700",
                      cellClassName,
                    )}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>

      {showPagination && (
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Skeleton className="h-8 w-52 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-28 bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
};

export { FormSkeleton, SelectSkeleton, TableSkeleton };
