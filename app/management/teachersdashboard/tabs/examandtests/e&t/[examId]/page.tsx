"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExamAndTestsView() {
  const params = useParams();
  const examId = params.examId;
  const [responses, setResponses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const [newMark, setNewMark] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(
          `https://studbud-backend-server.onrender.com/api/v1/statusbyclassname/${examId}`
        );
        setResponses(res.data);

        // Fetch user info for each student
        const infoMap = {};
        for (const student of res.data) {
          const infoRes = await axios.get(
            `https://studbud-backend-server.onrender.com/api/v1/userById/${student.s_id}`
          );
          infoMap[student.s_id] = infoRes.data[0];
        }
        setUserInfo(infoMap);
      } catch (err) {
        console.error("Error fetching student responses or user info:", err);
      }
    };

    if (examId) fetchResponses();
  }, [examId]);

  const toggleDropdown = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateMark = async (s_id) => {
    const payload = {
      examid: examId,
      s_id: s_id,
      marks: newMark,
    };

    console.log("Sending payload to server:", payload);

    try {
      await axios.post(
        "https://studbud-backend-server.onrender.com/api/v1/updatemark",
        payload
      );
      alert("✅ Mark submitted successfully!");
    } catch (error) {
      console.error(
        "❌ Error submitting mark:",
        error.response?.data || error.message
      );
      alert("❌ Failed to submit mark");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Student Exam Responses
      </h1>

      <div className="space-y-6">
        {responses.map((student, idx) => {
          const info = userInfo[student.s_id];
          return (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border border-gray-200"
            >
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleDropdown(student.s_id)}
              >
                <div>
                  <h2 className="text-xl font-semibold text-blue-600">
                    {info?.name || "Unknown Student"}
                  </h2>
                  <p className="text-gray-600 text-sm">📧 {info?.email}</p>
                  <p className="text-gray-500 text-xs">🆔 {student.s_id}</p>
                </div>
                {expanded[student.s_id] ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </div>

              {expanded[student.s_id] && (
                <div className="border-t px-6 pb-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 border-b pb-1">
                      📝 Normal Questions
                    </h3>
                    {Object.entries(student.question.normalQuestions || {}).map(
                      ([qid, questionText], i) => (
                        <div key={qid} className="text-gray-700">
                          <p className="font-semibold">
                            Q{i + 1}. {questionText}
                          </p>
                          <p className="ml-4 text-green-600">
                            Answer: {student.answers[qid] || "Not Answered"}
                          </p>
                        </div>
                      )
                    )}

                    <h3 className="text-lg font-medium text-gray-700 border-b pb-1 pt-4">
                      📚 MCQ Questions
                    </h3>
                    {Object.entries(student.question.multiplechoice || {}).map(
                      ([qid, qdata], i) => (
                        <div key={qid} className="text-gray-700">
                          <p className="font-semibold">
                            Q
                            {Object.keys(student.question.normalQuestions || {})
                              .length +
                              i +
                              1}
                            . {qdata.question}
                          </p>
                          <p className="ml-4 text-green-600">
                            Answer:{" "}
                            {qdata[student.answers[qid]] || "Not Answered"}
                          </p>
                        </div>
                      )
                    )}

                    <div className="pt-6 flex gap-4 items-center">
                      <input
                        type="number"
                        value={newMark}
                        onChange={(e) => setNewMark(e.target.value)}
                        placeholder="Enter marks"
                        className="w-32 border text-gray-900 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
                        onClick={() => updateMark(student.s_id)}
                      >
                        Submit Marks
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
