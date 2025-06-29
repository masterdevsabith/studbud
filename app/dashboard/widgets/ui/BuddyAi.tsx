// app/components/StudBudChat.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";
import axios from "axios";
import clsx from "clsx";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function StudBudChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/user/authentication/protect/validate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(res.data.user.response[0]?.name);
      } catch (e) {
        console.log(e);
      }
    };
    getName();
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.get(
        `https://studbud-backend-server.onrender.com/api/v1/post/questions/${encodeURIComponent(
          question
        )}`
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: res.data?.answer || "🤖: No response from StudBud.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Failed to get answer from StudBud server." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-900">
      <main
        ref={chatRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 max-w-6xl mx-auto w-full flex flex-col items-center justify-center"
      >
        {messages.length === 0 ? (
          <div className="text-center animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Hey {name}, ready to level up your brain? 🚀
            </h1>
            <p className="text-gray-700 text-lg">
              Ask me anything — I’m your AI study buddy!
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={clsx(
                "flex  items-start gap-3 animate-slide-up w-full",
                msg.role === "user" ? "justify-end" : "justify-start",
                "w-full"
              )}
            >
              {msg.role === "bot" && (
                <div className="flex-shrink-0">
                  <Bot className="w-8 h-8 text-indigo-500" />
                </div>
              )}
              <div
                className={clsx(
                  "rounded-2xl p-4 max-w-[70%] shadow-lg transition-all duration-300",
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                )}
              >
                <p className="text-sm md:text-base">{msg.text}</p>
              </div>
              {msg.role === "user" && (
                <div className="flex-shrink-0">
                  <User className="w-8 h-8 text-indigo-500" />
                </div>
              )}
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex items-center gap-3 animate-slide-up">
            <Bot className="w-8 h-8 text-indigo-500" />
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Section */}
      <footer className="p-4 bg-zinc-100 backdrop-blur-md border-t-2 border-gray-300">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-3 rounded-full border-2 border-gray-600 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Ask something smart..."
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full transition duration-300 flex items-center justify-center"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
