"use client";

import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import CodeContainer from "@/components/code-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const UseDebounceExample = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 600);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Escribe para buscar..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="space-y-1 text-sm">
        <Typography variant="small">Valor inmediato:</Typography>
        <p className="font-mono text-muted-foreground">{value || "—"}</p>

        <Typography variant="small">Valor con debounce (600ms):</Typography>
        <p className="font-mono text-muted-foreground">
          {debouncedValue || "—"}
        </p>
      </div>
    </div>
  );
};

const codeUseDebounce = `export const UseDebounceExample = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 600);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Escribe para buscar..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="space-y-1 text-sm">
        <Typography variant="small">Valor inmediato:</Typography>
        <p className="font-mono text-muted-foreground">
          {value || "—"}
        </p>

        <Typography variant="small">
          Valor con debounce (600ms):
        </Typography>
        <p className="font-mono text-muted-foreground">
          {debouncedValue || "—"}
        </p>
      </div>
    </div>
  );
};`;

const UseDebouncePage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Use Debounce</Typography>
        <Typography variant="lead">
          Hook utilitario que permite retrasar la propagación de un valor hasta
          que el usuario haya dejado de interactuar durante un intervalo de
          tiempo definido. Es ideal para optimizar búsquedas remotas,
          validaciones y cualquier lógica reactiva que no deba ejecutarse en
          cada cambio inmediato.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/use-debounce
        </Typography>
      </div>

      <Tabs defaultValue="preview" className="my-10 flex flex-col">
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
          <div className="flex items-center justify-center border h-60 p-8 rounded-lg">
            <div className="w-1/2 my-32">{<UseDebounceExample />}</div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeContainer>{codeUseDebounce}</CodeContainer>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col space-y-3 max-w-3xl mb-8">
        <Typography variant="h2">Casos de uso comunes</Typography>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Búsqueda remota en inputs o selects</li>
          <li>Autocompletados con llamadas a API</li>
          <li>Validaciones en tiempo real</li>
          <li>Filtros dinámicos sobre grandes volúmenes de datos</li>
        </ul>
      </div>
    </LayoutContainer>
  );
};

export default UseDebouncePage;
