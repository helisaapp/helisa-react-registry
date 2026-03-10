"use client";

import { FormInput } from "../../ui/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CircleAlert, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ForgotPasswordProps {
  onSubmit: (data: FormData) => void | Promise<void | string>;
  onLoginClick?: () => void;
  label?: string;
  description?: string;
  logoUrl?: string;
}

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "El correo electrónico es obligatorio.",
    })
    .email({
      message: "Ingresa un correo electrónico válido.",
    })
    .max(100, {
      message: "El correo electrónico no puede exceder 100 caracteres.",
    })
    .toLowerCase(),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword = ({
  onSubmit,
  onLoginClick,
  label = "¿Olvidó su contraseña?",
  description = "Ingrese su correo electrónico para recibir un enlace de recuperación.",
  logoUrl,
}: ForgotPasswordProps) => {
  const [backendError, setBackendError] = useState<string | undefined>(
    undefined,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    setBackendError(undefined);
    setIsSubmitting(true);

    try {
      const result = await onSubmit(data);

      if (typeof result === "string") {
        setBackendError(result);
        form.reset({ email: "" });
      }
    } catch {
      setBackendError("Ocurrió un error inesperado. Intente nuevamente.");
      form.reset({ email: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="w-full max-w-sm min-w-sm space-y-6">
        <article className="bg-card border rounded-2xl shadow-xl p-8">
          <header className="mb-6 text-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo de la plataforma"
                draggable="false"
                className="mx-auto mb-4 h-16 w-auto object-contain select-none"
              />
            ) : (
              <div className="mx-auto mb-4 h-8 w-30 rounded-lg flex items-center justify-center">
                <span className="text-primary text-4xl font-bold select-none">
                  HELISA
                </span>
              </div>
            )}
            <h1 className="text-2xl font-extrabold">{label}</h1>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </header>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {backendError && (
              <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
                <CircleAlert className="size-4" /> {backendError}
              </div>
            )}
            <FormInput
              control={form.control}
              name="email"
              label={
                <span className="flex items-center gap-2">
                  <Mail className="size-4" /> Correo electrónico
                </span>
              }
              type="email"
              placeholder="ejemplo@empresa.com"
              autoComplete="email"
            />
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
            </Button>
          </form>

          {onLoginClick && (
            <>
              <Separator className="my-6" />
              <div className="align-center flex justify-center">
                <button
                  type="button"
                  className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 outline-none"
                  onClick={onLoginClick}
                >
                  <ArrowLeft className="size-4" /> Volver al inicio de sesión
                </button>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
};

export default ForgotPassword;
