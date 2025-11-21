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
];
