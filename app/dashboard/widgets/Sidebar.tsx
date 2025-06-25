"use client";

import Image from "next/image";
import { Tabs } from "@/app/types";
import { useState } from "react";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MessagesSquare,
  BookOpenText,
  BookCheck,
  Layers,
} from "lucide-react";

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
      icon: HomeIcon,
    },
    {
      tabName: "Fourm",
      path: "/dashboard/screens/fourm",
      icon: MessagesSquare,
    },
    {
      tabName: "Homework",
      path: "/dashboard/screens/homework",
      icon: BookOpenText,
    },
    {
      tabName: "Exam",
      path: "/dashboard/home",
      icon: BookCheck,
    },
    {
      tabName: "Flashcards",
      path: "/dashboard/screens/flashcard",
      icon: Layers,
    },
  ];

  const handlePath = (path: any) => {
    window.open(path, "_self");
  };

  return (
    <section className="h-screen  very-dark p-0">
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
            const Icon = tab.icon;
            return (
              <div key={index}>
                <button
                  className={`w-full py-3 font-medium flex items-center justify-start px-16  ${
                    isActive
                      ? "bg-gray-200 text-black border-l-6 border-sky-500"
                      : "slightly-dark text-white "
                  } hover:bg-gray-100 transition-colors duration-300 `}
                  onClick={() => handlePath(tab.path)}
                >
                  <Icon
                    size={20}
                    className={`mr-5  ${
                      isActive ? "text-sky-500" : "text-white"
                    }`}
                  />
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
