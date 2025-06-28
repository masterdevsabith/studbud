"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  Eye,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

export default function TeacherExam() {
  const [quizData, setQuizData] = useState([]);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [step, setStep] = useState(1);

  const [questionType, setQuestionType] = useState("normal"); // "normal" or "mcq"
  const [questions, setQuestions] = useState({
    normalQuestions: {},
    multiplechoice: {},
  });

  // Normal
  const [normalQuestion, setNormalQuestion] = useState("");

  // MCQ
  const [mcqQuestion, setMcqQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  // Test Meta
  const [testMeta, setTestMeta] = useState({
    title: "",
    class: "",
    subject: "",
    duration: "",
    time: "10:00 AM",
  });

  const addNormalQuestion = () => {
    if (normalQuestion.trim()) {
      const qCount = Object.keys(questions.normalQuestions).length + 1;
      setQuestions((prev) => ({
        ...prev,
        normalQuestions: {
          ...prev.normalQuestions,
          [`question${qCount}`]: normalQuestion.trim(),
        },
      }));
      setNormalQuestion("");
    }
  };

  const addMcqQuestion = () => {
    if (
      mcqQuestion.trim() &&
      correctIndex !== null &&
      options.every((o) => o.trim())
    ) {
      const qCount = Object.keys(questions.multiplechoice).length + 1;
      setQuestions((prev) => ({
        ...prev,
        multiplechoice: {
          ...prev.multiplechoice,
          [`question${qCount + 4}`]: {
            question: mcqQuestion.trim(),
            choice1: options[0],
            choice2: options[1],
            choice3: options[2],
            choice4: options[3],
            correct: `choice${correctIndex + 1}`,
          },
        },
      }));
      setMcqQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(null);
    }
  };

  const handlePostTest = () => {
    const newTest = {
      ...testMeta,
      quesans: questions,
    };
    setQuizData([...quizData, newTest]);
    // Reset form
    setQuestions({
      normalQuestions: {},
      multiplechoice: {},
    }); // fixed reset here
    setTestMeta({
      title: "",
      class: "",
      subject: "",
      duration: "",
      time: "10:00 AM",
    });
    setStep(1);
    setIsCreatingTest(false);
  };

  useEffect(() => {
    console.log("Quiz Data:", quizData);
  }, [quizData]);

  return (
    <section className="w-4/5 h-screen bg-gray-100 p-6 overflow-y-scroll">
      <div className="top flex items-center justify-between mb-6">
        <div className="left">
          <h2 className="text-2xl font-black text-black">Tests & Exams</h2>
          <p className="text-gray-600">
            Create and manage your tests and examinations
          </p>
        </div>
        {!isCreatingTest && (
          <button
            onClick={() => setIsCreatingTest(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md flex items-center gap-2"
          >
            ＋ Create New Test
          </button>
        )}
      </div>

      {!isCreatingTest && (
        <div className="bottom p-4 space-y-4">
          {quizData.map((quiz, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {quiz.title}
              </h2>
              <div className="text-sm text-gray-600 mt-1">
                Subject: <span className="font-medium">{quiz.subject}</span>
              </div>
              <div className="text-sm text-gray-600">
                Class: <span className="font-medium">{quiz.class}</span>
              </div>
              <div className="text-sm text-gray-600">
                Time: <span className="font-medium">{quiz.time}</span>
              </div>
              <div className="text-sm text-gray-600">
                Duration: <span className="font-medium">{quiz.duration}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {/* total questions count */}
                {Object.keys(quiz.quesans.normalQuestions).length +
                  Object.keys(quiz.quesans.multiplechoice).length}{" "}
                questions
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreatingTest && (
        <div className="form bg-white p-6 rounded-lg shadow-md space-y-4">
          {step === 1 && (
            <>
              <h3 className="text-xl font-semibold mb-2">Add Questions</h3>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setQuestionType("normal")}
                  className={`px-4 py-2 rounded ${
                    questionType === "normal"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Normal Question
                </button>
                <button
                  onClick={() => setQuestionType("mcq")}
                  className={`px-4 py-2 rounded ${
                    questionType === "mcq"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Multiple Choice Question
                </button>
              </div>

              {questionType === "normal" && (
                <div>
                  <input
                    type="text"
                    value={normalQuestion}
                    onChange={(e) => setNormalQuestion(e.target.value)}
                    placeholder="Enter normal question"
                    className="w-full border px-3 py-2 rounded mb-2"
                  />
                  <button
                    onClick={addNormalQuestion}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    + Add Question
                  </button>
                </div>
              )}

              {questionType === "mcq" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={mcqQuestion}
                    onChange={(e) => setMcqQuestion(e.target.value)}
                    placeholder="Enter MCQ question"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...options];
                          newOpts[idx] = e.target.value;
                          setOptions(newOpts);
                        }}
                        placeholder={`Option ${idx + 1}`}
                        className="flex-1 border px-3 py-2 rounded"
                      />
                      <input
                        type="radio"
                        checked={correctIndex === idx}
                        onChange={() => setCorrectIndex(idx)}
                      />
                      <span className="text-sm text-gray-500">Correct</span>
                    </div>
                  ))}
                  <button
                    onClick={addMcqQuestion}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
                  >
                    + Add Question
                  </button>
                </div>
              )}

              {/* UPDATED CONDITION: Check questions existence properly */}
              {(Object.keys(questions.normalQuestions).length > 0 ||
                Object.keys(questions.multiplechoice).length > 0) && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Questions Added:</h4>
                  <ul className="space-y-2">
                    {/* Render normal questions */}
                    {Object.entries(questions.normalQuestions).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="text-sm border p-2 rounded bg-gray-50"
                        >
                          <span>📝 {value}</span>
                        </li>
                      )
                    )}

                    {/* Render multiple choice questions */}
                    {Object.entries(questions.multiplechoice).map(
                      ([key, data]) => (
                        <li
                          key={key}
                          className="text-sm border p-2 rounded bg-gray-50"
                        >
                          <p>🔢 {data.question}</p>
                          <ul className="ml-4 list-disc text-xs">
                            <li
                              className={
                                data.correct === "choice1"
                                  ? "font-bold text-green-600"
                                  : ""
                              }
                            >
                              {data.choice1}
                            </li>
                            <li
                              className={
                                data.correct === "choice2"
                                  ? "font-bold text-green-600"
                                  : ""
                              }
                            >
                              {data.choice2}
                            </li>
                            <li
                              className={
                                data.correct === "choice3"
                                  ? "font-bold text-green-600"
                                  : ""
                              }
                            >
                              {data.choice3}
                            </li>
                            <li
                              className={
                                data.correct === "choice4"
                                  ? "font-bold text-green-600"
                                  : ""
                              }
                            >
                              {data.choice4}
                            </li>
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md"
              >
                Proceed →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Test Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={testMeta.title}
                  onChange={(e) =>
                    setTestMeta({ ...testMeta, title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Class (e.g., Class 10A)"
                  value={testMeta.class}
                  onChange={(e) =>
                    setTestMeta({ ...testMeta, class: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={testMeta.subject}
                  onChange={(e) =>
                    setTestMeta({ ...testMeta, subject: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 60 minutes)"
                  value={testMeta.duration}
                  onChange={(e) =>
                    setTestMeta({ ...testMeta, duration: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <button
                onClick={handlePostTest}
                className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md"
              >
                Post Test
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
