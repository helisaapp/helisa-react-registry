import { type Registry } from "shadcn/schema";

export const blocks: Registry["items"] = [
  {
    name: "authentication",
    type: "registry:block",
    title: "Authentication",
    description:
      "Complete authentication block: login, register, forgot password, recover password and profile.",
    files: [
      {
        path: "blocks/authentication/login.tsx",
        type: "registry:component",
        target: "components/helisa/blocks/authentication/login.tsx",
      },
      {
        path: "blocks/authentication/register.tsx",
        type: "registry:component",
        target: "components/helisa/blocks/authentication/register.tsx",
      },
      {
        path: "blocks/authentication/forgot-password.tsx",
        type: "registry:component",
        target: "components/helisa/blocks/authentication/forgot-password.tsx",
      },
      {
        path: "blocks/authentication/recover-password.tsx",
        type: "registry:component",
        target: "components/helisa/blocks/authentication/recover-password.tsx",
      },
      {
        path: "blocks/authentication/profile.tsx",
        type: "registry:component",
        target: "components/helisa/blocks/authentication/profile.tsx",
      },
    ],
  },
];
