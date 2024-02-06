"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../feature/Sidebar";
import { Separator } from "../ui/separator";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] =
    React.useState<boolean>(false);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex-grow items-stretch"
    >
      <ResizablePanel
        defaultSize={15}
        collapsedSize={3}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setSidebarCollapsed(true);
        }}
        onExpand={() => {
          setSidebarCollapsed(false);
        }}
        className={cn(
          sidebarCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar isCollapsed={sidebarCollapsed} />
        {/* <Separator /> */}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80} minSize={80} className="flex flex-col">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
