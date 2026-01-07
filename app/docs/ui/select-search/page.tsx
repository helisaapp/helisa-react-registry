"use client";

import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";
import React from "react";
import { useState, useEffect } from "react";
import SelectSearch from "@/components/helisa/ui/select-search";

type City = {
  label: string;
  value: string;
};

const MOCK_CITIES: City[] = [
  { label: "Bogota", value: "option1" },
  { label: "Medellin", value: "option2" },
  { label: "Cali", value: "option3" },
  { label: "Barranquilla", value: "option4" },
  { label: "Cartagena", value: "option5" },
  { label: "Cucuta", value: "option6" },
  { label: "Bucaramanga", value: "option7" },
  { label: "Pereira", value: "option8" },
];

export const RemoteSearchExample = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2) {
      setData([]);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = MOCK_CITIES.filter((city) =>
        city.label.toLowerCase().includes(search.toLowerCase()),
      );

      setData(filtered);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <SelectSearch
      data={data}
      value={selected}
      onChange={setSelected}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      isLoading={isLoading}
      onSearchChange={setSearch}
    />
  );
};

const codeRemoteSearch = `export const RemoteSearchExample = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2) {
      setData([]);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = MOCK_CITIES.filter((city) =>
        city.label.toLowerCase().includes(search.toLowerCase())
      );

      setData(filtered);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <SelectSearch
      data={data}
      value={selected}
      onChange={setSelected}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      isLoading={isLoading}
      onSearchChange={setSearch}
    />
  );
};`;

export const ClearOnSelectExample = () => {
  const [data, setData] = useState<City[]>(MOCK_CITIES);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length < 2) {
      setData([]);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = MOCK_CITIES.filter((city) =>
        city.label.toLowerCase().includes(search.toLowerCase()),
      );

      setData(filtered);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-3">
      <Typography variant="small">Valores seleccionados:</Typography>

      <ul className="list-disc list-inside text-sm text-muted-foreground">
        {selectedValues.length === 0 && <li>Ninguno</li>}
        {selectedValues.map((value) => (
          <li key={value} className="font-mono">
            {value}
          </li>
        ))}
      </ul>

      <SelectSearch
        data={data}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        onChange={(value) => {
          if (!value) return;

          setSelectedValues((prev) =>
            prev.includes(value) ? prev : [...prev, value],
          );
        }}
        onSearchChange={setSearch}
        isLoading={isLoading}
        placeholder="Agregar ciudad"
        clearOnSelect
      />
    </div>
  );
};

const codeClearOnSelect = `export const ClearOnSelectExample = () => {
  const [data, setData] = useState<City[]>(MOCK_CITIES);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length < 2) {
      setData([]);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = MOCK_CITIES.filter((city) =>
        city.label.toLowerCase().includes(search.toLowerCase())
      );

      setData(filtered);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-3">
      <Typography variant="small">Valores seleccionados:</Typography>

      <ul className="list-disc list-inside text-sm text-muted-foreground">
        {selectedValues.length === 0 && <li>Ninguno</li>}
        {selectedValues.map((value) => (
          <li key={value} className="font-mono">
            {value}
          </li>
        ))}
      </ul>

      <SelectSearch
        data={data}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        onChange={(value) => {
          if (!value) return;

          setSelectedValues((prev) =>
            prev.includes(value) ? prev : [...prev, value],
          );
        }}
        onSearchChange={setSearch}
        isLoading={isLoading}
        placeholder="Agregar ciudad"
        clearOnSelect
      />
    </div>
  );
};`;

const SelectSearchPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Select Search</Typography>
        <Typography variant="lead">
          Componente genérico que permite buscar y seleccionar elementos desde
          una fuente local o remota, soportando búsqueda controlada, carga
          asíncrona y un modo configurable que limpia el valor seleccionado al
          elegir una opción.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/select-search
        </Typography>
      </div>

      <div className="mt-10 flex flex-col space-y-10">
        <Tabs defaultValue="preview" className="mt-5">
          <Typography variant="h2">Ejemplo de búsqueda remota</Typography>
          <Typography variant="lead">
            Simula la búsqueda de opciones desde un endpoint remoto, mostrando
            mensajes de carga y estados vacíos según la interacción del usuario.
          </Typography>

          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            {/* Preview */}
            <div className="flex items-center justify-center border h-40 p-8 rounded-lg">
              <div className="w-1/2">{<RemoteSearchExample />}</div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            {/* Code */}
            <CodeContainer>{codeRemoteSearch}</CodeContainer>
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="preview" className="mt-5">
          <Typography variant="h2">Ejemplo de Clear On Select</Typography>
          <Typography variant="lead">
            Permite seleccionar múltiples opciones limpiando el valor
            seleccionado tras cada elección, ideal para agregar elementos a una
            lista sin perder el contexto de búsqueda.
          </Typography>

          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            {/* Preview */}
            <div className="flex items-center justify-center border h-40 p-8 rounded-lg">
              <div className="w-1/2">{<ClearOnSelectExample />}</div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            {/* Code */}
            <CodeContainer>{codeClearOnSelect}</CodeContainer>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col space-y-4 my-10">
        <Typography variant="h2">Props Comunes</Typography>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Prop
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Descripción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-mono">data</td>
                <td className="px-4 py-3 text-sm">T[]</td>
                <td className="px-4 py-3 text-sm">
                  Lista de opciones a mostrar, generalmente obtenidas desde un
                  endpoint
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">value</td>
                <td className="px-4 py-3 text-sm">string | null</td>
                <td className="px-4 py-3 text-sm">
                  Valor seleccionado actualmente (normalmente un identificador)
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">onChange</td>
                <td className="px-4 py-3 text-sm">
                  (value: string | null, item: T | null) =&gt; void
                </td>
                <td className="px-4 py-3 text-sm">
                  Callback ejecutado cuando se selecciona una opción
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">getOptionValue</td>
                <td className="px-4 py-3 text-sm">(item: T) =&gt; string</td>
                <td className="px-4 py-3 text-sm">
                  Función que retorna el identificador único de la opción
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">getOptionLabel</td>
                <td className="px-4 py-3 text-sm">(item: T) =&gt; string</td>
                <td className="px-4 py-3 text-sm">
                  Función que retorna el texto visible de la opción
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">searchValue</td>
                <td className="px-4 py-3 text-sm">string</td>
                <td className="px-4 py-3 text-sm">
                  Valor controlado del campo de búsqueda (opcional)
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">onSearchChange</td>
                <td className="px-4 py-3 text-sm">
                  (value: string) =&gt; void
                </td>
                <td className="px-4 py-3 text-sm">
                  Callback que se ejecuta al cambiar el texto de búsqueda
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">minLength</td>
                <td className="px-4 py-3 text-sm">number</td>
                <td className="px-4 py-3 text-sm">
                  Número mínimo de caracteres requeridos para ejecutar la
                  búsqueda
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">isLoading</td>
                <td className="px-4 py-3 text-sm">boolean</td>
                <td className="px-4 py-3 text-sm">
                  Indica si las opciones se están cargando desde el backend
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">placeholder</td>
                <td className="px-4 py-3 text-sm">string</td>
                <td className="px-4 py-3 text-sm">
                  Texto que se muestra cuando no hay ninguna opción seleccionada
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">
                  searchPlaceholder
                </td>
                <td className="px-4 py-3 text-sm">string</td>
                <td className="px-4 py-3 text-sm">
                  Texto que se muestra en el campo de búsqueda
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">clearOnSelect</td>
                <td className="px-4 py-3 text-sm">boolean</td>
                <td className="px-4 py-3 text-sm">
                  Si es verdadero, el valor seleccionado se limpia visualmente
                  al seleccionar una opción, manteniendo el control en el
                  componente padre
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">disabled</td>
                <td className="px-4 py-3 text-sm">boolean</td>
                <td className="px-4 py-3 text-sm">
                  Indica si el componente está deshabilitado
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-sm font-mono">testId</td>
                <td className="px-4 py-3 text-sm">string</td>
                <td className="px-4 py-3 text-sm">
                  Identificador para pruebas automatizadas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default SelectSearchPage;
