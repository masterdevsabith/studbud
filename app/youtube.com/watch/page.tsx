"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Video, Brain, HelpCircle } from "lucide-react";

export default function YouTubeViewer() {
  const searchParams = useSearchParams();

  const [videoId, setVideoId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [questionsMarkdown, setQuestionsMarkdown] = useState<string>("");
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const id = searchParams.get("v");
    setVideoId(id);
  }, [searchParams]);

  useEffect(() => {
    if (videoId) {
      const fullURL = `https://www.youtube.com/watch?v=${videoId}`;
      setLoadingSummary(true);
      setLoadingQuestions(false);
      setQuestionsMarkdown("");
      setSummary("");

      // Fetch summary first
      fetch("http://localhost:8080/api/v1/get/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: fullURL }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          const fetchedSummary = data.answer || "No summary available.";
          setSummary(fetchedSummary);

          // Now fetch questions based on summary
          setLoadingQuestions(true);
          return fetch("http://localhost:8080/api/v1/get/questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary: fetchedSummary }),
          });
        })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch questions.");
          return res.json();
        })
        .then((data) => {
          // Assume API returns markdown string in data.questionsMarkdown or data.answer
          setQuestionsMarkdown(data.questionsMarkdown || data.answer || "");
        })
        .catch(() => {
          setSummary("Failed to fetch summary.");
          setQuestionsMarkdown("Failed to fetch questions.");
        })
        .finally(() => {
          setLoadingSummary(false);
          setLoadingQuestions(false);
        });
    }
  }, [videoId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="flex items-center text-3xl font-bold mb-10 gap-2">
          <Video className="w-8 h-8 text-blue-600" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  bg-clip-text text-transparent">
            StudBud youtube summarizer and question maker
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Left: Video */}
          <div className="rounded-lg overflow-hidden shadow border bg-white p-4">
            {videoId ? (
              <iframe
                className="w-full aspect-video rounded"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="text-red-600">No video ID found.</p>
            )}
          </div>

          {/* Right: Summary */}
          <div className="rounded-lg shadow border p-6 min-h-[200px] flex flex-col">
            <h2 className="flex items-center text-xl font-semibold text-blue-500 mb-2 gap-2">
              <Brain className="w-6 h-6" /> Summary
            </h2>

            {loadingSummary ? (
              <div className="animate-pulse space-y-3 flex-grow">
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="overflow-y-auto custom-scroll  flex-grow max-h-[200px]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {summary}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg shadow border bg-white p-6">
          <h2 className="flex items-center text-xl font-semibold text-purple-600 mb-4 gap-2">
            <HelpCircle className="w-6 h-6" /> Questions on the Topic
          </h2>

          {loadingQuestions ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="prose prose-purple max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {questionsMarkdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
