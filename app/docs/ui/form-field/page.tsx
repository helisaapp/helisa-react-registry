"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CodeContainer from "@/components/code-container";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "@/components/helisa/ui/form-field";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  role: z
    .string({
      required_error: "Por favor seleccione un rol.",
    })
    .min(1, {
      message: "Por favor seleccione un rol.",
    }),
  bio: z.string().max(160).min(4),
  marketing: z.boolean(),
  security_emails: z.boolean(),
});

const FormFieldPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "",
      bio: "",
      marketing: false,
      security_emails: true,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Valores del formulario:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const codeString = `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "@/components/helisa/ui/form-field"

const formSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  role: z.string(),
  bio: z.string().max(160),
  marketing: z.boolean().default(false),
  security_emails: z.boolean(),
})

export function FormFieldExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      marketing: false,
      security_emails: true,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="username"
            label="Nombre de usuario"
            placeholder="jdoe"
            description="Este es tu nombre público."
            isRequired
          />
          <FormInput
            control={form.control}
            name="email"
            label="Correo Electrónico"
            placeholder="m@example.com"
            isRequired
          />
        </div>

        <FormSelect
          control={form.control}
          name="role"
          label="Rol"
          placeholder="Selecciona un rol"
          isRequired
        >
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="user">Usuario</SelectItem>
          <SelectItem value="guest">Invitado</SelectItem>
        </FormSelect>

        <FormTextarea
          control={form.control}
          name="bio"
          label="Biografía"
          placeholder="Cuéntanos un poco sobre ti"
          rows={3}
        />

        <div className="space-y-4">
          <Typography variant="h4" className="text-sm font-medium">Configuración</Typography>
          <FormCheckbox
            control={form.control}
            name="marketing"
            label="Recibir correos de marketing"
            description="Recibe noticias sobre nuevos productos y características."
          />
          <FormSwitch
            control={form.control}
            name="security_emails"
            label="Correos de seguridad"
            description="Recibe alertas sobre actividad sospechosa."
          />
        </div>

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}`;

  return (
    <LayoutContainer maxWidth="3xl">
      <div className="flex flex-col space-y-8">
        <div>
          <Typography variant="h1">Form Field</Typography>
          <Typography variant="lead" className="mt-4">
            Conjunto de componentes wrapper para integrar componentes UI con
            React Hook Form de manera rápida y estandarizada.
          </Typography>
        </div>

        <div className="flex flex-col space-y-2 max-w-2xl">
          <Typography variant="large">Instalación</Typography>
          <Typography variant="code">
            npx shadcn@latest add @helisa/form-field
          </Typography>
        </div>

        <div className="space-y-4">
          <Typography variant="h2">Características</Typography>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Integración Directa:</strong> Conecta automáticamente con{" "}
              <code>control</code> de React Hook Form.
            </li>
            <li>
              <strong>Manejo de Errores:</strong> Muestra mensajes de error de
              validación automáticamente.
            </li>
            <li>
              <strong>Accesibilidad:</strong> Gestiona <code>aria-invalid</code>
              , <code>ids</code> y etiquetas correctamente.
            </li>
            <li>
              <strong>Consistencia:</strong> Estandariza la visualización de
              labels, descripciones y marcas de requerido.
            </li>
          </ul>
        </div>

        <Tabs defaultValue="preview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="rounded-lg border p-6">
              <>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      control={form.control}
                      name="username"
                      label="Nombre de usuario"
                      placeholder="jdoe"
                      description="Este es tu nombre público."
                      isRequired
                    />
                    <FormInput
                      control={form.control}
                      name="email"
                      label="Correo Electrónico"
                      placeholder="m@example.com"
                      isRequired
                    />
                  </div>

                  <FormSelect
                    control={form.control}
                    name="role"
                    label="Rol"
                    isRequired
                  >
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="guest">Invitado</SelectItem>
                  </FormSelect>

                  <FormTextarea
                    control={form.control}
                    name="bio"
                    label="Biografía"
                    placeholder="Cuéntanos un poco sobre ti"
                    rows={3}
                  />

                  <div className="space-y-4 rounded-md border p-4">
                    <Typography variant="h4" className="text-sm font-medium">
                      Configuración
                    </Typography>
                    <FormCheckbox
                      control={form.control}
                      name="marketing"
                      label="Recibir correos de marketing"
                      description="Recibe noticias sobre nuevos productos."
                      required
                    />
                    <FormSwitch
                      control={form.control}
                      name="security_emails"
                      label="Correos de seguridad"
                      description="Recibe alertas sobre actividad sospechosa."
                      required
                    />
                  </div>

                  <Button type="submit">Enviar</Button>
                </form>
              </>
            </div>
          </TabsContent>

          <TabsContent value="code">
            <CodeContainer>{codeString}</CodeContainer>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <Typography variant="h2">Props Comunes</Typography>
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
                  <td className="px-4 py-3 text-sm font-mono">control</td>
                  <td className="px-4 py-3 text-sm">Control</td>
                  <td className="px-4 py-3 text-sm">
                    Objeto control retornado por <code>useForm</code>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">name</td>
                  <td className="px-4 py-3 text-sm">string</td>
                  <td className="px-4 py-3 text-sm">
                    Nombre del campo en el esquema Zod
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">label</td>
                  <td className="px-4 py-3 text-sm">ReactNode</td>
                  <td className="px-4 py-3 text-sm">
                    Etiqueta visible del campo
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">description</td>
                  <td className="px-4 py-3 text-sm">ReactNode</td>
                  <td className="px-4 py-3 text-sm">
                    Texto de ayuda o descripción
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">isRequired</td>
                  <td className="px-4 py-3 text-sm">boolean</td>
                  <td className="px-4 py-3 text-sm">
                    Muestra un asterisco rojo indicando obligatoriedad
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default FormFieldPage;
