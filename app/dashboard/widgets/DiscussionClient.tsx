"use client";
import axios from "axios";
import {
  UserCircle,
  CalendarClock,
  Reply,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DiscussionThread({ disid }: { disid: string }) {
  const [disData, setDisData] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDisData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${
            process.env.APP_BASE_URL ||
            "https://studbud-backend-server.onrender.com"
          }/api/v1/get/disscusiondatabyid/${disid}`
        );
        setDisData(res.data);
      } catch (error) {
        console.error("Error fetching discussion data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDisData();
  }, [disid]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setSending(true);

    try {
      setMessage("");
      const data = {
        disid,
        comment: [
          {
            userId: "0a0a0a0a-0000-0000-0000-000000000001",
            commentData: {
              cmt: message,
              cmtId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
              createdAt: new Date().toISOString(),
            },
          },
        ],
      };

      await axios.post(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/api/v1/insert/comment`,
        data
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white font-sans px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-2xl font-bold mb-8 text-white flex items-center gap-3 border-b border-gray-700 pb-4">
        <MessageCircle className="w-8 h-8 text-blue-400" />
        <span className="truncate">
          {disData?.[0]?.title || "Discussion Thread"}
        </span>
      </header>

      <div className="space-y-4 max-w-3xl mx-auto pb-40">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : disData ? (
          disData.map((discussion: any) => {
            const allMsg = [
              ...(discussion.comment?.map((comment: any, index: number) => ({
                msgId: index,
                type: "comment",
                user: comment.userId,
                time: comment.commentData.createdAt,
                message: comment.commentData.cmt,
                cmtId: comment.commentData.cmtId,
              })) || []),
              ...(discussion.reply?.map((reply: any, index: number) => ({
                msgId: index,
                type: "reply",
                user: reply.userId,
                time: reply.replyData.createdAt,
                message: reply.replyData.reply,
                cmtId: reply.replyData.cmtId,
                replyId: reply.replyData.replytId,
              })) || []),
            ].sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            );

            return (
              <div key={discussion.id} className="space-y-4">
                {allMsg.map((msg: any) => (
                  <div
                    key={msg.msgId}
                    className={`p-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg ${
                      msg.type === "comment"
                        ? "bg-gray-700/80 border-l-4 border-blue-500"
                        : "bg-gray-800/80 border-l-4 border-green-500 ml-8"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <UserCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-200">
                        {msg.user || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <CalendarClock className="w-4 h-4" />
                        {new Date(msg.time).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-100 leading-relaxed">
                      {msg.message}
                    </p>
                    {msg.type === "reply" && (
                      <div className="flex items-center gap-2 mt-2 text-gray-400 text-xs">
                        <Reply className="w-4 h-4" />
                        <span>Replying to comment #{msg.cmtId}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400 flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>No messages yet. Start the conversation!</span>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
