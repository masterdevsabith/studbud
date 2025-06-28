"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Play, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import axios from "axios";

interface HomeworkItem {
  hwId: number;
  title: string;
  description: string;
  classname: string;
  subject: string;
  duration: string; // in minutes (as string)
  status: Record<string, "completed" | "notcompleted">;
}

export default function Homework() {
  const [classname, setClassname] = useState<number | null>(null);
  const [sId, setSId] = useState<string>("");
  const [homework, setHomework] = useState<HomeworkItem[] | null>(null);

  const [activeHomework, setActiveHomework] = useState<Record<number, boolean>>(
    {}
  );
  const [countdowns, setCountdowns] = useState<Record<number, number>>({});

  // Get student info
  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/user/authentication/protect/validate`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const user = res.data.user.response[0];
        setSId(user?.s_id || "");
        setClassname(user?.classname || null);
      } catch (e) {
        console.error("Failed to fetch user info", e);
      }
    };
    getUserInfo();
  }, []);

  // Fetch homework
  useEffect(() => {
    if (!classname) return;
    const fetchHomework = async () => {
      try {
        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/get/homework/${classname}`
        );
        setHomework(res.data);
      } catch (e) {
        console.error("Failed to fetch homework", e);
      }
    };
    fetchHomework();
  }, [classname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev };
        for (const id in updated) {
          if (updated[id] > 0) {
            updated[id] -= 1;
          }
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startHomework = (hwId: number, durationMinutes: string) => {
    const seconds = parseInt(durationMinutes) * 60;
    setActiveHomework((prev) => ({ ...prev, [hwId]: true }));
    setCountdowns((prev) => ({ ...prev, [hwId]: seconds }));
  };

  const markAsCompleted = async (homeworkId: number, duration: string) => {
    try {
      const token = localStorage.getItem("token");

      const statusPayload = {
        s_id: sId,
        duration: parseInt(duration),
        startedAt: new Date().toISOString(),
      };

      await axios.post(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/api/v1/update/hwstatus`,
        {
          hwId: homeworkId,
          status: statusPayload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHomework(
        (prev) =>
          prev?.map((hw) =>
            hw.hwId === homeworkId
              ? {
                  ...hw,
                  status: {
                    ...hw.status,
                    [sId]: "completed",
                  },
                }
              : hw
          ) || []
      );
    } catch (e) {
      console.error("Failed to update homework status", e);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-4xl font-bold text-black mb-6">Home Work</h2>

      {homework && homework.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {homework.map((hw) => {
            const secondsLeft = countdowns[hw.hwId] || 0;
            const isRunning = activeHomework[hw.hwId];
            const isCompleted = hw.status?.some((entry) => entry.s_id === sId);

            return (
              <Card
                key={hw.hwId}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-sky-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {hw.title}
                    </h3>
                    <span className="text-sm text-sky-600 font-medium bg-sky-100 px-2 py-1 rounded">
                      {hw.subject}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    #{hw.classname}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{hw.description}</p>

                <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Estimated Duration: {hw.duration} mins</span>
                  </div>

                  {isRunning && !isCompleted && (
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <Clock size={16} />
                      Time Left: {formatTime(secondsLeft)}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {isCompleted ? (
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded text-center font-medium flex items-center justify-center gap-2">
                    <CheckCircle size={20} /> Completed
                  </div>
                ) : isRunning ? (
                  secondsLeft > 0 ? (
                    <Button
                      onClick={() => markAsCompleted(hw.hwId, hw.duration)}
                      className="bg-green-600 hover:bg-green-700 w-full flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} /> Mark as Read
                    </Button>
                  ) : (
                    <div className="bg-red-100 text-red-800 px-3 py-2 rounded text-center font-medium">
                      Time Over!
                    </div>
                  )
                ) : (
                  <Button
                    onClick={() => startHomework(hw.hwId, hw.duration)}
                    className="bg-sky-500 hover:bg-sky-600 w-full flex items-center justify-center gap-2"
                  >
                    <Play size={18} /> Start
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No homework available.</p>
      )}
    </div>
  );
}
