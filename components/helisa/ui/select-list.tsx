"use client";

import { cn } from "@/lib/utils";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type Props<T> = {
  data?: T[];
  getOptionValue: (item: T) => string;
  getOptionLabel: (item: T) => string;

  // Valor seleccionado actual
  value?: string | null;

  // Callbacks
  onChange?: (value: string | null, item: T | null) => void;

  // Configuración de UI
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  clearLabel?: string;
  closeLabel?: string;

  // Estados
  disabled?: boolean;

  // Testing
  testId?: string;

  // Clases personalizadas
  className?: string;
  popoverClassName?: string;
};

function SelectList<T>({
  data = [],
  getOptionValue,
  getOptionLabel,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  searchPlaceholder = "Buscar...",
  emptyMessage = "No se encontraron resultados.",
  clearLabel = "Limpiar",
  closeLabel = "Cerrar",
  disabled = false,
  testId,
  popoverClassName,
}: Props<T>) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    value ?? null,
  );
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  React.useEffect(() => {
    setSelectedValue(value ?? null);
  }, [value]);

  const handleSelect = (newValue: string | null) => {
    setSelectedValue(newValue);
    const selectedItem = newValue
      ? (data.find((item) => getOptionValue(item) === newValue) ?? null)
      : null;

    onChange?.(newValue, selectedItem);
    setIsPopoverOpen(false);
  };

  const handleClear = () => {
    handleSelect(null);
  };

  const getSelectedLabel = () => {
    if (selectedValue == null) return null;
    const selected = data.find(
      (item) => getOptionValue(item) === selectedValue,
    );
    return selected ? getOptionLabel(selected) : null;
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className="w-full justify-between"
            disabled={disabled}
            data-test-id={testId || "select-list-button"}
          >
            <span
              className="flex-1 text-left truncate pr-6"
              title={getSelectedLabel() || undefined}
            >
              {getSelectedLabel() || (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "w-(--radix-popover-trigger-width) p-0",
            popoverClassName,
          )}
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList className="max-h-[unset] overflow-y-hidden">
              {data.length ? (
                <>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>

                  <CommandGroup className="max-h-80 overflow-y-auto">
                    {data.map((item, index) => {
                      const itemValue = getOptionValue(item);
                      const itemLabel = getOptionLabel(item);
                      const isSelected = selectedValue === itemValue;

                      return (
                        <CommandItem
                          key={`${itemValue}-${index}`}
                          onSelect={() => handleSelect(itemValue)}
                          className="cursor-pointer flex items-start gap-2 py-2"
                        >
                          <div
                            className={cn(
                              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center",
                              isSelected ? "text-primary" : "invisible",
                            )}
                          >
                            <CheckIcon className="w-4 h-4" />
                          </div>
                          <span className="whitespace-normal leading-relaxed text-sm">
                            {itemLabel}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup>
                    <div className="flex items-center justify-between">
                      {selectedValue != null && (
                        <>
                          <CommandItem
                            onSelect={handleClear}
                            className="justify-center flex-1 cursor-pointer"
                          >
                            {clearLabel}
                          </CommandItem>
                          <Separator
                            orientation="vertical"
                            className="flex h-full mx-2 min-h-6"
                          />
                        </>
                      )}
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className="justify-center flex-1 max-w-full cursor-pointer"
                      >
                        {closeLabel}
                      </CommandItem>
                    </div>
                  </CommandGroup>
                </>
              ) : (
                <div className="p-4 flex items-center justify-center">
                  <span className="whitespace-normal leading-relaxed text-sm">
                    No hay opciones disponibles.
                  </span>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SelectList;
