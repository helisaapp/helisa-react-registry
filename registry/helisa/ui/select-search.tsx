"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props<T> = {
  data?: T[];
  getOptionValue: (item: T) => string;
  getOptionLabel: (item: T) => string;

  value?: string | null;
  onChange?: (value: string | null, item: T | null) => void;

  // Búsqueda
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
  minLength?: number;

  // Comportamiento
  clearOnSelect?: boolean;

  // UI
  placeholder?: string;
  searchPlaceholder?: string;

  disabled?: boolean;
  testId?: string;
};

function SelectSearch<T>({
  data = [],
  getOptionValue,
  getOptionLabel,
  value,
  onChange,
  searchValue,
  onSearchChange,
  isLoading = false,
  minLength = 2,
  clearOnSelect = false,
  placeholder = "Seleccione una opción",
  searchPlaceholder = "Buscar...",
  disabled,
  testId,
}: Props<T>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const [internalSearch, setInternalSearch] = useState("");
  const search = searchValue ?? internalSearch;

  const handleSelect = (newValue: string | null) => {
    const selectedItem =
      data.find((item) => getOptionValue(item) === newValue) ?? null;

    if (!clearOnSelect) {
      setSelectedLabel(selectedItem ? getOptionLabel(selectedItem) : null);
    }

    onChange?.(newValue, selectedItem);
    setInternalSearch("");
    onSearchChange?.("");

    setIsPopoverOpen(false);
  };

  const handleClear = () => {
    handleSelect(null);
  };

  useEffect(() => {
    if (clearOnSelect) {
      setSelectedLabel(null);
      return;
    }

    if (!value) {
      setSelectedLabel(null);
      return;
    }

    const item = data.find((item) => getOptionValue(item) === value);
    if (item) {
      setSelectedLabel(getOptionLabel(item));
    }
  }, [value, data, clearOnSelect, getOptionLabel, getOptionValue]);

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
            data-test-id={testId}
          >
            <span title={selectedLabel || undefined}>
              {selectedLabel || (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={(value) => {
                setInternalSearch(value);
                onSearchChange?.(value);
              }}
            />
            <CommandList className="max-h-60 overflow-y-auto">
              {isLoading && <CommandEmpty>Buscando...</CommandEmpty>}

              {!isLoading && search.length < minLength && (
                <CommandEmpty>
                  Escribe al menos {minLength} caracteres
                </CommandEmpty>
              )}

              {!isLoading && !data.length && search.length >= minLength && (
                <CommandEmpty>Sin resultados</CommandEmpty>
              )}

              {!isLoading && data.length > 0 && (
                <>
                  <CommandGroup heading="Resultados">
                    {data.map((item) => (
                      <CommandItem
                        key={getOptionValue(item)}
                        onSelect={() => handleSelect(getOptionValue(item))}
                        className="pl-3"
                      >
                        {getOptionLabel(item)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {!clearOnSelect && selectedLabel && data.length > 0 && (
                <Separator />
              )}

              {!clearOnSelect && selectedLabel && (
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="justify-center cursor-pointer"
                  >
                    Limpiar selección
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SelectSearch;
