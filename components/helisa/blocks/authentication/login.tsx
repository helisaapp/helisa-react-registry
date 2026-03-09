"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormBase, FormInput } from "@/registry/helisa/ui/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  password: z
    .string()
    .min(1, {
      message: "La contraseña es obligatoria.",
    })
});

type FormData = z.infer<typeof formSchema>;

interface LoginProps {
  onSubmit: (data: FormData) => void | Promise<void | string>;
  onForgotPassword?: () => void;
  label?: string;
  description?: string;
  logoUrl?: string;
  termsUrl?: string;
  policyUrl?: string;
  error?: string;
}

const Login = ({
  onSubmit,
  onForgotPassword,
  label = "¡Bienvenido de nuevo!",
  description = "Ingrese sus credenciales para acceder de forma segura a su cuenta.",
  logoUrl,
  termsUrl,
  policyUrl,
  error,
}: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | undefined>(error);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setBackendError(error);
    if (error) {
      form.reset({ email: "", password: "" });
    }
  }, [error, form]);

  const handleSubmit = async (data: FormData) => {
    setBackendError(undefined);
    setIsSubmitting(true);

    try {
      const result = await onSubmit(data);

      if (typeof result === "string") {
        setBackendError(result);
        form.reset({ email: "", password: "" });
      }
    } catch (error) {
      setBackendError("Ocurrió un error inesperado. Intente nuevamente.");
      form.reset({ email: "", password: "" });
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

            <div className="space-y-2">
              <FormBase
                control={form.control}
                name="password"
                label={
                  <span className="flex items-center gap-2">
                    <LockKeyhole className="size-4" /> Contraseña
                  </span>
                }
              >
                {(field) => (
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Su contraseña"
                      className="pr-10"
                    />
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            </div>
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          {onForgotPassword && (
            <>
              <Separator className="my-6" />
              <div className="text-center">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm font-semibold text-primary hover:underline outline-none rounded"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
            </>
          )}
        </article>

        {termsUrl && policyUrl && (
          <footer className="text-center text-xs text-muted-foreground">
            <p>
              Al ingresar a la plataforma, acepta nuestros{" "}
              <a
                href={termsUrl}
                className="underline font-medium hover:text-foreground transition-colors"
                aria-label="Leer términos y condiciones"
              >
                Términos y Condiciones
              </a>{" "}
              y{" "}
              <a
                href={policyUrl}
                className="underline font-medium hover:text-foreground transition-colors"
                aria-label="Leer política de tratamientos de datos personales"
              >
                Política de Tratamientos de Datos Personales
              </a>
              .
            </p>
          </footer>
        )}
      </section>
    </main>
  );
};

export default Login;
