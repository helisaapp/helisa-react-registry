import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const TypographyPage = () => {
  const codeString = `
          <div>
            <div className="flex flex-col space-y-2 max-w-2xl">
              <Typography variant="large">Instalación</Typography>
              <Typography variant="code">npx shadcn@latest add @helisa/typography</Typography>
            </div>

            <div className="space-y-4">
              <Typography variant="h1">
                Heading 1 - Sistema de Diseño
              </Typography>
              <Typography variant="h2">Heading 2 - Componentes</Typography>
              <Typography variant="h3">Heading 3 - Typography</Typography>
              <Typography variant="h4">Heading 4 - Variantes</Typography>
              <Typography variant="h5">Heading 5 - Estilos</Typography>
              <Typography variant="h6">Heading 6 - Consistencia</Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="subtitle1">
                Subtitle 1 - Subtítulo grande para secciones importantes
              </Typography>
              <Typography variant="subtitle2">
                Subtitle 2 - Subtítulo mediano para subsecciones
              </Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="lead">
                Lead text - Este es un texto destacado que introduce una sección
                o artículo con mayor énfasis visual.
              </Typography>
              <Typography variant="body1">
                Body 1 - Este es el texto principal por defecto. Se usa para
                párrafos y contenido general. Tiene un interlineado cómodo para
                lectura prolongada.
              </Typography>
              <Typography variant="body2">
                Body 2 - Texto secundario más pequeño, ideal para descripciones
                o contenido complementario que no requiere tanto énfasis.
              </Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="large">
                Large - Texto grande para destacar información importante
              </Typography>
              <Typography variant="small">
                Small - Texto pequeño para notas o información secundaria
              </Typography>
              <Typography variant="muted">
                Muted - Texto atenuado para contenido menos relevante
              </Typography>
              <Typography variant="caption">
                Caption - Texto para pies de imagen o anotaciones
              </Typography>
              <Typography variant="overline">
                Overline - Texto para categorías o etiquetas
              </Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="h4">Ejemplo con prop "as"</Typography>
              <Typography variant="h3" as="p">
                Este texto tiene estilos de h3 pero es un elemento p
              </Typography>
              <Typography variant="body1" as="div" className="text-blue-600">
                Puedes agregar clases adicionales personalizadas
              </Typography>
            </div>
          </div>`;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="flex flex-col space-y-2 max-w-2xl">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/typography
        </Typography>
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div>
            <div className="space-y-4">
              <Typography variant="h1">
                Heading 1 - Sistema de Diseño
              </Typography>
              <Typography variant="h2">Heading 2 - Componentes</Typography>
              <Typography variant="h3">Heading 3 - Typography</Typography>
              <Typography variant="h4">Heading 4 - Variantes</Typography>
              <Typography variant="h5">Heading 5 - Estilos</Typography>
              <Typography variant="h6">Heading 6 - Consistencia</Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="subtitle1">
                Subtitle 1 - Subtítulo grande para secciones importantes
              </Typography>
              <Typography variant="subtitle2">
                Subtitle 2 - Subtítulo mediano para subsecciones
              </Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="lead">
                Lead text - Este es un texto destacado que introduce una sección
                o artículo con mayor énfasis visual.
              </Typography>
              <Typography variant="body1">
                Body 1 - Este es el texto principal por defecto. Se usa para
                párrafos y contenido general. Tiene un interlineado cómodo para
                lectura prolongada.
              </Typography>
              <Typography variant="body2">
                Body 2 - Texto secundario más pequeño, ideal para descripciones
                o contenido complementario que no requiere tanto énfasis.
              </Typography>
            </div>

            <div className="flex flex-col border-t pt-8 space-y-4">
              <Typography variant="large">
                Large - Texto grande para destacar información importante
              </Typography>
              <Typography variant="small">
                Small - Texto pequeño para notas o información secundaria
              </Typography>
              <Typography variant="xs">
                xs - Texto extra pequeño para notas o información secundaria
              </Typography>
              <Typography variant="muted">
                Muted - Texto atenuado para contenido menos relevante
              </Typography>
              <Typography variant="caption">
                Caption - Texto para pies de imagen o anotaciones
              </Typography>
              <Typography variant="overline">
                Overline - Texto para categorías o etiquetas
              </Typography>
            </div>

            <div className="border-t pt-8 space-y-4">
              <Typography variant="h4">
                Ejemplo con prop &quot;as&quot;
              </Typography>
              <Typography variant="h3" as="p">
                Este texto tiene estilos de h3 pero es un elemento p
              </Typography>
              <Typography variant="body1" as="div" className="text-blue-600">
                Puedes agregar clases adicionales personalizadas
              </Typography>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          {/* Code */}
          <SyntaxHighlighter style={github} language="typescript">
            {codeString}
          </SyntaxHighlighter>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TypographyPage;
