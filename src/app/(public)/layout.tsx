"use client";

import Navbar from "@/components/feature/Navbar";
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

  React.useEffect(() => {
    if (user) router.push(Routes.ANNOUNCEMENTS);
  }, [user, router]);

  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}
