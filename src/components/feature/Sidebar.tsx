"use client";

import Link from "next/link";
import {
  LayoutDashboardIcon,
  LucideIcon,
  MegaphoneIcon,
  SquareUserRoundIcon,
  TentTreeIcon,
  UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Routes } from "@/constants/routes.constants";
import { Url } from "next/dist/shared/lib/router/router";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/user/useUser";

interface SidebarProps {
  isCollapsed: boolean;
}

interface SidebarLink {
  title: string;
  href: Url;
  label?: string;
  icon: LucideIcon;
  //variant: "default" | "ghost";
}

const commonLinks: SidebarLink[] = [
  // {
  //   title: "My Profile",
  //   href: Routes.PROFILE,
  //   label: "",
  //   icon: SquareUserRoundIcon,
  //   //variant: "default",
  // },
  // {
  //   title: "Announcements",
  //   href: Routes.ANNOUNCEMENTS,
  //   label: "",
  //   icon: MegaphoneIcon,
  //   //variant: "default",
  // },
];

const adminLinks: SidebarLink[] = [
  // {
  //   title: "Dashboard",
  //   href: Routes.ADMIN.DASHBOARD,
  //   label: "",
  //   icon: LayoutDashboardIcon,
  //   //variant: "default",
  // },
  {
    title: "My Profile",
    href: Routes.PROFILE,
    label: "",
    icon: SquareUserRoundIcon,
    //variant: "default",
  },
  {
    title: "Announcements",
    href: Routes.ANNOUNCEMENTS,
    label: "",
    icon: MegaphoneIcon,
    //variant: "default",
  },
  {
    title: "My Students",
    href: Routes.ADMIN.STUDENTS,
    label: "",
    icon: UserIcon,
    //variant: "default",
  },
  {
    title: "Leave Requests",
    href: Routes.ADMIN.LEAVES,
    label: "",
    icon: TentTreeIcon,
    //variant: "default",
  },
];

const studentLinks: SidebarLink[] = [
  {
    title: "My Profile",
    href: Routes.PROFILE,
    label: "",
    icon: SquareUserRoundIcon,
    //variant: "default",
  },
  {
    title: "Announcements",
    href: Routes.ANNOUNCEMENTS,
    label: "",
    icon: MegaphoneIcon,
    //variant: "default",
  },
  {
    title: "My Leaves",
    href: Routes.STUDENT.LEAVES,
    label: "",
    icon: TentTreeIcon,
    //variant: "default",
  },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const { isAdmin } = useUser();

  const links = commonLinks.concat(isAdmin ? adminLinks : studentLinks);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const variant = pathname.endsWith(link.href.toString())
            ? "default"
            : "ghost";
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant, size: "icon" }),
                    "h-9 w-9"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant, size: "default" }),
                "justify-start text-base"
              )}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.title}
              {link.label && (
                <span className={cn("ml-auto")}>{link.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
