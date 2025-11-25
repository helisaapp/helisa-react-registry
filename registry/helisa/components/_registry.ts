import { type Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "single-image-uploader",
    type: "registry:component",
    title: "Single Image Uploader",
    description:
      "A component for uploading a single image file with preview and validation.",
    registryDependencies: [
      "button",
      "https://raw.githubusercontent.com/helisaapp/helisa-react-registry/refs/heads/main/public/r/use-file-upload.json",
    ],
    files: [
      {
        path: "components/upload-files/single-image-uploader.tsx",
        type: "registry:component",
        target:
          "components/helisa/components/upload-files/single-image-uploader.tsx",
      },
    ],
  },
  {
    name: "data-table",
    type: "registry:component",
    title: "Data Table",
    description:
      "A versatile data table component with features like sorting, filtering, pagination, and row selection.",
    dependencies: [
      "@tanstack/react-table",
      "lucide-react",
      "@radix-ui/react-checkbox",
    ],
    registryDependencies: ["button", "checkbox", "select"],
    files: [
      {
        path: "components/data-table/data-table.tsx",
        type: "registry:component",
        target: "components/helisa/components/data-table/data-table.tsx",
      },
      {
        path: "components/data-table/data-table-pagination.tsx",
        type: "registry:component",
        target:
          "components/helisa/components/data-table/data-table-pagination.tsx",
      },
      {
        path: "components/data-table/data-table-cursor-pagination.tsx",
        type: "registry:component",
        target:
          "components/helisa/components/data-table/data-table-cursor-pagination.tsx",
      },
      {
        path: "components/data-table/data-table-checks.tsx",
        type: "registry:component",
        target: "components/helisa/components/data-table/data-table-checks.tsx",
      },
      {
        path: "components/data-table/data-table-column-header.tsx",
        type: "registry:component",
        target:
          "components/helisa/components/data-table/data-table-column-header.tsx",
      },
    ],
  },
];
