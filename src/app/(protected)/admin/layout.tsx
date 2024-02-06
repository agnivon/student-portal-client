"use client";

import useUser from "@/hooks/user/useUser";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useUser();

  return isAdmin ? children : null;
}
