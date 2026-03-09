"use client";

import ForgotPassword from "@/components/helisa/blocks/authentication/forgot-password";
import { useState } from "react";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";

const CodeExample = () => {
  const [backendError, setBackendError] = useState<string>();

  const handleSubmit = async (data: { email: string }) => {
    // Simular error si el email no está registrado
    if (data.email === "notfound@example.com") {
      return "No encontramos una cuenta asociada a este correo electrónico";
    }

    // Simular éxito
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("¡Enlace de recuperación enviado! Revisa tu correo electrónico.");
  };

  return (
    <ForgotPassword
      onSubmit={handleSubmit}
      onLoginClick={() => console.log("Back to login clicked")}
    />
  );
};

const codeString = `
const handleSubmit = async (data: { email: string }) => {
  // Simular error si el email no está registrado
  if (data.email === "notfound@example.com") {
    return "No encontramos una cuenta asociada a este correo electrónico";
  }

  // Simular éxito
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("¡Enlace de recuperación enviado! Revisa tu correo electrónico.");
};

return (
  <ForgotPassword
    onSubmit={handleSubmit}
    onLoginClick={() => console.log("Back to login clicked")}
  />
);
`;

const ForgotPasswordPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Forgot Password</Typography>
        <Typography variant="lead">
          Componente de recuperación de contraseña diseñado para facilitar el
          proceso de restablecimiento de contraseñas en aplicaciones web. Este
          bloque ofrece una interfaz simple y directa que permite a los
          usuarios solicitar un enlace de recuperación mediante su correo
          electrónico.
          <br />
          <br />
          Incluye validación de email, manejo de errores del backend, estados
          de carga y una experiencia de usuario optimizada tanto para móviles
          como para escritorio. El componente mantiene la consistencia visual
          con los demás bloques de autenticación (Login y Register).
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/forgot-password
        </Typography>
      </div>

      <div className="space-y-4 mb-6">
        <Typography variant="h2">Características</Typography>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            <strong>Validación de Email:</strong> Integración con React Hook
            Form y Zod para validación robusta del correo electrónico.
          </li>
          <li>
            <strong>Manejo de Errores del Backend:</strong> Muestra mensajes de
            error del servidor con diseño visual distintivo.
          </li>
          <li>
            <strong>Estado de Carga:</strong> Deshabilita el botón y muestra
            feedback visual durante el proceso de envío.
          </li>
          <li>
            <strong>Limpieza Automática:</strong> Limpia el campo de email
            automáticamente cuando ocurre un error.
          </li>
          <li>
            <strong>Navegación Integrada:</strong> Botón opcional para volver
            al login.
          </li>
          <li>
            <strong>Totalmente Personalizable:</strong> Logo, título y
            descripción configurables mediante props.
          </li>
          <li>
            <strong>Interfaz Minimalista:</strong> Diseño limpio centrado en
            una sola acción para reducir fricción.
          </li>
          <li>
            <strong>Responsivo:</strong> Se adapta perfectamente a cualquier
            tamaño de pantalla.
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
                  (data) =&gt; void | Promise&lt;void | string&gt;
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Función callback que se ejecuta
                  al enviar el formulario. Recibe el objeto con el email. Si
                  retorna un string, se muestra como error del backend.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">onLoginClick</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  () =&gt; void
                </td>
                <td className="px-4 py-3 text-sm">
                  Callback opcional para el botón "Volver al inicio de sesión".
                  Si no se proporciona, el botón no se muestra.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">label</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Título principal del formulario. Default: "¿Olvidó su
                  contraseña?".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">description</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Subtítulo descriptivo que explica el proceso. Default:
                  "Ingrese su correo electrónico para recibir un enlace de
                  recuperación.".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">logoUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  URL del logo para mostrar en el encabezado. Default: texto
                  "HELISA".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ForgotPasswordPage;
