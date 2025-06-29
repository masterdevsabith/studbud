"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bot, UserCheck, Clock10, XCircle } from "lucide-react"; // Lucide icons

interface Student {
  s_id: string;
  name: string;
}

interface Status {
  id: number;
  created_at: string;
  from_id: string;
  status: string;
  req_id: string;
}

export default function StudyBuddy() {
  const [sId, setSId] = useState<string | null>(null);
  const [className, setClassName] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [idToNameMap, setIdToNameMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL ||
    "https://studbud-backend-server.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const validateRes = await axios.get(
          `${baseUrl}/api/v1/user/authentication/protect/validate`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const s_id = validateRes.data.user.response[0]?.s_id;
        const className = String(validateRes.data.user.response[0]?.classname);

        setSId(s_id);
        setClassName(className);

        const studentsRes = await axios.get(
          `${baseUrl}/api/v1/userByclass/${className}`
        );
        const fetchedStudents = Array.isArray(studentsRes.data)
          ? studentsRes.data
          : studentsRes.data.data;

        setStudents(fetchedStudents);

        if (s_id) {
          const statusRes = await axios.get(
            `${baseUrl}/api/v1/get/status/${s_id}`
          );
          setStatuses(statusRes.data);
        }
      } catch (err) {
        setError("Error fetching data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchNameById = async (id: string) => {
    if (idToNameMap[id]) return;

    try {
      const res = await axios.get(`${baseUrl}/api/v1/userById/${id}`);
      const name = res.data?.name || "Unknown";
      setIdToNameMap((prev) => ({ ...prev, [id]: name }));
    } catch {
      setIdToNameMap((prev) => ({ ...prev, [id]: "Unknown" }));
    }
  };

  useEffect(() => {
    const idsToFetch = statuses.flatMap((req) =>
      [req.req_id, req.from_id].filter(
        (id) => !students.find((stu) => stu.s_id === id) && !idToNameMap[id]
      )
    );
    [...new Set(idsToFetch)].forEach((id) => fetchNameById(id));
  }, [statuses, students]);

  const sendRequest = async (req_id: string) => {
    try {
      await axios.post(`${baseUrl}/api/v1/request/buddy`, {
        from_id: sId,
        req_id,
      });
      setMessage(`Request sent to ${req_id}`);
      setStatuses((prev) => [
        ...prev,
        {
          id: Date.now(),
          created_at: new Date().toISOString(),
          from_id: sId!,
          req_id,
          status: "pending",
        },
      ]);
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      setMessage(`Failed to send request to ${req_id}`);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const getRequestStatusFor = (req_id: string) =>
    statuses.find((r) => r.req_id === req_id)?.status || null;

  const myRequests = statuses.filter((req) => req.from_id === sId);

  const renderStatusIcon = (status: string) => {
    if (status === "accepted")
      return <UserCheck className="w-4 h-4 text-green-600 inline" />;
    if (status === "pending")
      return <Clock10 className="w-4 h-4 text-yellow-600 inline" />;
    return <XCircle className="w-4 h-4 text-red-600 inline" />;
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-sky-50 to-white p-8 overflow-y-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-sky-700 tracking-wide drop-shadow-md text-center">
        StudyBuddy Zone
      </h1>

      {/* AI Buddy Section */}
      <div className="bg-sky-100 p-6 rounded-2xl shadow-lg mb-10 max-w-4xl mx-auto flex items-center space-x-4">
        <Bot className="w-10 h-10 text-sky-700" />
        <div>
          <h2 className="text-xl font-semibold text-sky-800">
            Meet your AI StudyBuddy!
          </h2>
          <p className="text-gray-700 text-sm">
            Need help with questions, revisions, or study plans? Your AI buddy
            is here!
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-lg animate-pulse text-center">
          Loading classmates...
        </p>
      ) : error ? (
        <p className="bg-red-100 text-red-700 px-6 py-3 rounded-lg mb-6 max-w-4xl w-full text-center shadow-sm">
          {error}
        </p>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-10 max-w-7xl mx-auto">
          {/* Classmates */}
          <section className="flex-1 max-w-xl bg-white border border-sky-200 rounded-2xl p-8 shadow-md mb-12 md:mb-0">
            <p className="text-gray-700 mb-6 font-semibold text-lg">
              Found{" "}
              <span className="font-bold text-sky-600">{students.length}</span>{" "}
              classmates
            </p>

            {students.filter((s) => s.s_id !== sId).length === 0 ? (
              <p className="text-gray-400 italic text-center select-none">
                No classmates found other than you.
              </p>
            ) : (
              <div className="space-y-6">
                {students
                  .filter((s) => s.s_id !== sId)
                  .map((student) => {
                    const status = getRequestStatusFor(student.s_id);
                    return (
                      <div
                        key={student.s_id}
                        className="flex items-center justify-between bg-sky-50 border border-sky-300 rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                      >
                        <div>
                          <h2 className="text-xl font-semibold text-sky-800">
                            {student.name}
                          </h2>
                          {status && (
                            <p className="text-sm font-medium mt-1">
                              {renderStatusIcon(status)}{" "}
                              <span
                                className={`ml-1 ${
                                  status === "accepted"
                                    ? "text-green-600"
                                    : status === "pending"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => sendRequest(student.s_id)}
                          disabled={!!status && status !== "rejected"}
                          className={`px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg ${
                            !!status && status !== "rejected"
                              ? "bg-gray-400 cursor-not-allowed text-white"
                              : "bg-sky-600 hover:bg-sky-700 text-white"
                          }`}
                        >
                          {!!status && status !== "rejected"
                            ? "Request Sent"
                            : "Send Request"}
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </section>

          {/* My Requests */}
          <section className="flex-1 max-w-xl bg-white border border-sky-200 rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-sky-700 tracking-wide">
              My Buddy Requests
            </h2>
            {myRequests.length === 0 ? (
              <p className="text-gray-500 italic text-center">
                No buddy requests sent yet.
              </p>
            ) : (
              <div className="space-y-5">
                {myRequests.map((req) => {
                  const buddy =
                    students.find((stu) => stu.s_id === req.req_id) ||
                    undefined;
                  const name =
                    buddy?.name || idToNameMap[req.req_id] || "Loading...";

                  return (
                    <div
                      key={req.id}
                      className="flex items-center justify-between bg-sky-50 border border-sky-300 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <p className="text-lg font-semibold text-sky-800">
                          {name}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {renderStatusIcon(req.status)}{" "}
                          <span
                            className={`ml-1 ${
                              req.status === "accepted"
                                ? "text-green-600"
                                : req.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {req.status.charAt(0).toUpperCase() +
                              req.status.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {message && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-lg text-center max-w-sm w-full z-50">
          {message}
        </div>
      )}
    </section>
  );
}
