"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Homework = {
  id: number;
  created_at: string;
  title: string;
  duration: number;
  question: string;
  classname: number;
};

export default function TeacherHomework() {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [form, setForm] = useState({
    title: "",
    question: "",
    duration: "",
    classname: "",
  });

  const fetchHomework = async () => {
    try {
      const res = await axios.get(
        "https://studbud-backend-server.onrender.com/api/v1/get/homework/12"
      );
      setHomeworks(res.data);
    } catch (err) {
      console.error("Error fetching homework:", err);
    }
  };

  useEffect(() => {
    fetchHomework();
  }, []);

  useEffect(() => {
    if (!submit) return;

    const postHomework = async () => {
      try {
        const res = await axios.post(
          "https://studbud-backend-server.onrender.com/api/v1/homework/postHomework",
          {
            title: form.title,
            question: form.question,
            duration: Number(form.duration),
            classname: Number(form.classname),
          }
        );
        console.log("Posted homework:", res.data);
        setForm({ title: "", question: "", duration: "", classname: "" });
        setShowForm(false);
        fetchHomework(); // Refresh list
      } catch (err) {
        console.error("Error posting homework:", err);
      } finally {
        setSubmit(false);
      }
    };

    postHomework();
  }, [submit]);

  return (
    <section className="w-4/5 h-screen bg-gray-100 p-6 overflow-y-scroll">
      <div className="top flex items-center justify-between mb-6">
        <div className="left">
          <h2 className="text-2xl font-black text-black">Homework</h2>
          <p className="text-gray-600">
            Manage assignments and track student submissions.
          </p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <span className="text-lg">＋</span>
          Add New Homework
        </button>
      </div>

      {!showForm ? (
        <div className="bottom space-y-4">
          {homeworks.map((hw) => (
            <div
              key={hw.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-black">
                      {`Class ${hw.classname} - ${hw.title}`}
                    </h3>
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{hw.question}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Duration: {hw.duration} mins
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Posted on: {new Date(hw.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-md border border-gray-200 hover:bg-gray-50">
                    ✏️
                  </button>
                  <button className="p-2 rounded-md border border-gray-200 hover:bg-gray-50">
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form className="bg-white p-6 rounded-lg shadow space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm"
              placeholder="Enter homework title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question / Description
            </label>
            <textarea
              required
              className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm resize-none"
              placeholder="Homework question or task"
              value={form.question}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, question: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (in mins)
              </label>
              <input
                type="number"
                required
                className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm"
                placeholder="Eg: 30"
                value={form.duration}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, duration: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <input
                type="number"
                required
                className="w-full border text-gray-950 border-gray-300 px-4 py-2 rounded-md text-sm"
                placeholder="Eg: 9 or 10"
                value={form.classname}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, classname: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="text-gray-600 hover:underline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
              onClick={() => setSubmit(true)}
            >
              Submit Homework
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
