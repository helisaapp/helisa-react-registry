"use client";

import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";
import React, { useState } from "react";
import SelectList from "@/components/helisa/ui/select-list";

const CodeExample = () => {
  const [selectedOptions, setSelectedOptions] = useState<string | null>(null);

  const options: {
    label: string;
    value: string;
  }[] = [
    { label: "Opción 1", value: "option1" },
    { label: "Opción 2", value: "option2" },
    { label: "Opción 3", value: "option3" },
    {
      label:
        "Esto es una opción larga para probar el ajuste de texto en el componente, asegurando que se vea bien incluso con textos extensos, como este ejemplo que estamos utilizando aquí.",
      value: "option4",
    },
  ];

  return (
    <SelectList
      data={options}
      value={selectedOptions}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      onChange={setSelectedOptions}
      placeholder="Selecciona una opción"
      searchPlaceholder="Buscar opción..."
    />
  );
};

const codeString = `
    const [selectedOptions, setSelectedOptions] = useState<string | null>(null);

    const options: {
        label: string;
        value: string;
    }[] = [
        { label: "Opción 1", value: "option1" },
        { label: "Opción 2", value: "option2" },
        { label: "Opción 3", value: "option3" },
        {
        label:
            "Esto es una opción larga para probar el ajuste de texto en el componente, 
            asegurando que se vea bien incluso con textos extensos, como este ejemplo 
            que estamos utilizando aquí.",
        value: "option4",
        },
    ];

    return (
        <SelectList
        data={options}
        value={selectedOptions}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        onChange={setSelectedOptions}
        placeholder="Selecciona una opción"
        searchPlaceholder="Buscar opción..."
        />
    );
  `;

const SelectListPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Select List</Typography>
        <Typography variant="lead">
          Componente diseñado para manejar listas con una gran cantidad de
          opciones. Incluye un campo de búsqueda integrado que permite filtrar
          rápidamente entre los elementos disponibles. Ideal para formularios
          complejos o pantallas donde se requiere seleccionar valores desde
          catálogos extensos.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/select-list
        </Typography>
      </div>

      <Tabs defaultValue="preview" className="mt-5">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {/* Preview */}
          <div className="flex items-center justify-center border h-40 p-8 rounded-lg">
            <div className="w-1/2">{<CodeExample />}</div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          {/* Code */}
          <CodeContainer>{codeString}</CodeContainer>
        </TabsContent>
      </Tabs>

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
                <td className="px-4 py-3 text-sm font-mono">emptyMessage</td>
                <td className="px-4 py-3 text-sm">string</td>
                <td className="px-4 py-3 text-sm">
                  Mensaje que se muestra cuando no hay resultados en la búsqueda
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">disabled</td>
                <td className="px-4 py-3 text-sm">boolean</td>
                <td className="px-4 py-3 text-sm">
                  Indica si el campo está deshabilitado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default SelectListPage;
