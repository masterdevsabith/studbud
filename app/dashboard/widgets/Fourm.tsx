"use client";

import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Megaphone, MessageCircle, Folder, User, Plus, X } from "lucide-react";

export default function FourmScreen() {
  const [activeTab, setActiveTab] = useState("Discussions");
  const [classname, setClassname] = useState<string>();
  const [announcement, setAnnouncement] = useState<any[]>([]);
  const [discussion, setDiscussion] = useState<any[]>([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const tabs = ["Announcement", "Discussions"];

  useEffect(() => {
    const fetchClass = async () => {
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
        console.error(e);
      }
    };
    fetchClass();
  }, []);

  useEffect(() => {
    if (!classname) return;
    const fetchPosts = async () => {
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
        setAnnouncement(annRes.data || []);
        setDiscussion(disRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [classname]);

  const handlePost = async () => {
    if (!newTitle || !newDescription) return;
    setLoading(true);
    try {
      await axios.post(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/api/v1/create/fourm/post`,
        {
          title: newTitle,
          description: newDescription,
          classname,
        }
      );
      setNewTitle("");
      setNewDescription("");
      setShowNewPostForm(false);
      const disRes = await axios.get(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/api/v1/get/fourm/post/${classname}`
      );
      setDiscussion(disRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 h-screen overflow-y-auto bg-white text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
          {activeTab === "Announcement" && (
            <>
              <Megaphone className="w-6 h-6 text-sky-600" />
              Announcements
            </>
          )}
          {activeTab === "Discussions" && (
            <>
              <MessageCircle className="w-6 h-6 text-sky-600" />
              Class Discussions
            </>
          )}
        </h2>

        <button
          onClick={() => setShowNewPostForm((prev) => !prev)}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md shadow transition"
        >
          {showNewPostForm ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Start a New Discussion
            </>
          )}
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 justify-center mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2 rounded-full font-medium transition text-sm shadow-sm",
              activeTab === tab
                ? "bg-sky-200 text-sky-800"
                : "bg-gray-200 text-gray-500 hover:bg-sky-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FORM */}
      {showNewPostForm && (
        <div className="mb-6 p-5 rounded-lg border bg-gray-50 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            New Discussion
          </h3>
          <input
            type="text"
            placeholder="Enter a title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full mb-3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <textarea
            placeholder="Describe the topic..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={4}
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button
            onClick={handlePost}
            disabled={loading}
            className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      )}

      {/* ANNOUNCEMENTS */}
      {activeTab === "Announcement" && (
        <div className="space-y-4">
          {announcement?.map((ann) => (
            <div
              key={ann.id}
              className="p-5 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {ann.user || "Anonymous"}
                </span>
                <span>{new Date(ann.created_at).toDateString()}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {ann.title}
              </h3>
              <p className="text-gray-600">{ann.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* DISCUSSIONS */}
      {activeTab === "Discussions" && (
        <div className="space-y-5">
          {discussion?.map((dis) => (
            <div
              key={dis.id}
              className="p-5 rounded-xl border flex items-start gap-4 bg-sky-50 shadow-sm"
            >
              <div className="shrink-0">
                <div className="p-3 rounded-full bg-sky-600 text-white">
                  <User className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <span>{dis.user || "Anonymous"}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(dis.timeAgo).toLocaleDateString()}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {dis.title}
                </h4>
                <p className="mb-3 text-gray-600">
                  {dis.message || "No description provided."}
                </p>
                <Link
                  href={`/dashboard/tabs/fourm/f/${dis.disid}`}
                  target="_blank"
                  className="text-sky-600 hover:underline text-sm font-medium"
                >
                  Join Discussion →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FILES */}
      {activeTab === "Files" && (
        <div className="text-center border p-6 rounded-xl bg-gray-50 shadow-sm">
          <h3 className="text-xl font-semibold flex justify-center gap-2 text-gray-800 mb-2">
            <Folder className="w-5 h-5 text-sky-600" />
            Shared Files
          </h3>
          <p className="text-gray-500">No files shared yet.</p>
        </div>
      )}
    </section>
  );
}
