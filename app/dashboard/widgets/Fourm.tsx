"use client";

import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FourmScreen() {
  const [activeTab, setActiveTab] = useState("Discussions");
  const tabs = ["Announcement", "Discussions", "Files"];
  const [classname, setClassname] = useState();
  const [announcement, setAnnouncement] = useState<any>();
  const [discussion, setDiscussion] = useState<any>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/user/authentication/protect/validate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassname(res.data.user.response[0]?.classname);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (!classname) return;

    const fetchDiscussionAndAnnouncement = async () => {
      try {
        const [annRes, disRes] = await Promise.all([
          axios.get(
            `${
              process.env.APP_BASE_URL ||
              "https://studbud-backend-server.onrender.com"
            }/api/v1/get/fourm/post/${classname}`
          ),
          axios.get(
            `${
              process.env.APP_BASE_URL ||
              "https://studbud-backend-server.onrender.com"
            }/api/v1/get/announcement/post/${classname}`
          ),
        ]);
        setAnnouncement(annRes.data);
        setDiscussion(disRes.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDiscussionAndAnnouncement();
  }, [classname]);

  return (
    <section className="forum p-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          {activeTab === "Announcement" && "📢 Announcements"}
          {activeTab === "Discussions" && "💬 Class Discussions"}
          {activeTab === "Files" && "📁 Shared Files"}
        </h2>
        <Link
          href="#"
          className="bg-sky-600 hover:bg-sky-700 transition text-white font-semibold px-4 py-2 rounded-md shadow"
        >
          + New Post
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-center bg-gray-100 p-1 rounded-lg mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "w-full py-2 px-4 text-sm font-medium transition rounded-md",
              activeTab === tab
                ? "bg-white text-sky-600 shadow-sm"
                : "text-gray-600 hover:text-sky-500"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Announcements */}
      {activeTab === "Announcement" && (
        <div className="grid gap-4">
          {announcement?.map((announcements: any) => (
            <div
              key={announcements.id}
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1 text-sm text-gray-500">
                <span>🧑‍🏫 {announcements.user || "Anonymous"}</span>
                <span>{new Date(announcements.created_at).toDateString()}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">
                {announcements.title}
              </h3>
              <p className="text-gray-700">{announcements.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Discussions */}
      {activeTab === "Discussions" && (
        <div className="space-y-5">
          {discussion?.map((discussions: any) => (
            <div
              key={discussions.id}
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition flex items-start gap-4"
            >
              <div className="shrink-0">
                <div className="bg-sky-100 text-sky-600 p-3 rounded-full">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <span>{discussions.user || "Anonymous"}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(discussions.timeAgo).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {discussions.title}
                </h4>
                <p className="text-gray-600 mb-3">
                  {discussions.message || "Hi"}
                </p>
                <div className="flex items-center text-sm text-sky-600 gap-6">
                  <span className="flex items-center gap-1">
                    💬 {discussions.replies || "Hello"} replies
                  </span>
                  <Link
                    href="#"
                    className="hover:underline text-sky-600 font-medium"
                  >
                    Join Discussion →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Files */}
      {activeTab === "Files" && (
        <div className="bg-white p-6 rounded-xl shadow border text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            📁 Shared Files
          </h3>
          <p className="text-gray-500">No files shared yet.</p>
        </div>
      )}
    </section>
  );
}
