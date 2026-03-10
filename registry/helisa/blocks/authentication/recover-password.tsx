"use client";

import { FormBase } from "../../ui/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RecoverPasswordProps {
  onSubmit: (data: FormData) => void | Promise<void | string>;
  label?: string;
  description?: string;
  logoUrl?: string;
}

const passwordSchema = z
  .string()
  .trim()
  .min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  })
  .max(100, {
    message: "La contraseña no puede exceder 100 caracteres.",
  })
  .regex(/[A-Z]/, {
    message: "La contraseña debe contener al menos una letra mayúscula.",
  })
  .regex(/[a-z]/, {
    message: "La contraseña debe contener al menos una letra minúscula.",
  })
  .regex(/[0-9]/, {
    message: "La contraseña debe contener al menos un número.",
  })
  .regex(/[@$!%*?&]/, {
    message:
      "La contraseña debe contener al menos un carácter especial (@$!%*?&).",
  });

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().trim().min(1, {
      message: "La confirmación de contraseña es obligatoria.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const RecoverPassword = ({
  onSubmit,
  label = "Restablecer contraseña",
  description = "Ingrese su nueva contraseña para restablecer el acceso a su cuenta.",
  logoUrl,
}: RecoverPasswordProps) => {
  const [backendError, setBackendError] = useState<string | undefined>(
    undefined,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    setBackendError(undefined);
    setIsSubmitting(true);

    try {
      const result = await onSubmit(data);

      if (typeof result === "string") {
        setBackendError(result);
        form.reset({ password: "", confirmPassword: "" });
      }
    } catch {
      setBackendError("Ocurrió un error inesperado. Intente nuevamente.");
      form.reset({ password: "", confirmPassword: "" });
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

            <FormBase
              control={form.control}
              name="password"
              label={
                <span className="flex items-center gap-2">
                  <LockKeyhole className="size-4" /> Nueva contraseña
                </span>
              }
            >
              {(field) => (
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Mínimo 8 caracteres"
                    className="pr-10"
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </FormBase>

            <FormBase
              control={form.control}
              name="confirmPassword"
              label={
                <span className="flex items-center gap-2">
                  <LockKeyhole className="size-4" /> Confirmar contraseña
                </span>
              }
            >
              {(field) => (
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repita su contraseña"
                    className="pr-10"
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </FormBase>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
            </Button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default RecoverPassword;
