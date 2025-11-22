"use client";

import SingleImageUploader from "@/components/helisa/components/upload-files/single-image-uploader";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileMetadata } from "@/hooks/use-file-upload";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const FileUploaderPage = () => {
  const handleUpload = (file: File | FileMetadata | null) => {
    console.log("Uploaded file:", file);
  };

  const codeString = `
  const handleUpload = (file: File | FileMetadata | null) => {
    console.log("Uploaded file:", file);
  };

  // ...
  <SingleImageUploader 
    acceptedFormats="image/svg+xml,image/png,image/jpeg,image/jpg,image/gif"
    fileTypes={["svg", "png", "jpeg", "jpg", "gif"]}
    maxSizeMB={2}
    onUploaded={handleUpload} />
  `;

  const codeExample = () => {
    return (
      <SingleImageUploader
        acceptedFormats="image/svg+xml,image/png,image/jpeg,image/jpg,image/gif"
        fileTypes={["svg", "png", "jpeg", "jpg", "gif"]}
        maxSizeMB={2}
        onUploaded={handleUpload}
      />
    );
  };

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">File Uploader</Typography>
        <Typography variant="lead">
          Componentes para subir imágenes o archivos de manera sencilla y
          eficiente.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/single-image-uploader
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
          <SyntaxHighlighter style={github} language="typescript">
            {codeString}
          </SyntaxHighlighter>
        </TabsContent>
      </Tabs>
    </LayoutContainer>
  );
};

export default FileUploaderPage;
