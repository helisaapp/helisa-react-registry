"use client";

import Profile from "@/components/helisa/blocks/authentication/profile";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormInput } from "@/components/helisa/ui/form-field";
import { Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "El nombre es obligatorio." })
    .max(50, { message: "El nombre no puede exceder 50 caracteres." }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "El apellido es obligatorio." })
    .max(50, { message: "El apellido no puede exceder 50 caracteres." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Ingresa un correo electrónico válido." })
    .max(100, { message: "El correo no puede exceder 100 caracteres." })
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .max(20, { message: "El teléfono no puede exceder 20 caracteres." })
    .optional()
    .or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CodeExample = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@empresa.com",
      phone: "+57 300 123 4567",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      // Simulando guardado con delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("¡Perfil actualizado exitosamente!");
      setIsProfileOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = [form.watch("firstName")?.[0], form.watch("lastName")?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-center p-8">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsProfileOpen(true)}
      >
        Editar perfil
      </Button>

      <Profile
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        onSubmit={form.handleSubmit(handleSubmit)}
        initials={initials}
        displayName={`${form.watch("firstName")} ${form.watch("lastName")}`.trim()}
        isSubmitting={isSubmitting}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="firstName"
            label={
              <span className="flex items-center gap-2">
                <User className="size-4" /> Nombre
              </span>
            }
            isRequired
            placeholder="Ej: Juan"
          />
          <FormInput
            control={form.control}
            name="lastName"
            label={
              <span className="flex items-center gap-2">
                <User className="size-4" /> Apellido
              </span>
            }
            isRequired
            placeholder="Ej: Pérez"
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
          isRequired
          type="email"
          placeholder="ejemplo@empresa.com"
          disabled
        />
        <FormInput
          control={form.control}
          name="phone"
          label={
            <span className="flex items-center gap-2">
              <Phone className="size-4" /> Teléfono
            </span>
          }
          placeholder="Ej: +57 300 123 4567"
        />
      </Profile>
    </div>
  );
};

const codeString = `const profileSchema = z.object({
  firstName: z.string().trim().min(1, "El nombre es obligatorio.").max(50),
  lastName: z.string().trim().min(1, "El apellido es obligatorio.").max(50),
  email: z.string().trim().min(1).email("Correo inválido").max(100).toLowerCase(),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const [isProfileOpen, setIsProfileOpen] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

const form = useForm<ProfileFormData>({
  resolver: zodResolver(profileSchema),
  defaultValues: {
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@empresa.com",
    phone: "+57 300 123 4567",
  },
});

const handleSubmit = async (data: ProfileFormData) => {
  setIsSubmitting(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("¡Perfil actualizado!");
    setIsProfileOpen(false);
  } finally {
    setIsSubmitting(false);
  }
};

const initials = [form.watch("firstName")?.[0], form.watch("lastName")?.[0]]
  .filter(Boolean)
  .join("")
  .toUpperCase();

return (
  <>
    <Button variant="outline" onClick={() => setIsProfileOpen(true)}>
      Editar perfil
    </Button>

    <Profile
      open={isProfileOpen}
      onOpenChange={setIsProfileOpen}
      onSubmit={form.handleSubmit(handleSubmit)}
      initials={initials}
      displayName={\`\${form.watch("firstName")} \${form.watch("lastName")}\`.trim()}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          control={form.control}
          name="firstName"
          label="Nombre"
          isRequired
          placeholder="Ej: Juan"
        />
        <FormInput
          control={form.control}
          name="lastName"
          label="Apellido"
          isRequired
          placeholder="Ej: Pérez"
        />
      </div>
      <FormInput
        control={form.control}
        name="email"
        label="Correo electrónico"
        isRequired
        type="email"
        placeholder="ejemplo@empresa.com"
        disabled
      />
      <FormInput
        control={form.control}
        name="phone"
        label="Teléfono"
        placeholder="Ej: +57 300 123 4567"
      />
    </Profile>
  </>
);`;

const ProfilePage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Profile</Typography>
        <Typography variant="lead">
          Componente modal reutilizable diseñado para que los usuarios puedan
          ver y editar su información personal. Este bloque ofrece una interfaz
          limpia dentro de un Dialog con avatar, iniciales, formulario
          configurable y acciones de guardado.
          <br />
          <br />
          Al igual que Register, Profile actúa como un componente contenedor que
          proporciona la estructura visual (Dialog, avatar, botones) sin imponer
          campos específicos. Los desarrolladores pasan los campos del
          formulario como children, manteniendo total flexibilidad para
          personalizar qué información se edita. Compatible con React Hook Form
          y cualquier esquema de validación.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/authentication
        </Typography>
      </div>

      <div className="space-y-4 mb-6">
        <Typography variant="h2">Características</Typography>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            <strong>Arquitectura Flexible:</strong> Diseño basado en children
            que permite agregar o quitar campos del formulario según las
            necesidades de cada aplicación.
          </li>
          <li>
            <strong>Dialog Modal:</strong> Se presenta como un diálogo modal
            centrado que se puede abrir y cerrar de forma controlada mediante
            props.
          </li>
          <li>
            <strong>Avatar con Iniciales:</strong> Muestra el avatar del usuario
            con imagen o fallback de iniciales personalizables.
          </li>
          <li>
            <strong>Nombre Visible:</strong> Sección opcional que muestra el
            nombre del usuario junto al avatar con descripción personalizable.
          </li>
          <li>
            <strong>Validación Personalizable:</strong> Integración con React
            Hook Form y cualquier esquema de validación (Zod, Yup, etc.).
          </li>
          <li>
            <strong>Estado de Carga:</strong> Control del botón de guardado con
            estados de carga y deshabilitado durante el envío.
          </li>
          <li>
            <strong>Totalmente Personalizable:</strong> Títulos, descripciones,
            avatar y contenido del formulario configurables mediante props.
          </li>
          <li>
            <strong>Componente Contenedor:</strong> Proporciona la estructura
            visual (Dialog + Avatar + Footer) sin imponer lógica de negocio
            específica.
          </li>
        </ul>
      </div>

      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="flex items-center justify-center h-[calc(100%-1px)] border rounded-lg">
            <CodeExample />
          </div>
        </TabsContent>
        <TabsContent value="code">
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
                <td className="px-4 py-3 text-sm font-mono">open</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  boolean
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Controla si el diálogo modal está
                  abierto o cerrado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">onOpenChange</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  (open: boolean) =&gt; void
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Callback que se ejecuta al abrir o
                  cerrar el diálogo. Típicamente se conecta a un{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    useState
                  </code>
                  .
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">onSubmit</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  (e: FormEvent) =&gt; void | Promise&lt;void&gt;
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Función callback que se ejecuta al
                  enviar el formulario. Recibe el evento del formulario.
                  Típicamente se usa con{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    form.handleSubmit()
                  </code>
                  .
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">children</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  React.ReactNode
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Contenido del formulario. Permite
                  agregar cualquier campo personalizado (FormInput, FormSelect,
                  etc.).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">avatarUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  URL de la imagen del avatar del usuario. Si no se proporciona,
                  se muestra el fallback con iniciales.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">initials</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Iniciales para el fallback del avatar (ej: &quot;JP&quot;). Si
                  no se proporciona, se muestra &quot;U&quot; por defecto.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">displayName</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Nombre del usuario que se muestra junto al avatar. Si no se
                  proporciona, la sección de texto no se renderiza.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">
                  avatarDescription
                </td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Texto secundario que aparece debajo del nombre junto al
                  avatar. Solo se muestra si se proporciona.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">title</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Título del diálogo modal. Default: &quot;Perfil de
                  Usuario&quot;.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">isSubmitting</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  boolean
                </td>
                <td className="px-4 py-3 text-sm">
                  Estado de carga del formulario. Deshabilita los botones y
                  muestra &quot;Guardando...&quot;. Default: false.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ProfilePage;
