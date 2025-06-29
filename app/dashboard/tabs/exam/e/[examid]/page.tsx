"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ExamPage() {
  const params = useParams();
  const examid = params.examid;
  const [examData, setExamData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [s_id, setSId] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(
          "https://studbud-backend-server.onrender.com/api/v1/get/exam/12"
        );
        const foundExam = res.data.find((exam) => exam.examId === examid);
        setExamData(foundExam);
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
    };

    if (examid) fetchExam();

    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        // 1. Validate token and get s_id and class
        const validateRes = await axios.get(
          " https://studbud-backend-server.onrender.com/api/v1/user/authentication/protect/validate",
          {
            headers: { Authorization: `Bearer ${token} ` },
          }
        );

        const s_id = validateRes.data.user.response[0]?.s_id;
        setSId(s_id);
      } catch (err: any) {
        setError("Error fetching data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [examid]);

  const handleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!s_id || !examid) {
      alert("Missing student ID or exam ID.");
      return;
    }

    const statusPayload = [
      {
        [s_id]: {
          answers,
          start_time: new Date().toISOString(),
        },
      },
    ];

    try {
      const res = await axios.post(
        "https://studbud-backend-server.onrender.com/api/v1/insert/exam/status",
        {
          examid,
          status: statusPayload,
        }
      );

      alert("✅ Exam submitted successfully!");
    } catch (error) {
      alert("❌ Failed to submit exam. Please try again.");
    }
  };

  if (!examData) {
    return (
      <div className="p-10 text-center text-gray-500 text-lg">
        Loading exam...
      </div>
    );
  }

  const { title, question, duration, classname, subject } = examData;
  const normalQuestions = question?.normalQuestions || {};
  const mcqs = question?.multiplechoice || {};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2 text-sm">
            🎓 <span className="font-medium">Class:</span> {classname} &nbsp; |
            &nbsp; 📘 <span className="font-medium">Subject:</span> {subject}{" "}
            &nbsp; | &nbsp; ⏳ <span className="font-medium">Duration:</span>{" "}
            {duration} mins
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Normal Questions */}
          {Object.entries(normalQuestions).map(([key, value], index) => (
            <div key={key} className="space-y-2">
              <label className="block text-lg font-medium text-gray-800">
                Q{index + 1}. {value}
              </label>
              <textarea
                required
                rows={4}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none px-4 py-3 rounded-md text-gray-700"
                placeholder="Type your answer here..."
                value={answers[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
              ></textarea>
            </div>
          ))}

          {/* MCQs */}
          {Object.entries(mcqs).map(([key, data], index) => (
            <div key={key} className="space-y-3">
              <label className="block text-lg font-medium text-gray-800">
                Q{Object.keys(normalQuestions).length + index + 1}.{" "}
                {data.question}
              </label>
              <div className="grid gap-3 pl-3">
                {["choice1", "choice2", "choice3", "choice4"].map(
                  (choiceKey, i) => (
                    <label
                      key={choiceKey}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={key}
                        value={choiceKey}
                        checked={answers[key] === choiceKey}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="accent-blue-600 w-5 h-5"
                      />
                      <span className="text-gray-700">{data[choiceKey]}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md shadow transition duration-200"
            >
              ✅ Submit Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
