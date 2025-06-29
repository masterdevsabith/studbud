"use client";

import { MessageCircle, X, SendHorizonal } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.get(
        `https://studbud-backend-server.onrender.com/api/v1/post/personalquestions/${encodeURIComponent(
          question
        )}`
      );

      const botReply = res.data?.answer || "🤖 Hmm, couldn't fetch an answer.";
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-neutral-900 backdrop-blur-2xl w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-neutral-800 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-5 py-3 flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              StudBud AI
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:scale-110 transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm text-gray-200">
            {messages.length === 0 ? (
              <div className="text-center mt-10">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
                  Hey there! Ready to level up? 🚀
                </h1>
                <p className="text-gray-400 mt-2">
                  Ask anything related to your studies, and I’ll help you out!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pb-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-sky-700 text-white rounded-br-none"
                          : "bg-neutral-800 text-gray-200 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-neutral-800 rounded-2xl text-gray-400 animate-pulse">
                      🤖 Thinking...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 border-t border-neutral-800 px-4 py-3 bg-neutral-900">
            <input
              type="text"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-full transition"
            >
              <SendHorizonal className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-sky-600 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
