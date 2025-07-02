"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherAnnouncement() {
  type Announcement = {
    id: string | number;
    title: string;
    description: string;
    classname?: string;
    created_at?: string;
  };

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    classname: "",
  });

  // 🔁 Fetch once on mount
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "https://studbud-backend-server.onrender.com/api/v1/get/announcement/post/12"
      );
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements(); // fetch once immediately

    const interval = setInterval(() => {
      console.log("Fetching announcements...");
      fetchAnnouncements();
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  // ✅ Form Submit Handler (No useEffect)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://studbud-backend-server.onrender.com/api/v1/create/announcement/post",
        {
          title: form.title,
          description: form.description,
          classname: form.classname,
        }
      );
      console.log("Posted successfully:", res.data);
      setForm({ title: "", description: "", classname: "" });
      setShowForm(false);

      await fetchAnnouncements(); // 🚨 Fetch new data immediately after post
    } catch (error) {
      console.error("Failed to post announcement:", error);
    }
  };

  return (
    <section className="w-full h-screen bg-gray-100 p-6 sm:ml-18 lg:ml-0 overflow-y-scroll">
      <div className="top flex items-center justify-between mb-6">
        <div className="left">
          <h2 className="text-2xl font-black text-black">Announcements</h2>
          <p className="text-gray-600">
            Manage and create announcements for students.
          </p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <span className="text-lg">＋</span>
          New Announcement
        </button>
      </div>

      {!showForm && (
        <div className="bottom space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-black">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mt-1">{item.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Class: {item.classname || "N/A"} &nbsp;&nbsp; Date:{" "}
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <button className="bg-white p-2 rounded-md border border-gray-200 hover:bg-gray-50">
                  ✏️
                </button>
                <button className="bg-white p-2 rounded-md border border-gray-200 hover:bg-gray-50">
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm"
              placeholder="Enter announcement title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm resize-none"
              placeholder="Enter announcement description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Name (Number)
            </label>
            <input
              required
              type="number"
              className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm"
              placeholder="Eg: 9 or 10"
              value={form.classname}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, classname: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
          >
            Create
          </button>
        </form>
      )}
    </section>
  );
}
