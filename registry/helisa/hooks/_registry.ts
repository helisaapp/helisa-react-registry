import { type Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-print",
    type: "registry:hook",
    title: "usePrint Hook",
    description: "A hook that handles printing functionality.",
    files: [
      {
        path: "hooks/use-print.tsx",
        type: "registry:hook",
        target: "hooks/use-print.tsx",
      },
    ],
  },
  {
    name: "use-debounce",
    type: "registry:hook",
    title: "useDebounce Hook",
    description: "A hook that debounces a value over a specified delay.",
    files: [
      {
        path: "hooks/use-debounce.tsx",
        type: "registry:hook",
        target: "hooks/use-debounce.tsx",
      },
    ],
  },
  {
    name: "use-file-upload",
    type: "registry:hook",
    title: "useFileUpload Hook",
    description: "A hook that handles file upload functionality.",
    files: [
      {
        path: "hooks/use-file-upload.tsx",
        type: "registry:hook",
        target: "hooks/use-file-upload.tsx",
      },
    ],
  },
];
