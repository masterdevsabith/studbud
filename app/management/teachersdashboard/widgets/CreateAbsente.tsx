"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface Student {
  s_id: string;
  name: string;
  admNo: string;
}

export default function AttendanceMarkPage() {
  const [classes, setClasses] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [absentees, setAbsentees] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const today = dayjs();
  const currentMonthKey = today.format("YYYY-MM");
  const currentDay = today.date();

  useEffect(() => {
    if (!selectedClass) return;

    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://studbud-backend-server.onrender.com/api/v1/userByclass/${selectedClass}`
        );
        console.log("Fetched students:", res.data[0]); // DEBUG
        setStudents([res.data[0]]);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setStudents([]);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [selectedClass]);

  const toggleAbsentee = (s_id: string) => {
    setAbsentees((prev) => {
      const copy = new Set(prev);
      if (copy.has(s_id)) {
        copy.delete(s_id);
      } else {
        copy.add(s_id);
      }
      return copy;
    });
  };

  const handleSubmit = async () => {
    if (!selectedClass || absentees.size === 0) {
      alert("Select a class and mark at least one absentee.");
      return;
    }

    try {
      const promises = Array.from(absentees).map((s_id) =>
        axios.post(
          "https://studbud-backend-server.onrender.com/api/v1/markabsentees",
          {
            s_id,
            newDaysByMonth: {
              [currentMonthKey]: [currentDay],
            },
          }
        )
      );

      await Promise.all(promises);
      setSubmitMessage("Attendance submitted successfully.");
      setAbsentees(new Set());
    } catch (err: any) {
      console.error(err);
      setSubmitMessage(
        "Error: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <section className="p-6 h-screen bg-white w-full text-neutral-800">
      <h1 className="text-3xl font-bold mb-6 text-sky-700">Mark Absentees</h1>

      <div className="mb-6 max-w-sm">
        <label
          htmlFor="classSelect"
          className="block mb-2 font-semibold text-gray-700"
        >
          Select Class
        </label>
        <select
          id="classSelect"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Choose Class --</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <>
          {students.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {students.map((student) => {
                  const isAbsent = absentees.has(student?.s_id);

                  return (
                    <div
                      key={student?.s_id}
                      onClick={() => toggleAbsentee(student?.s_id)}
                      className={`cursor-pointer flex items-center justify-between p-4 rounded shadow transition-all duration-150 ${
                        isAbsent
                          ? "bg-red-100 border border-red-500"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {student?.name}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        readOnly
                        checked={isAbsent}
                        className="w-5 h-5 accent-red-600"
                      />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleSubmit}
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 font-semibold"
              >
                Submit Absentees
              </button>
              {submitMessage && (
                <p className="mt-4 text-green-700 font-medium">
                  {submitMessage}
                </p>
              )}
            </>
          ) : selectedClass ? (
            <p className="text-gray-600">
              No students found in {selectedClass}.
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
