"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { DayPickerProps } from "react-day-picker";
import { es } from "react-day-picker/locale";

export const InputDatePicker = (
  calendarProps: DayPickerProps & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  } & { label?: string; clearEnable?: boolean; onClear?: () => void },
) => {
  const [open, setOpen] = React.useState(false);
  const handleClear = () => {
    if (calendarProps.onClear) {
      calendarProps.onClear();
    }
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-3">
      {calendarProps.label && (
        <Label htmlFor="date" className="px-1">
          {calendarProps.label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal w-fit"
          >
            {(() => {
              switch (calendarProps.mode) {
                case "single":
                  return calendarProps.selected ? (
                    format(calendarProps.selected, "yyyy/MM/dd")
                  ) : (
                    <span className="text-muted-foreground">
                      Selecciona una fecha
                    </span>
                  );
                case "multiple":
                  return calendarProps.selected &&
                    calendarProps.selected.length > 0 ? (
                    `${calendarProps.selected.length} fechas seleccionadas`
                  ) : (
                    <span className="text-muted-foreground">
                      Selecciona las fechas
                    </span>
                  );
                case "range":
                  if (calendarProps.selected?.from) {
                    return calendarProps.selected.to
                      ? `${format(calendarProps.selected.from, "yyyy/MM/dd")} - ${format(calendarProps.selected.to, "yyyy/MM/dd")}`
                      : `${format(calendarProps.selected.from, "yyyy/MM/dd")} - ...`;
                  }
                  return (
                    <span className="text-muted-foreground">
                      Selecciona rango de fechas
                    </span>
                  );
                default:
                  return (
                    <span className="text-muted-foreground">
                      Selecciona una fecha
                    </span>
                  );
              }
            })()}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            locale={es}
            captionLayout="dropdown"
            {...calendarProps}
          />
          {calendarProps.clearEnable && (
            <>
              <Separator />
              <Button
                variant="ghost"
                className="w-full rounded-none rounded-b-md"
                onClick={handleClear}
              >
                Limpiar
              </Button>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputDatePicker;
