import AuthLayout from "@/components/layouts/AuthLayout";
import SidebarLayout from "@/components/layouts/SidebarLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <SidebarLayout>{children}</SidebarLayout>
    </AuthLayout>
  );
}
