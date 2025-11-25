export enum DocumentTypeEnum {
  CEDULA = "Cédula",
  NIT = "NIT",
}

export interface CompanyInfo {
  id: string;
  name: string;
  documentType: DocumentTypeEnum;
  documentNumber: string;
  email?: string;
  address?: string;
  phone?: string;
  dateCreation?: string;
}

// Cursor pagination types
export interface CursorInfo {
  cursor: string;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  pageInfo: CursorInfo;
  totalCount: number;
}
