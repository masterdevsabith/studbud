"use client";

import { section } from "motion/react-client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  MessagesSquare,
  BookOpenText,
  BookCheck,
  Layers,
  LogOutIcon,
} from "lucide-react";

export interface Tabs {
  tabName: string;
  path: string;
  icon: string;
}

export default function TeachersDashboard() {
  const [isActive, setIsactive] = useState();
  const pathname = usePathname();
  const tabs: Tabs[] = [
    {
      tabName: "Dashboard",
      path: "/management/teachersdashboard/",
      icon: HomeIcon,
    },
    {
      tabName: "Announcement",
      path: "/management/teachersdashboard/tabs/announcement",
      icon: MessagesSquare,
    },
    {
      tabName: "Homework",
      path: "/management/teachersdashboard/tabs/homework",
      icon: BookOpenText,
    },
    {
      tabName: "Exam & Tests",
      path: "/management/teachersdashboard/tabs/examandtests",
      icon: BookCheck,
    },
  ];

  const handlePath = (path: any) => {
    window.open(path, "_self");
  };

  return (
    <section className="h-screen w-1/5 bg-gray-50 p-3 flex flex-col ">
      <div className="top border-b-1 border-gray-500 mb-6">
        <h2 className="text-2xl text-gray-900 font-black mb-4">fundaDash</h2>
      </div>
      <div className="mid">
        {tabs.map((tab, index) => {
          const isActive =
            pathname === tab.path || pathname === tab.path.replace(/\/$/, "");
          const Icon = tab.icon;
          return (
            <div key={index} className="flex items-center justify-start">
              <button
                className={`w-full py-3 font-medium flex items-center justify-start px-4  ${
                  isActive
                    ? "bg-gray-200 text-black border-l-6 border-sky-500"
                    : " text-black "
                } hover:bg-gray-100 transition-colors duration-300 `}
                onClick={() => handlePath(tab.path)}
              >
                <Icon
                  size={20}
                  className={`mr-5  ${
                    isActive ? "text-sky-500" : "text-indigo-700"
                  }`}
                />
                {tab.tabName}
              </button>
            </div>
          );
        })}
      </div>
      <div className="bottom border-t-1 border-gray-500 ">
        <button className="text-black flex items-center justify-center py-3 px-4">
          <LogOutIcon />
          Logout
        </button>
      </div>
    </section>
  );
}
