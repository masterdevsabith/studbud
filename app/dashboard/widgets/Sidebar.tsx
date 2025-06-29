"use client";

import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MessagesSquare,
  BookOpenText,
  BookCheck,
  Layers,
  LogOutIcon,
  CalendarCheck2,
  ClipboardList,
  BarChart,
  Settings,
  Box,
  User,
  ZoomOut,
  Video,
} from "lucide-react";

export interface Tabs {
  tabName: string;
  path: string;
  icon: any;
  section?: string;
}

export default function Sidebar() {
  const pathname = usePathname();

  const tabs: Tabs[] = [
    {
      tabName: "Dashboard",
      path: "/dashboard",
      icon: HomeIcon,
      section: "Main",
    },
    {
      tabName: "Announcement",
      path: "/dashboard/tabs/fourm",
      icon: MessagesSquare,
    },
    {
      tabName: "Homework",
      path: "/dashboard/tabs/homework",
      icon: BookOpenText,
    },
    {
      tabName: "Exam & Tests",
      path: "/dashboard/home",
      icon: BookCheck,
      section: "Academic",
    },
    // {
    //   tabName: "Timetable",
    //   path: "/dashboard/tabs/timetable",
    //   icon: CalendarCheck2,
    // },
    {
      tabName: "Attendance",
      path: "/dashboard/tabs/attendance",
      icon: ClipboardList,
    },
    { tabName: "Flashcards", path: "/dashboard/tabs/flashcard", icon: Box },
    { tabName: "Study Buddy", path: "/dashboard/tabs/studybuddy", icon: User },
    { tabName: "Meeting", path: "/dashboard/tabs/meet", icon: Video },
    // {
    //   tabName: "Settings",
    //   path: "/dashboard/settings",
    //   icon: Settings,
    //   section: "System",
    // },
  ];

  const handlePath = (path: string) => {
    window.open(path, "_self");
  };

  const groupedTabs = tabs.reduce((acc: Record<string, Tabs[]>, tab) => {
    const group = tab.section || "Other";
    acc[group] = acc[group] || [];
    acc[group].push(tab);
    return acc;
  }, {});

  return (
    <section className="h-screen pl-2 sidebar bg-white border-r shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="py-6 border-b mb-6">
        <h2 className="text-4xl font-bold text-sky-600 tracking-tight text-center">
          StudBud
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-auto">
        {Object.entries(groupedTabs).map(([section, groupTabs], i) => (
          <div key={i} className="mb-4">
            <h3 className="text-gray-500 text-xs uppercase px-6 mb-2 font-semibold tracking-wider">
              {section}
            </h3>
            {groupTabs.map((tab, index) => {
              const isActive =
                pathname === tab.path ||
                pathname === tab.path.replace(/\/$/, "");
              const Icon = tab.icon;

              return (
                <button
                  key={index}
                  onClick={() => handlePath(tab.path)}
                  className={`w-full mb-1 flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all rounded-xl ${
                    isActive
                      ? "bg-sky-100 text-sky-700"
                      : "text-gray-700 hover:bg-sky-200"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`${isActive ? "text-sky-500" : "text-gray-500"}`}
                  />
                  {tab.tabName}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t p-6">
        <button
          className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition"
          onClick={() => alert("Logging out...")}
        >
          <LogOutIcon size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </section>
  );
}
