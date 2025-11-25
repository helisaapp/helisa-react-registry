"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import CodeContainer from "@/components/code-container";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/registry/helisa/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { CompanyInfo, DocumentTypeEnum } from "../shared-types";
import { mockCompanies } from "../shared-mock-data";

const DataTableWithBasicPaginationPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Definir las columnas del DataTable
  const columns: ColumnDef<CompanyInfo>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre de la Empresa",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "documentType",
        header: "Tipo de Documento",
        cell: ({ row }) => {
          const documentType = row.getValue("documentType") as DocumentTypeEnum;
          return (
            <Badge
              variant={
                documentType === DocumentTypeEnum.NIT ? "default" : "secondary"
              }
            >
              {documentType}
            </Badge>
          );
        },
      },
      {
        accessorKey: "documentNumber",
        header: "Número de Documento",
        cell: ({ row }) => (
          <div className="font-mono text-sm">
            {row.getValue("documentNumber")}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Correo Electrónico",
        cell: ({ row }) => {
          const email = row.getValue("email") as string;
          return email ? (
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              {email}
            </div>
          ) : (
            <span className="text-gray-400">No disponible</span>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Teléfono",
        cell: ({ row }) => {
          const phone = row.getValue("phone") as string;
          return phone ? (
            <div className="font-mono text-sm">{phone}</div>
          ) : (
            <span className="text-gray-400">No disponible</span>
          );
        },
      },
      {
        accessorKey: "address",
        header: "Dirección",
        cell: ({ row }) => {
          const address = row.getValue("address") as string;
          return address ? (
            <div className="max-w-xs truncate" title={address}>
              {address}
            </div>
          ) : (
            <span className="text-gray-400">No disponible</span>
          );
        },
      },
      {
        accessorKey: "dateCreation",
        header: "Fecha de Creación",
        cell: ({ row }) => {
          const date = row.getValue("dateCreation") as string;
          return date ? (
            <div className="text-sm">
              {new Date(date).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          ) : (
            <span className="text-gray-400">No disponible</span>
          );
        },
      },
    ],
    [],
  );

  // Simular paginación del lado del servidor
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return mockCompanies.slice(start, end);
  }, [pagination]);

  const codeString = `"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/helisa/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { CompanyInfo, DocumentTypeEnum } from "./shared-types";
import { mockCompanies } from "./shared-mock-data";

const BasicPaginationExample = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Definir las columnas del DataTable
  const columns: ColumnDef<CompanyInfo>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre de la Empresa",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "documentType", 
        header: "Tipo de Documento",
        cell: ({ row }) => {
          const documentType = row.getValue("documentType") as DocumentTypeEnum;
          return (
            <Badge variant={documentType === DocumentTypeEnum.NIT ? "default" : "secondary"}>
              {documentType}
            </Badge>
          );
        },
      },
      // ... más columnas
    ],
    [],
  );

  // Simular paginación del lado del servidor
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return mockCompanies.slice(start, end);
  }, [pagination]);

  return (
    <DataTable
      columns={columns}
      data={paginatedData}
      rowCount={mockCompanies.length}
      pagination={pagination}
      onPaginationChange={setPagination}
      pageSizeOptions={[5, 10, 20, 50]}
    />
  );
};

export default BasicPaginationExample;`;

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <div>
          <Typography variant="h1">DataTable - Basic Pagination</Typography>
          <Typography variant="lead" className="mt-4">
            Implementación de DataTable con paginación básica (offset-based).
            Esta implementación utiliza paginación tradicional con índice de
            página y tamaño de página para navegar por grandes datasets.
          </Typography>
        </div>

        <div className="flex flex-col space-y-2 max-w-2xl">
          <Typography variant="large">Instalación</Typography>
          <Typography variant="code">
            npx shadcn@latest add @helisa/data-table
          </Typography>
        </div>

        <div className="space-y-4">
          <Typography variant="h2">Características</Typography>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Paginación Offset-based:</strong> Utiliza pageIndex y
              pageSize
            </li>
            <li>
              <strong>Navegación intuitiva:</strong> Botones de primera, última,
              anterior y siguiente
            </li>
            <li>
              <strong>Control de tamaño:</strong> Selector configurable de
              registros por página
            </li>
            <li>
              <strong>Conteo total:</strong> Muestra información del total de
              registros
            </li>
            <li>
              <strong>Server-side ready:</strong> Compatible con APIs que
              requieren offset/limit
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
              <div className="mb-4">
                <Typography variant="h3">
                  Ejemplo con Paginación Básica ({mockCompanies.length}{" "}
                  registros)
                </Typography>
                <Typography variant="muted" className="mt-1">
                  DataTable con paginación offset-based mostrando información de
                  empresas
                </Typography>
              </div>

              <DataTable
                columns={columns}
                data={paginatedData}
                rowCount={mockCompanies.length}
                pagination={pagination}
                onPaginationChange={setPagination}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          </TabsContent>

          <TabsContent value="code">
            <CodeContainer>{codeString}</CodeContainer>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <Typography variant="h2">Cuándo usar Basic Pagination</Typography>
          <div className="rounded-lg border p-6 bg-gray-50">
            <div className="space-y-4">
              <div>
                <Typography variant="h4" className="text-green-700">
                  ✅ Ideal para:
                </Typography>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>APIs que soportan offset/limit</li>
                  <li>Datasets con tamaño conocido y estable</li>
                  <li>
                    Casos donde los usuarios necesitan ir a páginas específicas
                  </li>
                  <li>
                    Interfaces donde es importante mostrar el total de páginas
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h4" className="text-orange-700">
                  ⚠️ Consideraciones:
                </Typography>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>Puede ser lenta con datasets muy grandes</li>
                  <li>
                    Problemas de consistencia si los datos cambian
                    frecuentemente
                  </li>
                  <li>Queries costosas en páginas avanzadas (OFFSET alto)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h2">Props Específicas</Typography>
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
                  <td className="px-4 py-3 text-sm font-mono">pagination</td>
                  <td className="px-4 py-3 text-sm">PaginationState</td>
                  <td className="px-4 py-3 text-sm">
                    Estado de paginación {`{pageIndex, pageSize}`}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">
                    onPaginationChange
                  </td>
                  <td className="px-4 py-3 text-sm">Function</td>
                  <td className="px-4 py-3 text-sm">
                    Callback para cambios de paginación
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">rowCount</td>
                  <td className="px-4 py-3 text-sm">number</td>
                  <td className="px-4 py-3 text-sm">
                    Total de registros en el dataset
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">
                    pageSizeOptions
                  </td>
                  <td className="px-4 py-3 text-sm">number[]</td>
                  <td className="px-4 py-3 text-sm">
                    Opciones de tamaño de página disponibles
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

export default DataTableWithBasicPaginationPage;
