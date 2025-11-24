"use client";

import { CompanySwitcher } from "@/components/helisa/ui/company-switcher";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Home } from "lucide-react";
import React from "react";
import { useState } from "react";
import CodeContainer from "@/components/code-container";

const CompanySwitcherPage = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const codeString = `
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // ...
 <CompanySwitcher
    companies={[{
        id: '1',
        name: 'Empresa-1',
        logo: Home
    },{
        id: '2',
        name: 'Empresa-2',
        logo: Book
    }]}
    onSelected={setSelectedCompany}
    enableCreate // habilita la opción de crear nueva empresa
    onCreate={() => alert('Crear nueva empresa')} // opcional
    defaultCompanyId={"1"} // opcional
  />
    <Typography variant="body2">
    Empresa seleccionada: {selectedCompany ? selectedCompany : 'Ninguna'}
    </Typography>
  `;

  const codeExample = () => {
    return (
      <div className="flex flex-col gap-5 max-w-sm ">
        <CompanySwitcher
          companies={[
            {
              id: "1",
              name: "Empresa-1",
              logo: Home,
            },
            {
              id: "2",
              name: "Empresa-2",
              logo: Book,
            },
          ]}
          onSelected={setSelectedCompany}
          enableCreate // habilita la opción de crear nueva empresa
          onCreate={() => alert("Crear nueva empresa")} // opcional
          defaultCompanyId={"1"} // opcional
        />
        <Typography variant="body2">
          Empresa seleccionada: {selectedCompany ? selectedCompany : "Ninguna"}
        </Typography>
      </div>
    );
  };

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8 gap-1">
        <Typography variant="h1">Company Switcher</Typography>
        <Typography variant="lead">
          Componente para cambiar entre diferentes empresas o cuentas dentro de
          una aplicación. El componente muestra una lista desplegable de
          empresas disponibles y permite al usuario seleccionar una empresa para
          cambiar el contexto de la aplicación. Tiene la opción de habilitar la
          creación de nuevas empresas directamente desde el switcher para
          navegación. También permite establecer una empresa por defecto al
          cargar el componente.
        </Typography>
        <Typography variant="lead">
          Solo debe usarse dentro del sidebar de la aplicación.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/company-switcher
        </Typography>
      </div>

      <Tabs defaultValue="preview" className="mt-5">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {/* Preview */}
          {codeExample()}
        </TabsContent>
        <TabsContent value="code">
          {/* Code */}
          <CodeContainer>{codeString}</CodeContainer>
        </TabsContent>
      </Tabs>
    </LayoutContainer>
  );
};

export default CompanySwitcherPage;
