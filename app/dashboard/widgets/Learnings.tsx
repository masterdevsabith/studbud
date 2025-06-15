"use client";

import { useEffect } from "react";

export default function Learning() {
  const tabs = [
    { id: 1, name: "Hindi", bgColor: "bg-red-200" },
    { id: 2, name: "Maths", bgColor: "bg-yellow-200" },
    { id: 3, name: "English", bgColor: "bg-green-200" },
    { id: 4, name: "Science", bgColor: "bg-blue-200" },
    { id: 5, name: "Social Science", bgColor: "bg-purple-200" },
    { id: 6, name: "Computer Science", bgColor: "bg-pink-200" },
    { id: 7, name: "Biology", bgColor: "bg-lime-200" },
    { id: 8, name: "Chemistry", bgColor: "bg-cyan-200" },
    { id: 9, name: "Physics", bgColor: "bg-amber-200" },
    { id: 10, name: "Environmental Studies", bgColor: "bg-teal-200" },
    { id: 11, name: "Geography", bgColor: "bg-orange-200" },
    { id: 12, name: "History", bgColor: "bg-rose-200" },
    { id: 13, name: "Civics", bgColor: "bg-indigo-200" },
    { id: 14, name: "Economics", bgColor: "bg-sky-200" },
    { id: 15, name: "Malayalam", bgColor: "bg-fuchsia-200" },
    { id: 16, name: "Sanskrit", bgColor: "bg-emerald-200" },
    { id: 17, name: "Moral Science", bgColor: "bg-violet-200" },
  ];

  useEffect(() => {
    const leftArrow = document.querySelector(".left-arrow svg");
    const rightArrow = document.querySelector(".right-arrow svg");
    const tabsContainer = document.querySelector(
      ".tabs ul"
    ) as HTMLElement | null;

    if (!tabsContainer || !leftArrow || !rightArrow) return;

    const manageIcons = () => {
      const maxScrollLeft =
        tabsContainer.scrollWidth - tabsContainer.clientWidth - 4;

      if (tabsContainer.scrollLeft <= 5) {
        leftArrow.parentElement?.classList.add("hidden");
      } else {
        leftArrow.parentElement?.classList.remove("hidden");
      }

      if (tabsContainer.scrollLeft >= maxScrollLeft) {
        rightArrow.parentElement?.classList.add("hidden");
        rightArrow.parentElement?.classList.remove("active-arrow");
      } else {
        rightArrow.parentElement?.classList.remove("hidden");
      }
    };

    const handleLeftClick = () => {
      tabsContainer.scrollBy({ left: -200, behavior: "smooth" });
    };

    const handleRightClick = () => {
      tabsContainer.scrollBy({ left: 200, behavior: "smooth" });
    };

    // Add scroll listener to update icons on scroll
    tabsContainer.addEventListener("scroll", manageIcons);

    // Arrow click listeners
    leftArrow.addEventListener("click", handleLeftClick);
    rightArrow.addEventListener("click", handleRightClick);

    // Initial check
    manageIcons();

    return () => {
      tabsContainer.removeEventListener("scroll", manageIcons);
      leftArrow.removeEventListener("click", handleLeftClick);
      rightArrow.removeEventListener("click", handleRightClick);
    };
  }, []);
  return (
    <section className="mt-4 w-full">
      <div className="w-full">
        <h2 className="text-left text-2xl font-bold mb-4">Learning path</h2>
        {/* <div className="dataaaaa">
          <code className="bg-yellow-300 p-1 rounded-sm">
            """ Implement a catogory tab consisting of subject names """
          </code>
          <br />
          <br />
          <code className="bg-teal-300 p-1 rounded-sm">
            """ Implement a Video section"""
          </code>
          <br />
          <br />
          <code className="bg-fuchsia-300 p-1 rounded-sm">
            """ The video should be based on the subject selected in the
            catogory tab """
          </code>
        </div> */}
        <div className="tabs w-full relative flex items-center">
          <div className="left-arrow absolute h-full w-60 top-0 left-0 hidden items-center justify-start bg-gradient-to-r from-white to-transparent ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 hover:bg-gray-200 w-10 h-10 p-2 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <ul
            className="overflow-x-auto scrollbar-hide scroll-smooth custom-scrollbar w-full pb-2 flex items-center justify-start space-x-4 whitespace-nowrap "
            style={{ scrollBehavior: "smooth" }}
          >
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={` rounded-2xl inline ${tab.bgColor} px-4 py-2 text-sm font-medium text-gray-70 border-b-2 border-transparent cursor-pointer  select-none`}
              >
                {tab.name}
              </li>
            ))}
          </ul>
          <div className="right-arrow absolute h-full  top-0 right-0 hidden items-center justify-end bg-gradient-to-l from-white to-transparent active-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 hover:bg-gray-200 w-10 h-10 p-2 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
