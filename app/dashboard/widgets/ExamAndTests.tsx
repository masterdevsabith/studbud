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

export default function ExamAndTests() {
  const [exams, setExams] = useState([]);

  // 🔁 Fetch function (defined outside useEffect)
  const fetchExams = async () => {
    try {
      const res = await axios.get(
        "https://studbud-backend-server.onrender.com/api/v1/get/exam/12"
      );
      setExams(res.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
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
