"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Video,
  Clock,
  KeyRound,
  Link2,
  CalendarDays,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface MeetingItem {
  id: number;
  classname: number;
  join_url: string;
  start_url: string;
  meetingData: {
    topic: string;
    type: number;
    duration: number;
    password: string;
    timezone: string;
    start_time: string;
    settings: {
      waiting_room: boolean;
      join_before_host: boolean;
    };
  };
}

export default function Meeting() {
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classname, setClassname] = useState<string | null>(null);

  // Step 1: Validate token and fetch classname
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/user/authentication/protect/validate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const cls = res.data?.user?.response?.[0]?.classname;
        if (!cls) throw new Error("Classname not found");
        setClassname(cls);
      } catch (err) {
        console.error("Validation error:", err);
        setError("User validation failed.");
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  // Step 2: Fetch meetings for classname
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!classname) return;
      try {
        const hostname = window.location.hostname;

        const parts = hostname.split(".");

        const subdomain = parts[0];

        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/get/meetdata/${classname}/${subdomain}`
        );
        setMeetings(res.data || []);
      } catch (err) {
        console.error("Meeting fetch error:", err);
        setError("Failed to load meetings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [classname]);

  return (
    <section className="w-full h-screen bg-white overflow-y-auto px-6 py-10 text-neutral-900 sm:ml-18 lg:ml-0">
      <h1 className="text-3xl font-bold text-sky-700 mb-8 text-left flex gap-2">
        <Video className="w-8 h-8" /> Your Zoom Meetings
      </h1>

      {loading ? (
        <div className="flex justify-center mt-16">
          <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mt-10 flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      ) : meetings.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No meetings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 mx-auto">
          {meetings.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md p-6 transition bg-gradient-to-br from-white to-gray-50"
            >
              <h2 className="text-xl font-semibold text-sky-800 mb-2 flex items-center gap-2">
                <Video className="w-5 h-5 text-sky-600" />
                {item.meetingData.topic}
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-sky-500" />
                  <span>
                    {new Date(item.meetingData.start_time).toLocaleString(
                      "en-IN",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-500" />
                  Duration: {item.meetingData.duration} mins
                </div>

                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-sky-500" />
                  Password: {item.meetingData.password || "None"}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Link2 className="w-4 h-4 text-sky-500" />
                  <a
                    href={item.join_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
