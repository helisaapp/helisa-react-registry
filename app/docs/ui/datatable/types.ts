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
