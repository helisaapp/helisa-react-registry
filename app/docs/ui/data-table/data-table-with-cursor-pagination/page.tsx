"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CodeContainer from "@/components/code-container";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/registry/helisa/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { CompanyInfo, DocumentTypeEnum } from "../shared-types";
import { mockCompanies } from "../shared-mock-data";

// Simulación de API con cursor pagination
interface CursorState {
  currentPage: CompanyInfo[];
  pageSize: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const DataTableWithCursorPaginationPage = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    currentPage: mockCompanies.slice(0, 10),
    pageSize: 10,
    canGoNext: mockCompanies.length > 10,
    canGoPrevious: false,
  });

  // Simular la lógica de cursor pagination
  const fetchDataWithCursor = useCallback(
    (
      direction: "next" | "previous",
      currentFirstId: string,
      currentLastId: string,
      pageSize: number,
    ): CursorState => {
      let startIndex = 0;

      if (direction === "next") {
        // Buscar el índice del último elemento actual y empezar desde el siguiente
        const lastItemIndex = mockCompanies.findIndex(
          (item) => item.id === currentLastId,
        );
        startIndex = lastItemIndex + 1;
      } else if (direction === "previous") {
        // Buscar el índice del primer elemento actual y retroceder pageSize elementos
        const firstItemIndex = mockCompanies.findIndex(
          (item) => item.id === currentFirstId,
        );
        startIndex = Math.max(0, firstItemIndex - pageSize);
      }

      const endIndex = Math.min(startIndex + pageSize, mockCompanies.length);
      const newPage = mockCompanies.slice(startIndex, endIndex);

      return {
        currentPage: newPage,
        pageSize,
        canGoNext: endIndex < mockCompanies.length,
        canGoPrevious: startIndex > 0,
      };
    },
    [],
  );

  // Obtener datos actuales - usar directamente el estado
  const currentData = useMemo(() => {
    return {
      data: cursorState.currentPage,
      pageInfo: {
        cursor:
          cursorState.currentPage.length > 0
            ? cursorState.currentPage[0].id
            : "",
        hasNext: cursorState.canGoNext,
        hasPrevious: cursorState.canGoPrevious,
      },
      totalCount: mockCompanies.length,
    };
  }, [cursorState]);

  // Definir las columnas del DataTable
  const columns: ColumnDef<CompanyInfo>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID (Cursor)",
        cell: ({ row }) => (
          <div className="font-mono text-xs text-gray-500">
            {row.getValue("id")}
          </div>
        ),
      },
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

  // Manejar navegación con cursor
  const handleCursorNavigation = useCallback(
    (direction: "next" | "previous") => {
      const currentPage = cursorState.currentPage;
      if (currentPage.length === 0) return;

      const firstId = currentPage[0].id;
      const lastId = currentPage[currentPage.length - 1].id;

      const newState = fetchDataWithCursor(
        direction,
        firstId,
        lastId,
        cursorState.pageSize,
      );
      setCursorState(newState);
    },
    [cursorState, fetchDataWithCursor],
  );

  // Manejar cambio de tamaño de página
  const handlePageSizeChange = useCallback((pageSize: number) => {
    setCursorState({
      currentPage: mockCompanies.slice(0, pageSize),
      pageSize,
      canGoNext: mockCompanies.length > pageSize,
      canGoPrevious: false,
    });
  }, []);

  const codeString = `"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/helisa/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import {
  CompanyInfo,
  DocumentTypeEnum,
  CursorPaginatedResponse,
} from "./shared-types";
import { mockCompanies } from "./shared-mock-data";

interface CursorState {
  currentCursor: string | null;
  pageSize: number;
  direction: "next" | "previous" | null;
}

const CursorPaginationExample = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    currentCursor: null,
    pageSize: 10,
    direction: null,
  });

  // Simular API con cursor pagination
  const fetchDataWithCursor = useCallback(
    (cursor: string | null, pageSize: number, direction: "next" | "previous" | null): CursorPaginatedResponse<CompanyInfo> => {
      let startIndex = 0;

      if (cursor) {
        const cursorIndex = mockCompanies.findIndex((item) => item.id === cursor);
        if (cursorIndex !== -1) {
          if (direction === "next") {
            startIndex = cursorIndex + 1;
          } else if (direction === "previous") {
            startIndex = Math.max(0, cursorIndex - pageSize);
          }
        }
      }

      const endIndex = Math.min(startIndex + pageSize, mockCompanies.length);
      const data = mockCompanies.slice(startIndex, endIndex);

      const hasNext = endIndex < mockCompanies.length;
      const hasPrevious = startIndex > 0;
      const lastItem = data[data.length - 1];

      return {
        data,
        pageInfo: {
          cursor: lastItem ? lastItem.id : "",
          hasNext,
          hasPrevious,
        },
        totalCount: mockCompanies.length,
      };
    },
    [],
  );

  const currentData = useMemo(() => {
    return fetchDataWithCursor(
      cursorState.currentCursor,
      cursorState.pageSize,
      cursorState.direction,
    );
  }, [cursorState, fetchDataWithCursor]);

  const handleCursorNavigation = useCallback((direction: "next" | "previous") => {
    setCursorState((prev) => ({
      ...prev,
      currentCursor: currentData.pageInfo.cursor,
      direction,
    }));
  }, [currentData.pageInfo.cursor]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setCursorState({
      currentCursor: null,
      pageSize,
      direction: null,
    });
  }, []);

  // Definir columnas...
  const columns: ColumnDef<CompanyInfo>[] = [...];

  return (
    <DataTable
      columns={columns}
      data={currentData.data}
      useCursorPagination={true}
      cursorPagination={currentData.pageInfo}
      onCursorNavigate={handleCursorNavigation}
      pageSize={cursorState.pageSize}
      pageSizeOptions={[5, 10, 20, 50]}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};

export default CursorPaginationExample;`;

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <div>
          <Typography variant="h1">DataTable - Cursor Pagination</Typography>
          <Typography variant="lead" className="mt-4">
            Implementación de DataTable con paginación por cursor. Esta
            implementación es ideal para datasets grandes y dinámicos,
            ofreciendo consistencia y rendimiento superior en tiempo real.
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
              <strong>Paginación por cursor:</strong> Utiliza un identificador
              único como referencia
            </li>
            <li>
              <strong>Consistencia de datos:</strong> No se duplican ni omiten
              registros durante la navegación
            </li>
            <li>
              <strong>Rendimiento optimizado:</strong> Queries más eficientes
              para datasets grandes
            </li>
            <li>
              <strong>Tiempo real:</strong> Ideal para datos que cambian
              frecuentemente
            </li>
            <li>
              <strong>Navegación simple:</strong> Solo botones
              anterior/siguiente
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
                  Ejemplo con Cursor Pagination ({mockCompanies.length}{" "}
                  registros)
                </Typography>
                <Typography variant="muted" className="mt-1">
                  DataTable con paginación por cursor usando ID como referencia
                </Typography>
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Cursor actual:</strong>{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {currentData.pageInfo.cursor || "inicio"}
                  </code>
                </div>
              </div>

              <DataTable
                columns={columns}
                data={currentData.data}
                useCursorPagination={true}
                cursorPagination={currentData.pageInfo}
                onCursorNavigate={handleCursorNavigation}
                pageSize={cursorState.pageSize}
                pageSizeOptions={[5, 10, 20, 50]}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="code">
            <CodeContainer>{codeString}</CodeContainer>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <Typography variant="h2">Cuándo usar Cursor Pagination</Typography>
          <div className="rounded-lg border p-6 bg-gray-50">
            <div className="space-y-4">
              <div>
                <Typography variant="h4" className="text-green-700">
                  ✅ Ideal para:
                </Typography>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>Datasets muy grandes (millones de registros)</li>
                  <li>Datos que cambian frecuentemente en tiempo real</li>
                  <li>APIs modernas (GraphQL, REST con cursor)</li>
                  <li>Feeds de redes sociales o sistemas de chat</li>
                  <li>Cuando el rendimiento es crítico</li>
                </ul>
              </div>

              <div>
                <Typography variant="h4" className="text-orange-700">
                  ⚠️ Limitaciones:
                </Typography>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>No permite saltar a páginas específicas</li>
                  <li>No muestra el número total de páginas</li>
                  <li>
                    Requiere un campo único y ordenable (ID, timestamp, etc.)
                  </li>
                  <li>Más complejo de implementar que la paginación básica</li>
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
                  <td className="px-4 py-3 text-sm font-mono">
                    useCursorPagination
                  </td>
                  <td className="px-4 py-3 text-sm">boolean</td>
                  <td className="px-4 py-3 text-sm">
                    Habilita el modo de paginación por cursor
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">
                    cursorPagination
                  </td>
                  <td className="px-4 py-3 text-sm">CursorInfo</td>
                  <td className="px-4 py-3 text-sm">
                    Información del cursor {`{cursor, hasNext, hasPrevious}`}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">
                    onCursorNavigate
                  </td>
                  <td className="px-4 py-3 text-sm">Function</td>
                  <td className="px-4 py-3 text-sm">
                    Callback para navegación (next | previous)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">pageSize</td>
                  <td className="px-4 py-3 text-sm">number</td>
                  <td className="px-4 py-3 text-sm">
                    Número de registros por página
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono">
                    onPageSizeChange
                  </td>
                  <td className="px-4 py-3 text-sm">Function</td>
                  <td className="px-4 py-3 text-sm">
                    Callback para cambio de tamaño de página
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

export default DataTableWithCursorPaginationPage;
