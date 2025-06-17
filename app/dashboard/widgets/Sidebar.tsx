"use client";

import Image from "next/image";
import { Tabs } from "@/app/types";
import { useState } from "react";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface Active {
  activeTab: string;
}

export default function Sidebar() {
  const [isActive, setIsactive] = useState();
  const pathname = usePathname();
  const tabs: Tabs[] = [
    {
      tabName: "Dashboard",
      path: "/dashboard/",
      icon: "",
    },
    {
      tabName: "Fourm",
      path: "/dashboard/screens/fourm",
      icon: "",
    },
    {
      tabName: "Homework",
      path: "/dashboard/screens/homework",
      icon: "",
    },
    {
      tabName: "Exam",
      path: "/dashboard/home",
      icon: "",
    },
  ];

  const handlePath = (path: any) => {
    window.open(path, "_self");
  };

  return (
    <section className="h-screen bg-blue-600 p-0">
      <div>
        <h3 className="flex justify-center pt-6">
          <Image
            src="/assets/logo-temp.png"
            alt="logo"
            width={200}
            height={100}
          />
        </h3>
        <div className="pt-6">
          {tabs.map((tab, index) => {
            const isActive =
              pathname === tab.path || pathname === tab.path.replace(/\/$/, "");
            return (
              <div key={index}>
                <button
                  className={`w-full py-3 font-medium  ${
                    isActive ? "bg-white text-black" : "bg-blue-400 text-white"
                  } hover:bg-blue-300 transition-colors duration-300 `}
                  onClick={() => handlePath(tab.path)}
                >
                  {tab.tabName}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
