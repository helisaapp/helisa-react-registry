import CodeContainer from "@/components/code-container";
import {
  FormSkeleton,
  SelectSkeleton,
  TableSkeleton,
} from "@/components/helisa/ui/custom-skeleton";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const CustomSkeletonPage = () => {
  const codeString = `
    <div className="flex flex-col gap-5 mb-20">
        <div className="mt-5">
          <Typography variant="large">TableSkeleton</Typography>
          <TableSkeleton
            rows={5}
            columns={4}
            cellClassName="bg-red-100"
            className="w-full"
            rowClassName="animate-pulse"
            showHeader
            showPagination
            withHeaderFilter
          />
        </div>

        <div className="mt-5">
          <Typography variant="large">FormSkeleton</Typography>
          <FormSkeleton withButton withLabels />
        </div>

        <div className="mt-5">
          <Typography variant="large">SelectSkeleton</Typography>
          <SelectSkeleton
            labelText="Cargando opción..."
            withHelperText
            withLabel
          />
        </div>
      </div>
  `;

  const codeExample = () => {
    return (
      <div className="flex flex-col gap-5 mb-20">
        <div className="mt-5">
          <Typography variant="large">TableSkeleton</Typography>
          <TableSkeleton
            rows={5}
            columns={4}
            cellClassName="bg-red-100"
            className="w-full"
            rowClassName="animate-pulse"
            showHeader
            showPagination
            withHeaderFilter
          />
        </div>

        <div className="mt-5">
          <Typography variant="large">FormSkeleton</Typography>
          <FormSkeleton withButton withLabels />
        </div>

        <div className="mt-5">
          <Typography variant="large">SelectSkeleton</Typography>
          <SelectSkeleton
            labelText="Cargando opción..."
            withHelperText
            withLabel
          />
        </div>
      </div>
    );
  };

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Custom Skeleton</Typography>
        <Typography variant="lead">
          Componente de esqueleto personalizado
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/custom-skeleton
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

export default CustomSkeletonPage;
