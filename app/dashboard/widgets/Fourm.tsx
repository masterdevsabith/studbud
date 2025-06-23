"use client";

import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FourmScreen() {
  const [activeTab, setActiveTab] = useState("Discussions");
  const tabs = ["Announcement", "Discussions", "Files"];
  const [classname, setClassname] = useState();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
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
        const fetchedClass = res.data.user.response.classname
        setClassname(fetchedClass);
      } catch (e) {
        console.log(e);
      }
      const getFourmByClass = await axios.get(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/get/fourm/post/${classname}`
      );
      setPost(getFourmByClass.data);
    };

    fetchAnnouncement();
  }, []);

  console.log(
    `Hey bro this is classname which you are looking :::=== ${classname}`
  );
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
        {activeTab === "Announcement" && (
          <h2 className="text-2xl font-bold">🌐 Announcements</h2>
        )}
        {activeTab === "Discussions" && (
          <h2 className="text-2xl font-bold">🏫 Class Community</h2>
        )}
        {activeTab === "Files" && (
          <h2 className="text-2xl font-bold">📂 Files</h2>
        )}

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
        <div className="announcement_tab mb-4 p-4 rounded-md"></div>
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
