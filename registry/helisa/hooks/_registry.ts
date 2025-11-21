import { type Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-print",
    type: "registry:hook",
    title: "usePrint Hook",
    description: "A hook that handles printing functionality.",
    files: [
      {
        path: "hooks/usePrint.tsx",
        type: "registry:hook",
        target: "hooks/usePrint.tsx",
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
        path: "hooks/useDebounce.tsx",
        type: "registry:hook",
        target: "hooks/useDebounce.tsx",
      },
    ],
  }
];
