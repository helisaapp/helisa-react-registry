"use client";

import { cn } from "@/lib/utils";

import React from "react";

interface LayoutContainerProps {
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "full"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "container";
  children: React.ReactNode;
}

export const LayoutContainer = ({
  children,
  maxWidth = "full",
}: LayoutContainerProps) => {
  const maxWidthClasses: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    container: "container",
    full: "max-w-full",
  };

  return (
    <div className={cn(`mx-auto w-full`, maxWidthClasses[maxWidth])}>
      {children}
    </div>
  );
};
