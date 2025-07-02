"use client";

import { useEffect } from "react";
import MainSection from "./widgets/MainSection";
import Sidebar from "./widgets/Sidebar";
import Task from "./widgets/Task";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ProgressSidebar from "./widgets/Progress";

type jwtPayload = {
  exp?: number;
  [key: string]: any;
};
export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const { exp } = jwtDecode<jwtPayload>(token || "");
    if (!token) {
      router.push("/auth/login");
      if (exp && Date.now() < exp) {
        router.push("/auth/login");
      }
    }
  });

  return (
    <main className="h-screen flex overflow-hidden scrollbar-hide">
      <div className="border-r bg-white">
        <Sidebar />
      </div>
      <div className="w-full overflow-y-auto">
        <MainSection />
      </div>

      <div className="sm:w-0 lg:w-84 border-l bg-white">
        <ProgressSidebar />
      </div>
    </main>
  );
}
