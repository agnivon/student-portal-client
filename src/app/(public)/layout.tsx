"use client";

import { Routes } from "@/constants/routes.constants";
import useUser from "@/hooks/user/useUser";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();

  const router = useRouter();

  if (user) router.push(Routes.ANNOUNCEMENTS);

  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}
