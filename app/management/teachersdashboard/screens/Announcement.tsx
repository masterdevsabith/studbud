"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherAnnouncement() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Mid-term Examination Schedule",
      status: "Published",
      description:
        "The mid-term examinations will commence from March 15th, 2024. Students are advised to prepare accordingly.",
      class: "All Classes",
      subject: "General",
      date: "3/1/2024",
    },
    {
      id: 2,
      title: "Science Fair Registration",
      status: "Published",
      description:
        "Registration for the annual science fair is now open. Deadline for submission is March 20th.",
      class: "Class 9-12",
      subject: "Science",
      date: "2/28/2024",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      status: "Draft",
      description:
        "Monthly parent-teacher meeting scheduled for March 25th. Please confirm your attendance.",
      class: "All Classes",
      subject: "General",
      date: "3/5/2024",
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  const [submit, setSubmit] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    classname: "",
  });

  // Send POST request when submit flag becomes true
  useEffect(() => {
    if (!submit) return;

    const postData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/create/announcement/post",
          {
            title: form.title,
            description: form.description,
            classname: form.classname,
          }
        );

        console.log({
          title: form.title,
          description: form.description,
          classname: Number(form.classname),
        });

        console.log("Posted successfully:", res.data);
        // You might want to reset the form or close it
        setForm({ title: "", description: "", classname: "" });
        setShowForm(false);
      } catch (error) {
        console.error("Failed to post announcement:", error);
      } finally {
        setSubmit(false); // Reset the flag
      }
    };

    postData();
  }, [submit, form]);

  return (
    <section className="w-4/5 h-screen bg-gray-100 p-6">
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
        <>
          <div className="mid mb-6">
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
              {/* Search Input */}
              <div className="flex items-center w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search announcements..."
                  className="w-full outline-none bg-transparent"
                />
              </div>

              {/* Filter by Class */}
              <button className="flex items-center text-nowrap gap-2 border border-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0015 12v5a1 1 0 01-1.447.894l-2-1A1 1 0 0111 16v-4a1 1 0 00-.293-.707L5.293 6.707A1 1 0 015 6V4z"
                  />
                </svg>
                Filter by Class
              </button>

              {/* Filter by Subject */}
              <button className="flex items-center text-nowrap gap-2 border border-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0015 12v5a1 1 0 01-1.447.894l-2-1A1 1 0 0111 16v-4a1 1 0 00-.293-.707L5.293 6.707A1 1 0 015 6V4z"
                  />
                </svg>
                Filter by Subject
              </button>
            </div>
          </div>

          <div className="bottom space-y-4">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start"
              >
                {/* Left section */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-black">
                      {item.title}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Class: {item.class} &nbsp;&nbsp; Subject: {item.subject}{" "}
                    &nbsp;&nbsp; Date: {item.date}
                  </p>
                </div>

                {/* Right actions */}
                <div className="flex items-start gap-2">
                  <button className="bg-white p-2 rounded-md border border-gray-200 hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button className="bg-white p-2 rounded-md border border-gray-200 hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showForm && (
        //add announcement form
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
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
              rows={4}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm resize-none"
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
              type="number"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
              placeholder="Eg: 9 or 10"
              value={form.classname}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, classname: e.target.value }))
              }
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
            onClick={() => setSubmit(true)}
          >
            Create
          </button>
        </div>
      )}
    </section>
  );
}
