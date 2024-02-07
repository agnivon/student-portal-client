"use client";

import { useLogoutMutation } from "@/redux/toolkit/query/services/student.portal";
import React from "react";
import { toast } from "sonner";

export default function LogoutPage() {
  const [logout] = useLogoutMutation();

  React.useEffect(() => {
    const toastId = toast.loading("Logging out...");
    logout(undefined)
      .unwrap()
      .then(() => toast.success("Logout successful", { id: toastId }))
      .catch((err) =>
        toast.error((err as { data: string })?.data, { id: toastId })
      );
  }, [logout]);
}
