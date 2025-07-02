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
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export interface Tabs {
  tabName: string;
  path: string;
  icon: any;
  section?: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [closed, setClosed] = useState(false);

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
      path: "/dashboard/tabs/exam",
      icon: BookCheck,
      section: "Academic",
    },
    {
      tabName: "Attendance",
      path: "/dashboard/tabs/attendance",
      icon: ClipboardList,
    },
    { tabName: "Flashcards", path: "/dashboard/tabs/flashcard", icon: Box },
    { tabName: "Study Buddy", path: "/dashboard/tabs/studybuddy", icon: User },
    { tabName: "Meeting", path: "/dashboard/tabs/meet", icon: Video },
  ];

  const handlePath = (path: string) => {
    setIsOpen(false); // close sidebar on mobile
    window.open(path, "_self");
  };

  const groupedTabs = tabs.reduce((acc: Record<string, Tabs[]>, tab) => {
    const group = tab.section || "Other";
    acc[group] = acc[group] || [];
    acc[group].push(tab);
    return acc;
  }, {});

  return (
    <>
      {/* Hamburger - visible only on small screens */}
      {/* <div className="md:hidden p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold text-sky-600">StudBud</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div> */}

      {/* Sidebar */}
      <section
        className={`lg:static h-screen pl-2 sidebar bg-white border-r shadow-sm flex flex-col justify-between transition-all duration-500 ${
          closed ? "w-20" : "w-80"
        } sm:absolute top-0 left-0 sm:z-50`}
      >
        {/* Header */}
        <div className="py-6 border-b mb-6 relative flex items-center justify-center">
          <h2
            className={`text-center text-4xl font-bold text-sky-600 tracking-tight  ${
              closed ? "hidden" : ""
            }`}
          >
            StudBud
          </h2>
          <div className={`close_btn ${closed ? "hidden" : ""} `}>
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 transition"
              onClick={() => setClosed(!closed)}
            >
              <X size={24} />
            </button>
          </div>
          {closed && (
            <button
              className="text-center text-gray-500 hover:text-gray-700 transition"
              onClick={() => setClosed(!closed)}
            >
              <Menu size={24} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-auto">
          {Object.entries(groupedTabs).map(([section, groupTabs], i) => (
            <div key={i} className="mb-4">
              <h3
                className={`text-gray-500 text-xs uppercase px-6 mb-2 font-semibold tracking-wider ${
                  closed ? "hidden" : ""
                }`}
              >
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
                      className={`${
                        isActive ? "text-sky-500" : "text-gray-500"
                      }`}
                    />
                    {closed ? null : tab.tabName}

                    {/* {tab.tabName} */}
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

            <span className={`text-sm font-medium ${closed ? "hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
