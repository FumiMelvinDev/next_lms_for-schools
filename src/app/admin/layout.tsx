import AdminNav from "@/components/AdminNav";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <AdminNav />
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
