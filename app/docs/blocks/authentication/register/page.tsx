"use client";

import Register from "@/components/helisa/blocks/authentication/register";
import { useState } from "react";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBase, FormInput } from "@/registry/helisa/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  CircleAlert,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const CodeExample = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackendError(null);

    await form.handleSubmit(async (data) => {
      setIsSubmitting(true);
      try {
        // Simular error si el email ya existe
        if (data.email === "test@example.com") {
          setBackendError("Este correo ya está registrado");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("¡Cuenta creada exitosamente!");
      } catch {
        setBackendError(
          "Ocurrió un error al crear la cuenta. Intenta nuevamente.",
        );
      } finally {
        setIsSubmitting(false);
      }
    })(e);
  };

  return (
    <Register
      onSubmit={handleSubmit}
      label="Crear cuenta"
      description="Regístrate para acceder a todas las funciones de la plataforma"
      submitLabel="Crear cuenta"
      isSubmitting={isSubmitting}
      onLoginClick={() => console.log("Login clicked")}
    >
      {backendError && (
        <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
          <CircleAlert className="size-4" /> {backendError}
        </div>
      )}

      <div className="flex gap-2">
        <FormInput
          control={form.control}
          name="firstName"
          label={
            <span className="flex items-center gap-2">
              <User className="size-4" /> Nombre
            </span>
          }
          type="text"
          placeholder="Juan"
          autoComplete="given-name"
        />
        <FormInput
          control={form.control}
          name="lastName"
          label={
            <span className="flex items-center gap-2">
              <User className="size-4" /> Apellido
            </span>
          }
          type="text"
          placeholder="Pérez"
          autoComplete="family-name"
        />
      </div>

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
              autoComplete="new-password"
              placeholder="Su contraseña"
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
    </Register>
  );
};

const codeString = `
const formSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const CodeExample = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackendError(null);

    await form.handleSubmit(async (data) => {
      setIsSubmitting(true);
      try {
        // Simular error si el email ya existe
        if (data.email === "test@example.com") {
          setBackendError("Este correo ya está registrado");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("¡Cuenta creada exitosamente!");
      } catch {
        setBackendError(
          "Ocurrió un error al crear la cuenta. Intenta nuevamente."
        );
      } finally {
        setIsSubmitting(false);
      }
    })(e);
  };

  return (
    <Register
      onSubmit={handleSubmit}
      label="Crear cuenta"
      description="Regístrate para acceder a todas las funciones de la plataforma"
      submitLabel="Crear cuenta"
      isSubmitting={isSubmitting}
      onLoginClick={() => console.log("Login clicked")}
    >
      {backendError && (
        <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
          <CircleAlert className="size-4" /> {backendError}
        </div>
      )}

      <div className="flex gap-2">
        <FormInput
          control={form.control}
          name="firstName"
          label={
            <span className="flex items-center gap-2">
              <User className="size-4" /> Nombre
            </span>
          }
          type="text"
          placeholder="Juan"
          autoComplete="given-name"
        />
        <FormInput
          control={form.control}
          name="lastName"
          label={
            <span className="flex items-center gap-2">
              <User className="size-4" /> Apellido
            </span>
          }
          type="text"
          placeholder="Pérez"
          autoComplete="family-name"
        />
      </div>

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
              autoComplete="new-password"
              placeholder="Su contraseña"
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
    </Register>
  );
};
`;

const RegisterPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Register</Typography>
        <Typography variant="lead">
          Componente de registro diseñado para facilitar la creación de nuevas
          cuentas de usuario en aplicaciones web. Este bloque ofrece una
          interfaz flexible y personalizable que permite configurar los campos
          necesarios según los requisitos de cada aplicación.
          <br />
          <br />A diferencia de otros componentes, Register actúa como un
          contenedor que proporciona la estructura visual y el layout,
          permitiendo que los desarrolladores agreguen o quiten campos del
          formulario según sus necesidades específicas. Incluye validación
          personalizable, manejo de errores y una experiencia de usuario
          optimizada tanto para móviles como para escritorio.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/register
        </Typography>
      </div>

      <div className="space-y-4 mb-6">
        <Typography variant="h2">Características</Typography>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            <strong>Arquitectura Flexible:</strong> Diseño basado en children
            que permite agregar o quitar campos del formulario según las
            necesidades.
          </li>
          <li>
            <strong>Layout Responsivo:</strong> Estructura de dos columnas en
            desktop (logo y formulario) que se adapta a una columna en móviles.
          </li>
          <li>
            <strong>Sección de Logo:</strong> Panel lateral configurable que se
            oculta automáticamente en pantallas pequeñas.
          </li>
          <li>
            <strong>Validación Personalizable:</strong> Integración con React
            Hook Form y cualquier esquema de validación (Zod, Yup, etc.).
          </li>
          <li>
            <strong>Estado de Carga:</strong> Control del botón de envío con
            estados de carga y deshabilitado.
          </li>
          <li>
            <strong>Navegación Integrada:</strong> Botón opcional para volver al
            login con texto personalizable.
          </li>
          <li>
            <strong>Totalmente Personalizable:</strong> Logos, títulos,
            descripciones y etiquetas configurables mediante props.
          </li>
          <li>
            <strong>Componente Contenedor:</strong> Proporciona la estructura
            visual sin imponer lógica de negocio específica.
          </li>
        </ul>
      </div>

      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          {/* Preview */}
          <div className="flex items-center justify-center h-[calc(100%-1px)] border rounded-lg">
            <CodeExample />
          </div>
        </TabsContent>
        <TabsContent value="code">
          {/* Code */}
          <CodeContainer>{codeString}</CodeContainer>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col space-y-4 my-10">
        <Typography variant="h2">Props</Typography>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Prop
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-mono">onSubmit</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  (e: FormEvent) =&gt; void | Promise&lt;void&gt;
                </td>
                <td className="px-4 py-3 text-sm">
                  Función callback que se ejecuta al enviar el formulario.
                  Recibe el evento del formulario.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">children</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  React.ReactNode
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Contenido del formulario. Permite
                  agregar cualquier campo personalizado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">onLoginClick</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  () =&gt; void
                </td>
                <td className="px-4 py-3 text-sm">
                  Callback opcional para el botón "Volver al login". Si no se
                  proporciona, el botón no se muestra.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">label</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Título principal del formulario. Default: "Crear una cuenta".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">description</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Subtítulo descriptivo. Default: "Regístrese para acceder a
                  todas las funciones de la plataforma".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">logoUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  URL del logo para mostrar en el panel lateral (desktop).
                  Default: texto "HELISA".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">submitLabel</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Texto del botón de envío. Default: "Crear cuenta".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">isSubmitting</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  boolean
                </td>
                <td className="px-4 py-3 text-sm">
                  Estado de carga del formulario. Deshabilita el botón y muestra
                  "Enviando...". Default: false.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">loginLabel</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Texto del botón para volver al login. Default: "Volver al
                  inicio".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default RegisterPage;
