import type { Registry } from "shadcn/schema";
import { ui } from "@/registry/helisa/ui/_registry";
import { lib } from "@/registry/helisa/lib/_registry";
import { hooks } from "./helisa/hooks/_registry";
import { components } from "./helisa/components/_registry";
import { blocks } from "./helisa/blocks/_registry";

export const registry = {
  homepage: "https://ui.shadcn.com",
  items: [...ui, ...lib, ...hooks, ...components, ...blocks],
  name: "shadcn/ui",
} satisfies Registry;
