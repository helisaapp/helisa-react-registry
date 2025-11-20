"use client";

import { forwardRef } from "react";

// Definición de variantes con sus estilos
const typographyVariants = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  subtitle1: "text-xl font-medium",
  subtitle2: "text-lg font-medium",
  body1: "text-base leading-7",
  body2: "text-sm leading-6",
  caption: "text-sm text-muted-foreground",
  overline: "text-xs uppercase tracking-wider font-medium",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  xs: "text-xs text-muted-foreground leading-none",
  muted: "text-sm text-muted-foreground",
  code: "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold w-fit",
};

// Mapeo de variantes a elementos HTML por defecto
// El valor del elemento debe ser una etiqueta HTML válida
const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  lead: "p",
  large: "div",
  small: "small",
  xs: "p",
  muted: "p",
  code: "span",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof typographyVariants;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body1", as, className = "", children, ...props }, ref) => {
    const Component = as || defaultElements[variant] || "p";
    const variantClasses = typographyVariants[variant];

    return (
      <Component
        ref={ref}
        className={`${variantClasses} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";
