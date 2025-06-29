"use client";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
  const [sId, setSId] = useState<string | null>(null);
  const [userMap, setUserMap] = useState<Record<string, string>>({}); // s_id => name

  const baseUrl =
    process.env.APP_BASE_URL || "https://studbud-backend-server.onrender.com";

  // Get current user's s_id
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/user/authentication/protect/validate`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const studentId = res.data.user.response[0]?.s_id;
        setSId(studentId);
      } catch (err) {
        console.error("Token validation failed:", err);
      }
    };
    fetchUserData();
  }, [baseUrl]);

  // Fetch discussion + user names
  useEffect(() => {
    const fetchDisData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/get/disscusiondatabyid/${disid}`
        );
        setDisData(res.data);

        const allUserIds = new Set<string>();
        res.data?.forEach((discussion: any) => {
          discussion.comment?.forEach(
            (c: any) => c.userId && allUserIds.add(c.userId)
          );
          discussion.reply?.forEach(
            (r: any) => r.userId && allUserIds.add(r.userId)
          );
        });

        const userIdArr = Array.from(allUserIds);
        const nameMap: Record<string, string> = {};

        await Promise.all(
          userIdArr.map(async (sid) => {
            try {
              const userRes = await axios.get(
                `${baseUrl}/api/v1/userById/${sid}`
              );
              // FIX: access first element of array for name
              const name = userRes.data?.[0]?.name;
              nameMap[sid] = name && name.trim() !== "" ? name : "Anonymous";
            } catch {
              nameMap[sid] = "Anonymous";
            }
          })
        );

        setUserMap(nameMap);
      } catch (error) {
        console.error("Error fetching discussion data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisData();
  }, [disid, baseUrl]);

  // Handle Send
  const handleSendMessage = async () => {
    if (!message.trim() || !sId) return;
    setSending(true);

    const cmtId = uuidv4();
    const newComment = {
      userId: sId,
      commentData: {
        cmt: message,
        cmtId,
        createdAt: new Date().toISOString(),
      },
    };

    const payload = {
      disid,
      comment: [newComment],
    };

    try {
      // Optimistic UI update without duplicate
      setDisData((prev: any) => {
        if (!prev || prev.length === 0) return prev;
        const updated = [...prev];
        const exists = updated[0].comment?.some(
          (c: any) => c.commentData?.cmtId === cmtId
        );
        if (!exists) {
          updated[0].comment = [...(updated[0].comment || []), newComment];
        }
        return updated;
      });

      // Update userMap if needed
      if (!userMap[sId]) {
        try {
          const userRes = await axios.get(`${baseUrl}/api/v1/userById/${sId}`);
          // FIX: access first element of array for name
          const name = userRes.data?.[0]?.name;
          setUserMap((prev) => ({
            ...prev,
            [sId]: name && name.trim() !== "" ? name : "Anonymous",
          }));
        } catch {
          setUserMap((prev) => ({ ...prev, [sId]: "Anonymous" }));
        }
      }

      // Send to backend
      await axios.post(`${baseUrl}/api/v1/insert/comment`, payload);
      setMessage("");
    } catch (e) {
      console.error("Send error:", e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative bg-white text-gray-900 min-h-screen font-sans">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-6 py-6 flex items-center gap-3">
        <MessageCircle className="w-6 h-6 text-sky-500" />
        <h2 className="text-lg font-semibold truncate">
          {disData?.[0]?.title || "Discussion Thread"}
        </h2>
      </header>

      {/* Thread */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-40 space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          </div>
        ) : disData ? (
          disData.map((discussion: any) => {
            // Merge and deduplicate by cmtId
            const allMsg: any[] = [
              ...(discussion.comment || []).map((c: any, i: number) => ({
                msgId: `c-${i}`,
                type: "comment",
                user: c.userId,
                time: c.commentData.createdAt,
                message: c.commentData.cmt,
                cmtId: c.commentData.cmtId,
              })),
              ...(discussion.reply || []).map((r: any, i: number) => ({
                msgId: `r-${i}`,
                type: "reply",
                user: r.userId,
                time: r.replyData.createdAt,
                message: r.replyData.reply,
                cmtId: r.replyData.cmtId,
                replyId: r.replyData.replytId,
              })),
            ];

            const seen = new Set<string>();
            const uniqueMsgs = allMsg.filter((msg) => {
              const key = `${msg.type}-${msg.cmtId}-${msg.replyId || ""}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });

            const sortedMsgs = uniqueMsgs.sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            );

            return (
              <div key={discussion.id} className="space-y-4 w-full">
                {sortedMsgs.map((msg: any) => (
                  <div
                    key={msg.msgId}
                    className={`rounded-2xl px-5 py-4 shadow-md transition-all duration-200 w-full ${
                      msg.type === "comment"
                        ? "bg-gradient-to-r from-sky-100 via-white to-sky-100 border border-sky-300"
                        : "bg-gradient-to-r from-gray-100 via-white to-gray-100 border border-gray-300 ml-6"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <UserCircle className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-semibold">
                        {userMap[msg.user] || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <CalendarClock className="w-4 h-4" />
                        {new Date(msg.time).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {msg.message}
                    </p>
                    {msg.type === "reply" && (
                      <div className="mt-2 text-xs text-gray-500 flex gap-1 items-center">
                        <Reply className="w-4 h-4" />
                        <span>Reply to comment #{msg.cmtId}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>No messages yet. Start the conversation!</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border-2 border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || !sId || sending}
            className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
