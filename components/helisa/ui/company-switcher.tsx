"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface CompanySwitcherProps {
  companies: {
    name: string;
    logo: React.ElementType;
    id: string;
  }[];
  onSelected: (companyId: string) => void;
  enableCreate?: boolean;
  onCreate?: () => void;
  defaultCompanyId?: string;
}

export function CompanySwitcher({
  companies,
  enableCreate,
  onCreate,
  onSelected,
  defaultCompanyId,
}: CompanySwitcherProps) {
  const { isMobile } = useSidebar();
  const [activeCompany, setActiveCompany] = React.useState(
    companies.find((c) => c.id === defaultCompanyId) || companies[0],
  );

  if (!activeCompany) {
    return null;
  }

  const handleCreate = () => {
    if (onCreate) {
      onCreate();
    }
  };

  const handleSelect = (companyId: string) => {
    onSelected(companyId);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeCompany.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeCompany.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Empresas
            </DropdownMenuLabel>
            {companies.map((company) => (
              <DropdownMenuItem
                key={company.name}
                onClick={() => {
                  setActiveCompany(company);
                  handleSelect(company.id);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <company.logo className="size-3.5 shrink-0" />
                </div>
                {company.name}
              </DropdownMenuItem>
            ))}
            {enableCreate && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2" onClick={handleCreate}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Crear Empresa
                  </div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
