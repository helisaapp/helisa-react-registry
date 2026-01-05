import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface NavTab {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: LucideIcon;
  badge?: {
    label: string | number;
    variant?: "default" | "secondary";
    className?: string;
  };
  content?: ReactNode;
}

interface NavTabsProps {
  tabs: NavTab[];
  defaultValue?: string;
}

export default function NavTabs({ tabs, defaultValue }: NavTabsProps) {
  const initialValue = defaultValue || tabs[0]?.value || "tab-1";

  return (
    <Tabs defaultValue={initialValue}>
      <ScrollArea>
        <TabsList className="mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 text-foreground">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              {tab.icon && (
                <tab.icon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
              )}
              {tab.label}
              {tab.badge && (
                <Badge
                  className={tab.badge.className || "ms-1.5"}
                  variant={tab.badge.variant}
                >
                  {tab.badge.label}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content || (
            <p className="pt-1 text-center text-xs text-muted-foreground">
              Falta el contenido para: {tab.label}
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
