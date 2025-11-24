"use client";

import CodeContainer from "@/components/code-container";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { SelectMulti } from "@/components/helisa/ui/select-multi";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, PlusCircle } from "lucide-react";
import React, { useState } from "react";

const SelectMultipleItemsPage = () => {
  const codeString = `
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
      }[] = [
      { label: "Opción 1", value: "option1", icon: PlusCircle },
      { label: "Opción 2", value: "option2", icon: Home },
      { label: "Opción 3", value: "option3" },
    ];

    return (
      <SelectMulti
        options={options}
        title="Selecciona opciones"
        placeholder="Elige una o más opciones"
        value={selectedOptions}
        onChange={setSelectedOptions}
      />
    );
  `;

  const CodeExample = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[] = [
      { label: "Opción 1", value: "option1", icon: PlusCircle },
      { label: "Opción 2", value: "option2", icon: Home },
      { label: "Opción 3", value: "option3" },
    ];

    return (
      <SelectMulti
        options={options}
        title="Selecciona opciones"
        placeholder="Elige una o más opciones"
        value={selectedOptions}
        onChange={setSelectedOptions}
      />
    );
  };

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Select Multi</Typography>
        <Typography variant="lead">
          Componente de selección múltiple con opciones personalizables.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/select-multi
        </Typography>
      </div>

      <Tabs defaultValue="preview" className="mt-5">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {/* Preview */}
          {CodeExample()}
        </TabsContent>
        <TabsContent value="code">
          {/* Code */}
          <CodeContainer>{codeString}</CodeContainer>
        </TabsContent>
      </Tabs>
    </LayoutContainer>
  );
};

export default SelectMultipleItemsPage;
