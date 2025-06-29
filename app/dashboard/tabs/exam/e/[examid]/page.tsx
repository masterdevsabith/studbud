"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FileQuestion,
  ChevronLeft,
  ChevronRight,
  Send,
  TimerReset,
  AlertTriangle,
  GraduationCap,
  BookOpen,
  Hourglass,
} from "lucide-react";

interface ExamData {
  title: string;
  classname: string;
  subject: string;
  duration: number;
  question: {
    normalQuestions: Record<string, string>;
    multiplechoice: Record<
      string,
      {
        question: string;
        choice1: string;
        choice2: string;
        choice3: string;
        choice4: string;
      }
    >;
  };
}

interface AnswerState {
  [questionId: string]: string;
}

interface QuestionData {
  id: string;
  type: "normal" | "mcq";
  question: string;
  options?: Record<string, string>;
}

export default function ExamPage() {
  const params = useParams();
  const examid = params.examid;
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [loading, setLoading] = useState(true);
  const [s_id, setSId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [cheatWarn, setCheatWarn] = useState(false);
  const [tabSwitched, setTabSwitched] = useState(false);

  useEffect(() => {
    const enterFullscreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setCheatWarn(true);
        setTabSwitched(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    enterFullscreen();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(
          "https://studbud-backend-server.onrender.com/api/v1/get/exam/12"
        );
        const foundExam = res.data.find((exam: any) => exam.examId === examid);
        setExamData(foundExam);

        const normal = Object.entries(
          foundExam?.question?.normalQuestions || {}
        ).map(([id, q]) => ({
          id,
          type: "normal",
          question: q,
        }));
        const mcq = Object.entries(
          foundExam?.question?.multiplechoice || {}
        ).map(([id, q]) => ({
          id,
          type: "mcq",
          question: q.question,
          options: {
            choice1: q.choice1,
            choice2: q.choice2,
            choice3: q.choice3,
            choice4: q.choice4,
          },
        }));

        setAllQuestions([...normal, ...mcq]);
        setTimeLeft(foundExam.duration * 60);
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
    };

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const validateRes = await axios.get(
          "https://studbud-backend-server.onrender.com/api/v1/user/authentication/protect/validate",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const s_id = validateRes.data.user.response[0]?.s_id;
        setSId(s_id);
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (examid) {
      fetchExam();
      fetchData();
    }
  }, [examid]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleAutoSubmit = async () => {
    if (!s_id || !examid) return;

    const statusPayload = [
      {
        [s_id]: {
          answers,
          start_time: new Date().toISOString(),
          tabSwitched,
        },
      },
    ];

    try {
      await axios.post(
        "https://studbud-backend-server.onrender.com/api/v1/insert/exam/status",
        {
          examid,
          status: statusPayload,
        }
      );
      alert("⌛ Time's up! Exam auto-submitted.");
    } catch {
      alert("❌ Failed to auto-submit.");
    }
  };

  const handleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleAutoSubmit();
  };

  const currentQuestion = allQuestions[currentIndex];
  const total = allQuestions.length;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading || !examData || allQuestions.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your exam...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-10 flex gap-6">
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-blue-600" />
              {examData.title}
            </h1>
            <div className="text-sm text-gray-600 mt-1 flex gap-4">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" /> {examData.classname}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> {examData.subject}
              </span>
              <span className="flex items-center gap-1">
                <Hourglass className="w-4 h-4" /> {examData.duration} mins
              </span>
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <TimerReset className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentQuestion && (
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Q{currentIndex + 1}. {currentQuestion.question}
              </label>
              {currentQuestion.type === "normal" ? (
                <textarea
                  required
                  rows={4}
                  className="w-full border border-gray-300 px-4 py-3 rounded-md"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleChange(currentQuestion.id, e.target.value)
                  }
                />
              ) : (
                <div className="space-y-2">
                  {Object.entries(currentQuestion.options!).map(
                    ([key, val]) => (
                      <label key={key} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={key}
                          checked={answers[currentQuestion.id] === key}
                          onChange={(e) =>
                            handleChange(currentQuestion.id, e.target.value)
                          }
                          className="accent-blue-600 w-5 h-5"
                        />
                        <span className="text-gray-700">{val}</span>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentIndex === 0
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4 inline" /> Previous
            </button>
            {currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => Math.min(prev + 1, total - 1))
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next <ChevronRight className="w-4 h-4 inline" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md flex gap-2 items-center"
              >
                <Send className="w-4 h-4" /> Submit
              </button>
            )}
          </div>
        </form>

        {cheatWarn && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 mt-4 rounded-md flex gap-2 items-center text-sm">
            <AlertTriangle className="w-5 h-5" />
            Tab switching recorded
          </div>
        )}
      </div>

      <div className="w-40 bg-white rounded-xl shadow p-4 h-fit sticky top-6">
        <h2 className="font-semibold mb-4 text-gray-700 text-sm text-center">
          Question Map
        </h2>
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {allQuestions.map((q, idx) => {
            const isAnswered = answers[q.id];
            const isCurrent = idx === currentIndex;
            const bubbleClass = isCurrent
              ? "bg-yellow-400 text-white"
              : isAnswered
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800";

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center ${bubbleClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div className="text-xs mt-4 text-gray-600 space-y-1">
          <p>
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Answered
          </p>
          <p>
            <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
            Skipped
          </p>
          <p>
            <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
            Current
          </p>
        </div>
      </div>
    </div>
  );
}
