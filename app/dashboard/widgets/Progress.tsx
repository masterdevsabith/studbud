"use client";

import { Trophy, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const leaderboardData = [
  {
    rank: 1,
    name: "Alex Chen",
    points: 2847,
    avatar: "👑",
    bgColor: "bg-yellow-400",
    textColor: "text-yellow-900",
  },
  {
    rank: 2,
    name: "Sarah Miller",
    points: 2693,
    avatar: "🥈",
    bgColor: "bg-gray-300",
    textColor: "text-gray-900",
  },
  {
    rank: 3,
    name: "John Doe",
    points: 2581,
    avatar: "🥉",
    bgColor: "bg-orange-400",
    textColor: "text-cyan-800",
  },
  {
    rank: 4,
    name: "Emma Wilson",
    points: 2367,
    avatar: "EW",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    rank: 5,
    name: "Mike Johnson",
    points: 2198,
    avatar: "MJ",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
];

export default function Leaderboard() {
  const [second, first, third] = leaderboardData.slice(0, 3);

  return (
    <aside className="h-screen sticky top-0 w-full">
      <Card className="bg-gradient-to-br from-cyan-50 to-white text-cyan-800 h-full rounded-none border-none">
        <CardHeader className="pb-20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-800 flex items-center space-x-2 text-2xl">
              <Trophy size={25} />
              <span>Leaderboard</span>
            </CardTitle>
            <button className="text-teal-800 hover:text-cyan-800 text-sm font-medium">
              View All
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 overflow-y-auto h-[calc(100vh-90px)]">
          <div className="flex justify-center items-end gap-4">
            <div className="flex flex-col items-center relative top-4">
              <div className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center text-xl bg-gray-300 text-black shadow-lg">
                {second.avatar}
              </div>
              <p className="text-sm mt-1">{second.name.split(" ")[0]}</p>
              <p className="text-xs text-cyan-800/70">{second.points} pts</p>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-2xl bg-yellow-400 text-yellow-900 shadow-xl">
                {first.avatar}
              </div>
              <p className="text-base font-semibold mt-2">
                {first.name.split(" ")[0]}
              </p>
              <p className="text-xs text-cyan-800/70">{first.points} pts</p>
            </div>

            <div className="flex flex-col items-center relative top-4">
              <div className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center text-xl bg-orange-400 text-cyan-800 shadow-lg">
                {third.avatar}
              </div>
              <p className="text-sm mt-1">{third.name.split(" ")[0]}</p>
              <p className="text-xs text-cyan-800/70">{third.points} pts</p>
            </div>
          </div>

          <div className="space-y-3 pt-10">
            {leaderboardData.slice(3).map((user) => (
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
                    {user.points} points
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
