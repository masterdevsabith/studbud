"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const app_base_url =
  process.env.APP_BASE_URL || "https://studbud-backend-server.onrender.com";

type LeaderboardEntry = {
  userId: string;
  count: number;
  rank: number;
  name: string;
  avatar: string;
  bgColor: string;
  textColor: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getRandomColors(index: number) {
  const bgColors = [
    "bg-blue-100",
    "bg-purple-100",
    "bg-green-100",
    "bg-pink-100",
    "bg-yellow-100",
    "bg-orange-100",
  ];
  const textColors = [
    "text-blue-800",
    "text-purple-800",
    "text-green-800",
    "text-pink-800",
    "text-yellow-800",
    "text-orange-800",
  ];
  return {
    bgColor: bgColors[index % bgColors.length],
    textColor: textColors[index % textColors.length],
  };
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [classname, setClassname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Step 1: Get classname from token
  useEffect(() => {
    async function fetchClassname() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${app_base_url}/api/v1/user/authentication/protect/validate`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const cls = String(res.data.user.response[0]?.classname);
        console.log("✅ Classname fetched:", cls);
        if (cls) setClassname(cls);
        else throw new Error("Classname not found");
      } catch (err) {
        console.error("❌ Failed to fetch classname:", err);
        setLoading(false);
      }
    }

    fetchClassname();
  }, []);

  // Step 2: When classname is set, fetch leaderboard
  useEffect(() => {
    if (!classname) return;

    async function fetchLeaderboard() {
      try {
        const { data: rawLeaderboard } = await axios.get(
          `${app_base_url}/api/v1/get/leaderboard/${classname}`
        );

        const enriched = await Promise.all(
          rawLeaderboard.map(async (entry: any, idx: number) => {
            try {
              const res = await axios.get(
                `${app_base_url}/api/v1/get/userById/${entry.userId}`
              );
              const name = res.data?.username || "anonymous";
              const { bgColor, textColor } = getRandomColors(idx);
              return {
                userId: entry.userId,
                count: entry.count,
                rank: entry.rank,
                name,
                avatar: getInitials(name),
                bgColor,
                textColor,
              };
            } catch {
              return {
                userId: entry.userId,
                count: entry.count,
                rank: entry.rank,
                name: "anonymous",
                avatar: "AN",
                bgColor: "bg-gray-300",
                textColor: "text-gray-800",
              };
            }
          })
        );

        setLeaderboardData(enriched);
      } catch (err) {
        console.error("❌ Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [classname]);

  if (loading)
    return <p className="p-4 text-sm text-gray-500">Loading leaderboard...</p>;
  if (!leaderboardData.length)
    return (
      <p className="p-4 text-sm text-gray-500">No leaderboard data found.</p>
    );

  const [second, first, third, ...rest] = leaderboardData;

  return (
    <aside className="h-screen sticky top-0 w-full lg:hidden sm:hidden">
      <Card className="bg-gradient-to-br from-cyan-50 to-white text-cyan-800 h-full rounded-none border-none">
        <CardHeader className="pb-20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-800 flex items-center space-x-2 text-2xl">
              <Trophy size={25} />
              <span>Leaderboard</span>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 overflow-y-auto h-[calc(100vh-90px)]">
          <div className="flex justify-center items-end gap-4">
            {second && (
              <div className="flex flex-col items-center relative top-4">
                <div
                  className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center text-xl shadow-lg ${second.bgColor} ${second.textColor}`}
                >
                  {second.avatar}
                </div>
                <p className="text-sm mt-1">{second.name.split(" ")[0]}</p>
                <p className="text-xs text-cyan-800/70">{second.count} pts</p>
              </div>
            )}

            {first && (
              <div className="flex flex-col items-center z-10">
                <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-2xl bg-yellow-400 text-yellow-900 shadow-xl">
                  🏆
                </div>
                <p className="text-base font-semibold mt-2">
                  {first.name.split(" ")[0]}
                </p>
                <p className="text-xs text-cyan-800/70">{first.count} pts</p>
              </div>
            )}

            {third && (
              <div className="flex flex-col items-center relative top-4">
                <div
                  className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center text-xl shadow-lg ${third.bgColor} ${third.textColor}`}
                >
                  {third.avatar}
                </div>
                <p className="text-sm mt-1">{third.name.split(" ")[0]}</p>
                <p className="text-xs text-cyan-800/70">{third.count} pts</p>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-10">
            {rest.map((user) => (
              <div
                key={user.rank}
                className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {user.rank}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={`${user.bgColor} ${user.textColor} text-xs font-medium`}
                  >
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-cyan-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-cyan-800/70">
                    {user.count} points
                  </p>
                </div>
                <Star size={16} className="text-yellow-300" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
