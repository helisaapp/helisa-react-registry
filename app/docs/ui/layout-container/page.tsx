import CodeContainer from "@/components/code-container";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const LayoutContainerPage = () => {
  const codeString = `
    <div className="w-full">
        <div className="flex flex-col gap-5">
          <LayoutContainer maxWidth="full">
            <Typography variant="large" className="mb-4">
              full
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="container">
            <Typography variant="large" className="mb-4">
              container
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="5xl">
            <Typography variant="large" className="mb-4">
              5xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="4xl">
            <Typography variant="large" className="mb-4">
              4xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="3xl">
            <Typography variant="large" className="mb-4">
              3xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="2xl">
            <Typography variant="large" className="mb-4">
              2xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="xl">
            <Typography variant="large" className="mb-4">
              xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="lg">
            <Typography variant="large" className="mb-4">
              lg
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>          

          <LayoutContainer maxWidth="md">
            <Typography variant="large" className="mb-4">
              md
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="sm">
            <Typography variant="large" className="mb-4">
              sm
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          
        </div>
      </div>
  `;

  const codeExample = () => {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-5">
          <LayoutContainer maxWidth="full">
            <Typography variant="large" className="mb-4">
              full
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="container">
            <Typography variant="large" className="mb-4">
              container
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="5xl">
            <Typography variant="large" className="mb-4">
              5xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="4xl">
            <Typography variant="large" className="mb-4">
              4xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="3xl">
            <Typography variant="large" className="mb-4">
              3xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="2xl">
            <Typography variant="large" className="mb-4">
              2xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="xl">
            <Typography variant="large" className="mb-4">
              xl
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="lg">
            <Typography variant="large" className="mb-4">
              lg
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="md">
            <Typography variant="large" className="mb-4">
              md
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>

          <LayoutContainer maxWidth="sm">
            <Typography variant="large" className="mb-4">
              sm
            </Typography>
            <div className="bg-gray-800 p-5 rounded-lg animate-pulse"></div>
          </LayoutContainer>
        </div>
      </div>
    );
  };

  return (
    <LayoutContainer maxWidth="full">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Layout Container</Typography>
        <Typography variant="lead">
          Componente contenedor de layout que centra y limita el ancho del
          contenido. Usa la propiedad maxWidth para definir el ancho máximo del
          contenedor.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/layout-container
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

export default LayoutContainerPage;
