import CodeContainer from "@/components/code-container";
import { LayoutContainer } from "@/components/helisa/ui/layout-container";
import NavTabs, { NavTab } from "@/components/helisa/ui/nav-tabs";
import { Typography } from "@/components/helisa/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BoxIcon,
  ChartLine,
  HouseIcon,
  PanelsTopLeftIcon,
  SettingsIcon,
  UsersRoundIcon,
} from "lucide-react";
import React from "react";

const NavTabsPage = () => {
  const codeString = `
    const tabs: NavTab[] = [
      {
        value: "tab-1",
        label: "Overview",
        icon: HouseIcon,
      },
      {
        value: "tab-2",
        label: "Projects",
        icon: PanelsTopLeftIcon,
        badge: {
          label: 3,
          variant: "secondary",
          className: "ms-1.5 min-w-5 bg-primary/15 px-1",
        },
      },
      {
        value: "tab-3",
        label: "Packages",
        icon: BoxIcon,
        badge: {
          label: "New",
        },
      },
      {
        value: "tab-4",
        label: "Team",
        icon: UsersRoundIcon,
      },
      {
        value: "tab-5",
        label: "Insights",
        icon: ChartLine,
      },
      {
        value: "tab-6",
        label: "Settings",
        icon: SettingsIcon,
      },
    ];

    return (
      <div className="flex flex-col gap-10">
       <NavTabs tabs={tabs} defaultValue="tab-1" />

       <LayoutContainer maxWidth="sm">
        <div className="mt-5 space-y-5">
        <Typography variant="large">
          Nav Tabs en un contenedor más pequeño
        </Typography>
        <NavTabs tabs={tabs} defaultValue="tab-1" />
        </div>
       </LayoutContainer>
     </div>
    );
  `;

  const codeExample = () => {
    const tabs: NavTab[] = [
      {
        value: "tab-1",
        label: "Overview",
        icon: HouseIcon,
      },
      {
        value: "tab-2",
        label: "Projects",
        icon: PanelsTopLeftIcon,
        badge: {
          label: 3,
          variant: "secondary",
          className: "ms-1.5 min-w-5 bg-primary/15 px-1",
        },
      },
      {
        value: "tab-3",
        label: "Packages",
        icon: BoxIcon,
        badge: {
          label: "New",
        },
      },
      {
        value: "tab-4",
        label: "Team",
        icon: UsersRoundIcon,
      },
      {
        value: "tab-5",
        label: "Insights",
        icon: ChartLine,
      },
      {
        value: "tab-6",
        label: "Settings",
        icon: SettingsIcon,
      },
    ];

    return (
      <div className="flex flex-col gap-10">
        <NavTabs tabs={tabs} defaultValue="tab-1" />

        <LayoutContainer maxWidth="sm">
          <div className="mt-5 space-y-5">
            <Typography variant="large">
              Nav Tabs en un contenedor más pequeño
            </Typography>
            <NavTabs tabs={tabs} defaultValue="tab-1" />
          </div>
        </LayoutContainer>
      </div>
    );
  };

  return (
    <LayoutContainer maxWidth="5xl">
      <div className="flex flex-col space-y-8">
        <Typography variant="h1">Nav Tabs</Typography>
        <Typography variant="lead">
          Los Nav Tabs permiten organizar el contenido en secciones navegables
          mediante pestañas, mejorando la experiencia del usuario al facilitar
          el acceso a diferentes vistas o categorías dentro de una misma
          interfaz.
        </Typography>

        <Typography variant="lead">
          Procura usar componentes y no todo el contenido dentro de las tabs
          para mejorar la performance. Asi evitas que todo el contenido se
          renderice al mismo tiempo.
        </Typography>

        <Typography variant="lead">
          Si necesitas compartir estado entre las tabs, considera usar un estado
          global en el componente padre o usa un contexto para manejar la
          información compartida.
        </Typography>
      </div>

      <div className="flex flex-col space-y-2 max-w-2xl my-5">
        <Typography variant="large">Instalación</Typography>
        <Typography variant="code">
          npx shadcn@latest add @helisa/nav-tabs
        </Typography>
      </div>

      <Tabs defaultValue="preview" className="mt-5">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {/* Preview */}
          {codeExample()}
        </TabsContent>
        <TabsContent value="code">
          {/* Code */}
          <CodeContainer>{codeString}</CodeContainer>
        </TabsContent>
      </Tabs>
    </LayoutContainer>
  );
};

export default NavTabsPage;
