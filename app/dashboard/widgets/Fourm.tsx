"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FourmScreen() {
  const [activeTab, setActiveTab] = useState("Discussions");

  const tabs = ["Announcement", "Discussions", "Files"];
  const forums = [
    {
      id: 1,
      user: "Sarah M.",
      timeAgo: "3 hours ago",
      title: "Help with Math Assignment",
      message: "Can someone explain quadratic equations?",
      replies: 5,
    },
    {
      id: 2,
      user: "Mike T.",
      timeAgo: "5 hours ago",
      title: "Study Group for History",
      message:
        "Anyone interested in forming a study group for the upcoming history test?",
      replies: 12,
    },
    {
      id: 3,
      user: "Ayesha K.",
      timeAgo: "1 hour ago",
      title: "Need Help with Chemistry",
      message:
        "Struggling with balancing chemical equations. Anyone free to help?",
      replies: 3,
    },
    {
      id: 4,
      user: "John D.",
      timeAgo: "2 hours ago",
      title: "Group Project Coordination",
      message: "Let’s finalize the topics for our science project group.",
      replies: 7,
    },
    {
      id: 5,
      user: "Lina S.",
      timeAgo: "30 minutes ago",
      title: "Biology Revision Tips",
      message: "What’s the best way to remember scientific terms for the test?",
      replies: 4,
    },
    {
      id: 6,
      user: "Ravi P.",
      timeAgo: "4 hours ago",
      title: "Doubt in Geography Homework",
      message: "Can someone explain the water cycle diagram question?",
      replies: 6,
    },
    {
      id: 7,
      user: "Emma W.",
      timeAgo: "6 hours ago",
      title: "English Essay Help",
      message:
        "Struggling with the conclusion part. Can someone give suggestions?",
      replies: 2,
    },
    {
      id: 8,
      user: "Khalid Z.",
      timeAgo: "7 hours ago",
      title: "Physics Group Formation",
      message: "Need 2 more people to form a group for the physics experiment.",
      replies: 9,
    },
    {
      id: 9,
      user: "Chen L.",
      timeAgo: "10 minutes ago",
      title: "Doubt in Computer Science",
      message: "Can someone explain how recursion works in JS?",
      replies: 8,
    },
  ];
  const announcements = [
    {
      id: 1,
      user: "Principal Johnson",
      timeAgo: "2 hours ago",
      title: "School Holiday Notice",
      message: "School will be closed next Monday for a public holiday.",
      likes: 12,
    },
    {
      id: 2,
      user: "Ms. Clara Bennett",
      timeAgo: "4 hours ago",
      title: "Parent-Teacher Meeting",
      message:
        "A parent-teacher meeting will be held this Friday at 4 PM in the auditorium.",
      likes: 9,
    },
    {
      id: 3,
      user: "Principal Johnson",
      timeAgo: "1 day ago",
      title: "Annual Sports Day",
      message:
        "Annual Sports Day is scheduled for next Wednesday. All students must wear sports attire.",
      likes: 21,
    },
    {
      id: 4,
      user: "Mr. Alan Green",
      timeAgo: "3 days ago",
      title: "Science Fair Submissions",
      message:
        "Last date to submit science fair projects is this Thursday. Late entries won’t be accepted.",
      likes: 7,
    },
    {
      id: 5,
      user: "Ms. Clara Bennett",
      timeAgo: "5 days ago",
      title: "Library Book Return",
      message:
        "Students must return overdue library books by the end of this week to avoid fines.",
      likes: 4,
    },
  ];

  useEffect(() => {}, []);

  return (
    <section className="forum p-6 ">
      <div className="top w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🌐 Class Community</h2>
        <Link
          className="p-2 bg-blue-600 rounded-md text-white font-bold"
          href="#"
        >
          + New Post
        </Link>
      </div>

      <div className="tabs w-full flex items-center justify-between mb-4 bg-gray-200 p-1 rounded-md">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href="#"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "w-1/3 text-center p-2 rounded-md transition",
              activeTab === tab ? "bg-white font-bold" : "bg-gray-200"
            )}
          >
            {tab}
          </Link>
        ))}
      </div>

      {activeTab === "Announcement" && (
        <div className="announcement_tab mb-4 p-4 rounded-md">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="single_announcement border-1 mb-4 bg-gray-50 p-4 rounded-md hover:drop-shadow-lg"
            >
              <div className="userdetails flex items-center gap-2 mb-2">
                <div className="profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="name_and_timeAgo">
                  <h3 className="user font-medium">{announcement.user}</h3>
                  <span className="timeAgo text-gray-600">
                    {announcement.timeAgo}
                  </span>
                </div>
              </div>
              <div className="contentdetails">
                <h2 className="title mb-2 text-xl font-bold">
                  {announcement.title}
                </h2>
                <p className="message mb-5">{announcement.message}</p>
              </div>
              <div className="actionbtns flex items-center gap-4">
                <div className="likes flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                  {announcement.likes}
                </div>
                <div className="comments flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                    />
                  </svg>
                  <span>Comment</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Discussions" && (
        <div className="forum_posts ">
          {forums.map((forum) => (
            <div
              key={forum.id}
              className="single_forum flex items-start justify-start border-1 gap-2 bg-gray-100 mb-4 p-4 rounded-md hover:drop-shadow-lg"
            >
              <div className="user">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="details">
                <div className="name_and_timeAgo flex items-center mb-2">
                  <h3>{forum.user} • </h3>
                  <span>{forum.timeAgo}</span>
                </div>
                <h2 className="title mb-2 text-xl font-bold">{forum.title}</h2>
                <p className="message mb-5">{forum.message}</p>
                <div className="action_buttons flex items-center">
                  <div className="replies flex items-center gap-2 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>
                    {forum.replies} replies
                  </div>

                  <Link href="#" className="">
                    Join Discussion
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Files" && (
        <div className="files_tab mb-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold text-lg mb-2">Shared Files</h3>
          <p>No files shared yet.</p>
        </div>
      )}
    </section>
  );
}
