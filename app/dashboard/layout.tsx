import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="flex">{children}</main>
    </div>
  );
}
