"use client";

import Login from "@/components/helisa/blocks/authentication/login";
import { useState } from "react";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";

const CodeExample = () => {
  const [backendError, setBackendError] = useState<string>();

  const handleSubmitWithError = async (data: { email: string; password: string }) => {
    // Simulando validación del backend
    if (data.email === "test@example.com" && data.password === "Test123*") {
      setBackendError("Credenciales inválidas. Por favor, verifica tus datos");
      return;
    }

    // Simulando autenticación exitosa con delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("¡Login exitoso! Redirigiendo...");
    setBackendError(undefined);
  };

  return (
    <Login
      onSubmit={handleSubmitWithError}
      error={backendError}
      onForgotPassword={() => alert("Redirigiendo a recuperación de contraseña")}
      termsUrl="/terms"
      policyUrl="/policy"
    />
  );
};

const codeString = `const [backendError, setBackendError] = useState<string>();

const handleSubmitWithError = async (data: { email: string; password: string }) => {
  // Simulando validación del backend
  if (data.email === "test@example.com" && data.password === "Test123*") {
    setBackendError("Credenciales inválidas. Por favor, verifica tus datos");
    return;
  }

  // Simulando autenticación exitosa
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("¡Login exitoso!");
  setBackendError(undefined);
};

return (
  <Login
    onSubmit={handleSubmitWithError}
    error={backendError}
    onForgotPassword={() => console.log("Forgot password clicked")}
    termsUrl="/terms"
    policyUrl="/policy"
  />
);`;

const LoginPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Login</Typography>
        <Typography variant="lead">
          Componente de autenticación completo diseñado para facilitar el login
          de usuarios en aplicaciones web y móviles. Este bloque ofrece una
          interfaz intuitiva, segura y totalmente personalizable que incluye
          validación robusta, manejo de errores del backend, toggle de
          contraseña y recuperación de cuenta.
          <br />
          <br />
          Construido con React Hook Form y Zod para validación en tiempo real,
          el componente mantiene las mejores prácticas de accesibilidad (WCAG)
          y proporciona una experiencia de usuario fluida tanto en dispositivos
          móviles como en escritorio. Incluye estados de carga, limpieza
          automática de formularios ante errores, y enlaces opcionales a
          términos y políticas de privacidad.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/login
        </Typography>
      </div>

      <div className="space-y-4 mb-6">
        <Typography variant="h2">Características</Typography>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            <strong>Validación Robusta:</strong> Integración completa con React
            Hook Form y Zod para validación de campos en tiempo real. El email
            se valida con formato correcto y se convierte automáticamente a
            minúsculas.
          </li>
          <li>
            <strong>Manejo de Errores del Backend:</strong> Muestra mensajes de
            error del servidor con diseño visual distintivo (fondo rojo suave +
            ícono de alerta).
          </li>
          <li>
            <strong>Toggle de Contraseña:</strong> Botón eye/eye-off para
            mostrar u ocultar la contraseña ingresada, mejorando la usabilidad
            sin comprometer seguridad.
          </li>
          <li>
            <strong>Estado de Carga:</strong> Deshabilita el formulario y
            muestra feedback visual ("Iniciando sesión...") durante el proceso
            de autenticación.
          </li>
          <li>
            <strong>Limpieza Automática:</strong> El formulario se limpia
            automáticamente cuando ocurre un error del backend, protegiendo
            credenciales.
          </li>
          <li>
            <strong>Recuperación de Contraseña:</strong> Enlace opcional
            "¿Olvidó su contraseña?" con separador visual para redirigir al
            flujo de recuperación.
          </li>
          <li>
            <strong>Totalmente Personalizable:</strong> Logo, títulos,
            descripciones, términos y políticas configurables mediante props.
          </li>
          <li>
            <strong>Accesibilidad:</strong> Incluye atributos aria-label,
            autoComplete para autocompletar del navegador, y estructura
            semántica HTML5.
          </li>
          <li>
            <strong>Footer Legal:</strong> Sección opcional de términos y
            condiciones con enlaces configurables.
          </li>
          <li>
            <strong>Responsivo:</strong> Diseño adaptable que funciona
            perfectamente en móviles, tablets y escritorio.
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
                <td className="px-4 py-3 text-sm font-mono">onSubmit</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  (data) =&gt; void | Promise&lt;void | string&gt;
                </td>
                <td className="px-4 py-3 text-sm">
                  <strong>Requerido.</strong> Función callback que se ejecuta
                  al enviar el formulario. Recibe un objeto con{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    email
                  </code>{" "}
                  y{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    password
                  </code>
                  . Si retorna un string, se muestra como error del backend.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">error</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Mensaje de error del backend para mostrar encima del
                  formulario. Se limpia automáticamente al enviar un nuevo
                  intento.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">onForgotPassword</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  () =&gt; void
                </td>
                <td className="px-4 py-3 text-sm">
                  Callback opcional para el enlace "¿Olvidó su contraseña?". Si
                  no se proporciona, el enlace no se muestra. Típicamente se
                  usa para redirigir a la página de recuperación.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">label</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Título principal del formulario. Default: "¡Bienvenido de
                  nuevo!". Se muestra debajo del logo con estilo h1.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">description</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Subtítulo descriptivo que aparece debajo del título. Default:
                  "Ingrese sus credenciales para acceder de forma segura a su
                  cuenta.". Usa color muted.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">logoUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  URL del logo para mostrar en el encabezado del formulario. Si
                  no se proporciona, muestra el texto "HELISA" en negrita. El
                  logo se renderiza con altura de 64px.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">termsUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Enlace a la página de términos y condiciones. Debe usarse
                  junto con{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    policyUrl
                  </code>
                  . Si ambos están presentes, se muestra el footer legal.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">policyUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Enlace a la página de política de privacidad. Debe usarse
                  junto con{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    termsUrl
                  </code>
                  . Si ambos están presentes, se muestra el footer legal.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default LoginPage;
