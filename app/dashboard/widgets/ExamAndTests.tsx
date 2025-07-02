"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  PlayCircle,
} from "lucide-react";
import { SubFinder } from "@/app/utils/Subdomainfinder";

export default function ExamAndTests() {
  const [exams, setExams] = useState([]);
  const [classname, setClassname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!classname) return;

    const fetchExams = async () => {
      try {
        const hostname = window.location.hostname;

        const parts = hostname.split(".");

        const subdomain = parts[0];

        const res = await axios.get(
          `https://studbud-backend-server.onrender.com/api/v1/get/exam/${classname}/${subdomain}`
        );
        setExams(res.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, [classname]);

  return (
    <section className="p-6 bg-gray-100 min-h-screen sm:ml-18 lg:ml-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Exams & Tests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => {
          const totalQuestions =
            Object.keys(exam.question?.normalQuestions || {}).length +
            Object.keys(exam.question?.multiplechoice || {}).length;

          return (
            <div
              key={exam.id}
              className="flex flex-col justify-between p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {exam.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Class {exam.classname}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{exam.subject}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {new Date(exam.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration} minutes</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {totalQuestions} questions
                </p>
              </div>

              {/* Start Exam Button */}
              <Link href={`/dashboard/tabs/exam/e/${exam.examId}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Start
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
