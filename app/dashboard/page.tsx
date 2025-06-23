"use client";

import { useEffect } from "react";
import MainSection from "./widgets/MainSection";
import Sidebar from "./widgets/Sidebar";
import Task from "./widgets/Task";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

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
    <main className="h-screen flex overflow-y-hidden">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-3/5">
        <MainSection />
      </div>
      <div className="w-1/5 ">
        <Task />
      </div>
    </main>
  );
}
