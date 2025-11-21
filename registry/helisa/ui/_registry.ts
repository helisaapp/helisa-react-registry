import { type Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "typography",
    type: "registry:ui",
    title: "Typography",
    description: "A set of typographic components for consistent text styling.",
    files: [
      {
        path: "ui/typography.tsx",
        type: "registry:ui",
        target: "components/helisa/ui/typography.tsx",
      },
    ],
  },
  {
    name: "required-mark",
    type: "registry:ui",
    title: "Required Mark",
    description: "A simple asterisk to indicate required fields.",
    files: [
      {
        path: "ui/required-mark.tsx",
        type: "registry:ui",
        target: "components/helisa/ui/required-mark.tsx",
      },
    ],
  },
  {
    name: "layout-container",
    type: "registry:ui",
    title: "Layout Container",
    description: "A flexible container component for layout purposes.",
    files: [
      {
        path: "ui/layout-container.tsx",
        type: "registry:ui",
        target: "components/helisa/ui/layout-container.tsx",
      },
    ],
  },
  {
    name: "custom-skeleton",
    type: "registry:ui",
    title: "Custom Skeleton",
    description: "A customizable skeleton loader component.",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "ui/custom-skeleton.tsx",
        type: "registry:ui",
        target: "components/helisa/ui/custom-skeleton.tsx",
      },
    ],
  },
  {
    name: "select-multi",
    type: "registry:ui",
    title: "Select Multi",
    description: "A multi-select with badges",
    registryDependencies: [
      "badge",
      "button",
      "command",
      "popover",
      "separator",
    ],
    files: [
      {
        path: "ui/select-multi.tsx",
        type: "registry:ui",
        target: "components/helisa/ui/select-multi.tsx",
      },
    ],
  },
  {
    name: "form-field",
    type: "registry:ui",
    title: "Form Field",
    description: "A component for form field layout and validation.",
    registryDependencies: [
      "label",
      "input",
      "textarea",
      "select",
      "switch",
      "checkbox",
      "field",
      "https://raw.githubusercontent.com/helisaapp/helisa-react-registry/refs/heads/main/public/r/required-mark.json",
    ],
    dependencies: ["react-hook-form"],
    files: [
      {
        path: "ui/form-field.tsx",
        type: "registry:ui",
        target: "components/helisa/ui/form-field.tsx",
      },
    ],
  },
];
