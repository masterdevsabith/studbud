"use client";

import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Megaphone,
  MessageCircle,
  Folder,
  User,
  MessageSquareText,
} from "lucide-react";

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
            }/api/v1/get/announcement/post/${classname}`
          ),
          axios.get(
            `${
              process.env.APP_BASE_URL ||
              "https://studbud-backend-server.onrender.com"
            }/api/v1/get/fourm/post/${classname}`
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

  const discussionlink = `/dashboard/screens/fourm/f/${discussion?.[0]?.disid}`;
  console.log(discussionlink);
  return (
    <section
      className="p-6 max-w-5xl mx-auto"
      style={{
        backgroundColor: "var(--studbud-background)",
        color: "var(--studbud-text)",
        fontFamily: "var(--studbud-font)",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-3xl font-semibold tracking-tight flex items-center gap-2"
          style={{ color: "var(--studbud-text-header)" }}
        >
          {activeTab === "Announcement" && (
            <>
              <Megaphone className="w-6 h-6" color="var(--studbud-primary)" />
              Announcements
            </>
          )}
          {activeTab === "Discussions" && (
            <>
              <MessageCircle
                className="w-6 h-6"
                color="var(--studbud-primary)"
              />
              Class Discussions
            </>
          )}
          {activeTab === "Files" && (
            <>
              <Folder className="w-6 h-6" color="var(--studbud-primary)" />
              Shared Files
            </>
          )}
        </h2>
        <Link
          href="#"
          className="transition font-semibold px-4 py-2 rounded-md shadow"
          style={{
            backgroundColor: "var(--studbud-primary)",
            color: "#fff",
          }}
        >
          + New Post
        </Link>
      </div>

      <div
        className="flex justify-center p-1 rounded-lg mb-6"
        style={{ backgroundColor: "var(--studbud-sidebar)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "w-full py-2 px-4 text-sm font-medium transition rounded-md"
            )}
            style={{
              backgroundColor:
                activeTab === tab ? "var(--studbud-surface)" : "transparent",
              color:
                activeTab === tab
                  ? "var(--studbud-primary)"
                  : "var(--studbud-text-muted)",
              boxShadow:
                activeTab === tab ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Announcement" && (
        <div className="grid gap-4">
          {announcement?.map((ann: any) => (
            <div
              key={ann.id}
              className="p-5 rounded-xl border transition"
              style={{
                backgroundColor: "var(--studbud-surface)",
                borderColor: "var(--studbud-border)",
              }}
            >
              <div
                className="flex justify-between items-center mb-1 text-sm"
                style={{ color: "var(--studbud-text-muted)" }}
              >
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {ann.user || "Anonymous"}
                </span>
                <span>{new Date(ann.created_at).toDateString()}</span>
              </div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: "var(--studbud-text-header)" }}
              >
                {ann.title}
              </h3>
              <p style={{ color: "var(--studbud-text)" }}>{ann.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Discussions" && (
        <div className="space-y-5">
          {discussion?.map((dis: any) => (
            <div
              key={dis.id}
              className="p-5 rounded-xl border transition flex items-start gap-4"
              style={{
                backgroundColor: "var(--studbud-surface)",
                borderColor: "var(--studbud-border)",
              }}
            >
              <div className="shrink-0">
                <div
                  className="p-3 rounded-full"
                  style={{
                    backgroundColor: "var(--studbud-primary-hover)",
                    color: "#fff",
                  }}
                >
                  <User className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <div
                  className="flex items-center text-sm mb-1"
                  style={{ color: "var(--studbud-text-muted)" }}
                >
                  <span>{dis.user || "Anonymous"}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(dis.timeAgo).toLocaleDateString()}</span>
                </div>
                <h4
                  className="text-lg font-semibold mb-1"
                  style={{ color: "var(--studbud-text-header)" }}
                >
                  {dis.title}
                </h4>
                <p className="mb-3" style={{ color: "var(--studbud-text)" }}>
                  {dis.message || "Hi"}
                </p>
                <div
                  className="flex items-center text-sm gap-6"
                  style={{ color: "var(--studbud-primary)" }}
                >
                  <Link
                    href={discussionlink}
                    target="_blank"
                    className="hover:underline font-medium"
                  >
                    Join Discussion →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Files" && (
        <div
          className="p-6 rounded-xl border text-center"
          style={{
            backgroundColor: "var(--studbud-surface)",
            borderColor: "var(--studbud-border)",
          }}
        >
          <h3
            className="text-xl font-semibold mb-2 flex justify-center items-center gap-2"
            style={{ color: "var(--studbud-text-header)" }}
          >
            <Folder className="w-5 h-5" color="var(--studbud-primary)" />
            Shared Files
          </h3>
          <p style={{ color: "var(--studbud-text-muted)" }}>
            No files shared yet.
          </p>
        </div>
      )}
    </section>
  );
}
