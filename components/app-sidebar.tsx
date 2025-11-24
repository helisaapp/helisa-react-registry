"use client";

import * as React from "react";
import {
  AudioWaveform,
  Blocks,
  Command,
  Component,
  GalleryVerticalEnd,
  Home,
  LibraryBig,
  Webhook,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "UI",
      url: "#",
      icon: Component,
      isActive: true,
      items: [
        {
          title: "Tipografía",
          url: "/docs/ui/typography",
        },
        {
          title: "Carga de archivos",
          url: "/docs/ui/file-uploader",
        },
        {
          title: "Selector de empresa",
          url: "/docs/ui/company-switcher",
        },
        {
          title: "Selector de fecha",
          url: "/docs/ui/input-date-picker",
        },
      ],
    },
    {
      title: "Lib",
      url: "#",
      icon: LibraryBig,
      items: [],
    },
    {
      title: "Hooks",
      url: "#",
      icon: Webhook,
      items: [],
    },
    {
      title: "Blocks",
      url: "#",
      icon: Blocks,
      items: [],
    },
  ],
  projects: [
    {
      name: "Introducción",
      url: "/docs/introduction",
      icon: Home,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Link href="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
