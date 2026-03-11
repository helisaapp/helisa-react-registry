"use client";

import RecoverPassword from "@/components/helisa/blocks/authentication/recover-password";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeContainer from "@/components/code-container";

const CodeExample = () => {
  const handleSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    // Simular error si la contraseña es muy común
    if (data.password === "Test1234!") {
      return "La contraseña es demasiado común. Elige una más segura.";
    }

    // Simular éxito
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("¡Contraseña restablecida exitosamente! Redirigiendo al login...");
  };

  return <RecoverPassword onSubmit={handleSubmit} />;
};

const codeString = `const handleSubmit = async (data: {
  password: string;
  confirmPassword: string;
}) => {
  // Simular error si la contraseña es muy común
  if (data.password === "Test1234!") {
    return "La contraseña es demasiado común. Elige una más segura.";
  }

  // Simular éxito
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("¡Contraseña restablecida exitosamente!");
};

return <RecoverPassword onSubmit={handleSubmit} />;`;

const RecoverPasswordPage = () => {
  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Recover Password</Typography>
        <Typography variant="lead">
          Componente de restablecimiento de contraseña diseñado para completar
          el flujo de recuperación de cuentas. Este bloque permite a los
          usuarios definir una nueva contraseña segura con validación robusta de
          complejidad y confirmación.
          <br />
          <br />
          Incluye validación en tiempo real con reglas de complejidad (mínimo 8
          caracteres, mayúsculas, minúsculas, números y caracteres especiales),
          toggle de visibilidad para ambos campos, manejo de errores del backend
          y consistencia visual con los demás bloques de autenticación.
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
            <strong>Validación de Complejidad:</strong> La contraseña debe tener
            al menos 8 caracteres, una mayúscula, una minúscula, un número y un
            carácter especial (@$!%*?&amp;).
          </li>
          <li>
            <strong>Confirmación de Contraseña:</strong> Campo de confirmación
            que verifica que ambas contraseñas coincidan antes de enviar.
          </li>
          <li>
            <strong>Toggle de Visibilidad:</strong> Botón eye/eye-off
            independiente para cada campo de contraseña.
          </li>
          <li>
            <strong>Manejo de Errores del Backend:</strong> Muestra mensajes de
            error del servidor con diseño visual distintivo.
          </li>
          <li>
            <strong>Estado de Carga:</strong> Deshabilita el botón y muestra
            &quot;Restableciendo...&quot; durante el proceso de envío.
          </li>
          <li>
            <strong>Limpieza Automática:</strong> Limpia ambos campos
            automáticamente cuando ocurre un error del backend.
          </li>
          <li>
            <strong>Totalmente Personalizable:</strong> Logo, título y
            descripción configurables mediante props.
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
                  <strong>Requerido.</strong> Función callback que se ejecuta al
                  enviar el formulario. Recibe un objeto con{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    password
                  </code>{" "}
                  y{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    confirmPassword
                  </code>
                  . Si retorna un string, se muestra como error del backend.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">label</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Título principal del formulario. Default: &quot;Restablecer
                  contraseña&quot;.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">description</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  Subtítulo descriptivo. Default: &quot;Ingrese su nueva
                  contraseña para restablecer el acceso a su cuenta.&quot;.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">logoUrl</td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  string
                </td>
                <td className="px-4 py-3 text-sm">
                  URL del logo para mostrar en el encabezado. Default: texto
                  &quot;HELISA&quot;.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-10">
        <Typography variant="h2">Reglas de Contraseña</Typography>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Regla
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-mono">min 8</td>
                <td className="px-4 py-3 text-sm">
                  Al menos 8 caracteres de largo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">A-Z</td>
                <td className="px-4 py-3 text-sm">
                  Al menos una letra mayúscula.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">a-z</td>
                <td className="px-4 py-3 text-sm">
                  Al menos una letra minúscula.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">0-9</td>
                <td className="px-4 py-3 text-sm">Al menos un número.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">@$!%*?&amp;</td>
                <td className="px-4 py-3 text-sm">
                  Al menos un carácter especial.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono">coincidencia</td>
                <td className="px-4 py-3 text-sm">
                  Ambos campos de contraseña deben coincidir.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default RecoverPasswordPage;
