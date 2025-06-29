"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bot, UserCheck, Clock10, XCircle } from "lucide-react";

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
  const [outStatuses, setOutStatuses] = useState<Status[]>([]);
  const [inStatuses, setInStatuses] = useState<Status[]>([]);
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
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const validateRes = await axios.get(
          `${baseUrl}/api/v1/user/authentication/protect/validate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const s_id = validateRes.data.user.response[0]?.s_id;
        const className = String(validateRes.data.user.response[0]?.classname);
        setSId(s_id);
        setClassName(className);

        const studentsRes = await axios.get(
          `${baseUrl}/api/v1/userByclass/${className}`
        );
        setStudents(studentsRes.data);

        const outRes = await axios.get(
          `${baseUrl}/api/v1/get/statusFrom/${s_id}`
        );
        setOutStatuses(outRes.data);

        const inRes = await axios.get(
          `${baseUrl}/api/v1/get/statusReq/${s_id}`
        );
        setInStatuses(inRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
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
      const name = res.data?.name || res.data?.data?.name || "Unknown";
      setIdToNameMap((prev) => ({ ...prev, [id]: name }));
    } catch {
      setIdToNameMap((prev) => ({ ...prev, [id]: "Unknown" }));
    }
  };

  useEffect(() => {
    const allIds = [...outStatuses, ...inStatuses].flatMap((s) => [
      s.from_id,
      s.req_id,
    ]);
    [...new Set(allIds)].forEach(fetchNameById);
  }, [outStatuses, inStatuses]);

  const renderIcon = (status: string) => {
    const clean = status.trim();
    if (clean === "accepted")
      return <UserCheck className="w-4 h-4 text-green-600 inline" />;
    if (clean === "pending")
      return <Clock10 className="w-4 h-4 text-yellow-600 inline" />;
    return <XCircle className="w-4 h-4 text-red-600 inline" />;
  };

  const sendRequest = async (req_id: string) => {
    try {
      await axios.post(`${baseUrl}/api/v1/request/buddy`, {
        from_id: sId,
        req_id,
      });
      setOutStatuses((prev) => [
        ...prev,
        {
          id: Date.now(),
          created_at: new Date().toISOString(),
          from_id: sId!,
          req_id,
          status: "pending",
        },
      ]);
      setMessage("Request sent!");
    } catch {
      setMessage("Failed to send request.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleIncoming = async (
    from_id: string,
    action: "accept" | "reject"
  ) => {
    try {
      await axios.post(`${baseUrl}/api/v1/${action}/buddy`, {
        from_id,
        to_id: sId,
      });
      setInStatuses((prev) =>
        prev.map((req) =>
          req.from_id === from_id ? { ...req, status: action } : req
        )
      );
      setMessage(`Request ${action}ed.`);
    } catch {
      setMessage("Action failed.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const getStatus = (req_id: string) =>
    outStatuses.find((r) => r.req_id === req_id)?.status?.trim();

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6">
      <h1 className="text-center text-4xl font-bold text-sky-700 mb-10">
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
            Ask questions, get help, or study smarter with AI!
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Classmates */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">
              Classmates
            </h2>
            {students
              .filter((s) => s.s_id !== sId)
              .map((stu) => {
                const status = getStatus(stu.s_id);
                return (
                  <div
                    key={stu.s_id}
                    className="flex justify-between items-center p-4 bg-sky-50 border border-sky-200 rounded-xl mb-4"
                  >
                    <div>
                      <p className="font-semibold text-sky-800">{stu.name}</p>
                      {status && (
                        <p className="text-sm">
                          {renderIcon(status)}{" "}
                          <span
                            className={`ml-1 ${
                              status === "accepted"
                                ? "text-green-600"
                                : status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </p>
                      )}
                    </div>
                    <button
                      disabled={!!status && status !== "rejected"}
                      onClick={() => sendRequest(stu.s_id)}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        !!status && status !== "rejected"
                          ? "bg-gray-400 text-white cursor-not-allowed"
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
          </section>

          {/* Buddy Requests */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-sky-700">
                Incoming Requests
              </h2>
              {inStatuses.length === 0 ? (
                <p className="text-gray-500 italic">No incoming requests</p>
              ) : (
                inStatuses.map((req) => (
                  <div
                    key={req.id}
                    className="flex justify-between items-center p-4 bg-sky-50 border border-sky-200 rounded-xl mb-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {idToNameMap[req.from_id] || "Loading..."}
                      </p>
                      <p className="text-sm">
                        {renderIcon(req.status)}{" "}
                        <span
                          className={`ml-1 ${
                            req.status.trim() === "accepted"
                              ? "text-green-600"
                              : req.status.trim() === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {req.status.trim()}
                        </span>
                      </p>
                    </div>
                    {req.status.trim() === "pending" && (
                      <div className="space-x-2">
                        <button
                          onClick={() => handleIncoming(req.from_id, "accept")}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleIncoming(req.from_id, "reject")}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-sky-700">
                Outgoing Requests
              </h2>
              {outStatuses.length === 0 ? (
                <p className="text-gray-500 italic">No requests sent</p>
              ) : (
                outStatuses.map((req) => (
                  <div
                    key={req.id}
                    className="flex justify-between items-center p-4 bg-sky-50 border border-sky-200 rounded-xl mb-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {idToNameMap[req.req_id] || "Loading..."}
                      </p>
                      <p className="text-sm">
                        {renderIcon(req.status)}{" "}
                        <span
                          className={`ml-1 ${
                            req.status.trim() === "accepted"
                              ? "text-green-600"
                              : req.status.trim() === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {req.status.trim()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
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
