"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const currentDate = dayjs();
const daysInMonth = currentDate.daysInMonth();
const firstDayIndex = currentDate.startOf("month").day(); // 0 = Sunday

export default function Attendance() {
  const [absentDays, setAbsentDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAttendance() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        // 1. Validate token and get s_id
        const validationRes = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/user/authentication/protect/validate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const s_id = validationRes.data.user.response[0]?.s_id; // adjust this according to actual response

        if (!s_id) {
          setError("Invalid response: s_id not found");
          setLoading(false);
          return;
        }

        // 2. Fetch absent data
        const absRes = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/getAbsentes/${s_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const absData = absRes.data.absData;

        // 3. Extract absence days for the current month in format YYYY-MM
        const currentMonthKey = currentDate.format("YYYY-MM");

        if (absData && absData[currentMonthKey]) {
          setAbsentDays(absData[currentMonthKey]);
        } else {
          setAbsentDays([]); // no absences this month
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch attendance data.");
      }
      setLoading(false);
    }

    fetchAttendance();
  }, []);

  // build calendar weeks same as your original code
  const weeks: number[][] = [];
  let week: number[] = Array(firstDayIndex).fill(0); // initial empty slots

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    weeks.push([...week, ...Array(7 - week.length).fill(0)]);
  }

  //   if (loading) return <p className="p-6">Loading attendance...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <section className="h-full p-6 bg-white">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-left">
        {currentDate.format("MMMM YYYY")} Attendance
      </h2>

      <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-sm text-sky-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {weeks.flat().map((day, index) => (
          <div
            key={index}
            className={`h-14 flex items-center justify-center rounded-lg text-lg
              ${
                day === 0
                  ? ""
                  : absentDays.includes(day)
                  ? "bg-red-200 text-red-800 font-bold"
                  : "bg-stone-200 text-gray-700 shadow-sm"
              }
            `}
          >
            {day === 0 ? "" : day}
          </div>
        ))}
      </div>
    </section>
  );
}
