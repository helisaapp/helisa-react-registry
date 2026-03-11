"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RegisterProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  onLoginClick?: () => void;
  loginLabel?: string;
  label?: string;
  description?: string;
  logoUrl?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

const Register = ({
  onSubmit,
  onLoginClick,
  loginLabel = "Volver al inicio",
  label = "Crear una cuenta",
  description = "Regístrese para acceder a todas las funciones de la plataforma",
  logoUrl,
  submitLabel = "Crear cuenta",
  isSubmitting = false,
  children,
}: RegisterProps) => {
  return (
    <main className="flex h-screen w-screen">
      <section className="hidden lg:flex flex-1 h-full bg-neutral-100 items-center justify-center">
        <div className="text-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo de la plataforma"
              draggable="false"
              className="h-32 w-auto object-contain select-none"
            />
          ) : (
            <div className="mx-auto flex items-center justify-center">
              <span className="text-primary text-6xl font-bold select-none">
                HELISA
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="p-8 lg:p-0 flex-1 h-full flex items-center justify-center">
        <article className="w-full max-w-md">
          <header className="mb-6">
            {onLoginClick && (
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 mb-6 "
                onClick={onLoginClick}
              >
                <ArrowLeft className="size-4" /> {loginLabel}
              </button>
            )}
            <h1 className="text-2xl font-extrabold">{label}</h1>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </header>
          <form className="space-y-5" onSubmit={onSubmit}>
            {children}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : submitLabel}
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Register;
