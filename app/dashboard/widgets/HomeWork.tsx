"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomeworkScreen() {
  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      title: "Algebra Chapter 5 Problems",
      subject: "Mathematics",
      borderColor: "border-l-red-500",
      bgColor: "bg-red-100",
      completedBgColor: "bg-red-50",
      dueDate: "2025-06-16",
      isCompleted: true,
      hasReminder: true,
    },
    {
      id: 2,
      title: "Essay on Climate Change",
      subject: "English",
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-100",
      completedBgColor: "bg-blue-50",
      dueDate: "2025-06-17",
      isCompleted: false,
      hasReminder: false,
    },
    {
      id: 3,
      title: "Photosynthesis Diagram Labeling",
      subject: "Biology",
      borderColor: "border-l-green-500",
      bgColor: "bg-green-100",
      completedBgColor: "bg-green-50",
      dueDate: "2025-06-18",
      isCompleted: false,
      hasReminder: true,
    },
    {
      id: 4,
      title: "Map Practice - Indian Rivers",
      subject: "Geography",
      borderColor: "border-l-purple-500",
      bgColor: "bg-purple-100",
      completedBgColor: "bg-purple-50",
      dueDate: "2025-06-19",
      isCompleted: true,
      hasReminder: false,
    },
    {
      id: 5,
      title: "French Vocabulary Revision",
      subject: "French",
      borderColor: "border-l-yellow-500",
      bgColor: "bg-yellow-100",
      completedBgColor: "bg-yellow-50",
      dueDate: "2025-06-20",
      isCompleted: false,
      hasReminder: true,
    },
  ]);

  const toggleHomeworkCompletion = (id: number) => {
    setHomeworks((prevHomeworks) =>
      prevHomeworks.map((hw) =>
        hw.id === id ? { ...hw, isCompleted: !hw.isCompleted } : hw
      )
    );
  };
  return (
    <section className="homework w-full p-6 main-dark">
      <div className="top w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Homeworks</h2>

        <Link
          className="p-2 bg-blue-600 rounded-md text-white font-bold"
          href="#"
        >
          🔃 Filter
        </Link>
      </div>

      <div className="homeworks">
        {homeworks
          .filter((homework) => !homework.isCompleted)
          .map((homework) => (
            <div
              key={homework.id}
              className={`single_homework flex items-center gap-4 p-4 border-l-4 ${
                homework.isCompleted
                  ? homework.borderColor.replace(/-\d+$/, "-700")
                  : homework.borderColor
              } ${
                homework.isCompleted
                  ? homework.completedBgColor
                  : homework.bgColor
              } rounded-md mb-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div
                className="tickbox"
                onClick={() => toggleHomeworkCompletion(homework.id)}
              >
                {homework.isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
              <div className="details_and_bell flex items-center justify-between w-full">
                <div className="details">
                  <h3
                    className={`title font-bold text-md ${
                      homework.isCompleted ? "text-gray-600" : "text-black"
                    }`}
                  >
                    {homework.title}
                  </h3>
                  <p className="subject text-gray-600 mb-2">
                    {homework.subject}
                  </p>
                  <div className="due_date flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Due : {homework.dueDate}</span>
                  </div>
                </div>
                <div className="notification_bell">
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
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        {homeworks
          .filter((homework) => homework.isCompleted)
          .map((homework) => (
            <div
              key={homework.id}
              className={`single_homework flex items-center gap-4 p-4 border-l-4 ${
                homework.isCompleted
                  ? homework.borderColor.replace(/-\d+$/, "-700")
                  : homework.borderColor
              } ${
                homework.isCompleted
                  ? homework.completedBgColor
                  : homework.bgColor
              } rounded-md mb-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div
                className="tickbox"
                onClick={() => toggleHomeworkCompletion(homework.id)}
              >
                {homework.isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
              <div className="details_and_bell flex items-center justify-between w-full">
                <div className="details">
                  <h3
                    className={`title font-bold text-md ${
                      homework.isCompleted ? "text-gray-600" : "text-black"
                    }`}
                  >
                    {homework.title}
                  </h3>
                  <p className="subject text-gray-600 mb-2">
                    {homework.subject}
                  </p>
                  <div className="due_date flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Due : {homework.dueDate}</span>
                  </div>
                </div>
                <div className="notification_bell">
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
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
