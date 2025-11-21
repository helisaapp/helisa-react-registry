import { type Registry } from "shadcn/schema";

export const lib: Registry["items"] = [
  {
    name: "date-utils",
    type: "registry:lib",
    title: "Date Utilities",
    description:
      "A set of utility functions for date manipulation and formatting.",
    dependencies: ["date-fns"],
    files: [
      {
        path: "lib/date-utils.ts",
        type: "registry:lib",
        target: "lib/date-utils.ts",
      },
    ],
  },
];
