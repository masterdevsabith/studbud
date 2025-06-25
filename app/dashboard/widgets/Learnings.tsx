"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Learning() {
  const [selected, setSelected] = useState<string>("English");
  const tabs = [
    {
      id: 1,
      name: "Hindi",
      bgColor: "bg-red-200",
      videos: [
        // {
        //   url: "https://www.youtube.com/watch?v=5OpCuCzux7E",
        //   image: "https://img.youtube.com/vi/5OpCuCzux7E/hqdefault.jpg",
        // },
      ],
    },
    {
      id: 2,
      name: "Maths",
      bgColor: "bg-yellow-200",
      videos: [
        {
          url: "https://youtu.be/mR8A-0IoSHE?si=se5WXVjWbU0JlIYv",
          image: "https://i.ytimg.com/an_webp/pB9jEYO2oaA/mqdefault_6s.webp",
        },
      ],
    },
    {
      id: 3,
      name: "English",
      bgColor: "bg-green-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=F5cMXo3L6vY",
          image: "https://img.youtube.com/vi/F5cMXo3L6vY/hqdefault.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Science",
      bgColor: "bg-blue-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=f3Kk2k8QJxM",
          image: "https://img.youtube.com/vi/f3Kk2k8QJxM/hqdefault.jpg",
        },
      ],
    },
    {
      id: 5,
      name: "Social Science",
      bgColor: "bg-purple-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=nW7KgfKnz9Q",
          image: "https://img.youtube.com/vi/nW7KgfKnz9Q/hqdefault.jpg",
        },
      ],
    },
    {
      id: 6,
      name: "Computer Science",
      bgColor: "bg-pink-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },

        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=DLX62G4lc44",
          image: "https://img.youtube.com/vi/DLX62G4lc44/hqdefault.jpg",
        },
      ],
    },
    {
      id: 7,
      name: "Biology",
      bgColor: "bg-lime-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=qgO6kGbvbZ8",
          image: "https://img.youtube.com/vi/qgO6kGbvbZ8/hqdefault.jpg",
        },
      ],
    },
    {
      id: 8,
      name: "Chemistry",
      bgColor: "bg-cyan-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=FSyAehMdpyI",
          image: "https://img.youtube.com/vi/FSyAehMdpyI/hqdefault.jpg",
        },
      ],
    },
    {
      id: 9,
      name: "Physics",
      bgColor: "bg-amber-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=1nziMkcyBOs",
          image: "https://img.youtube.com/vi/1nziMkcyBOs/hqdefault.jpg",
        },
      ],
    },
    {
      id: 10,
      name: "Environmental Studies",
      bgColor: "bg-teal-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=4o_Mjcfj6jo",
          image: "https://img.youtube.com/vi/4o_Mjcfj6jo/hqdefault.jpg",
        },
      ],
    },
    {
      id: 11,
      name: "Geography",
      bgColor: "bg-orange-200",
      videos: [
        {
          url: "https://www.youtube.com/watch?v=K1VYZM8ZqYQ",
          image: "https://img.youtube.com/vi/K1VYZM8ZqYQ/hqdefault.jpg",
        },
      ],
    },
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

    tabsContainer.addEventListener("scroll", manageIcons);
    leftArrow.addEventListener("click", handleLeftClick);
    rightArrow.addEventListener("click", handleRightClick);
    manageIcons();

    return () => {
      tabsContainer.removeEventListener("scroll", manageIcons);
      leftArrow.removeEventListener("click", handleLeftClick);
      rightArrow.removeEventListener("click", handleRightClick);
    };
  }, []);

  const len = () => {
    const videolen = tabs.find((tab) => tab.name === selected)?.videos.length;
    return videolen;
  };

  const Videocount = len();
  return (
    <section className="mt-4 w-full">
      <div className="w-full">
        <h2 className="text-left text-2xl font-bold mb-4">Learning path</h2>
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
                onClick={() => setSelected(tab.name)}
                className={` rounded-2xl inline ${tab.bgColor} px-4 py-2 text-sm font-medium text-black font-bold border-b-2 border-transparent cursor-pointer  select-none`}
              >
                {tab.name}
              </li>
            ))}
          </ul>
          <div className="right-arrow absolute h-full  top-0 right-0 hidden items-center justify-end bg-gradient-to-l from-white to-transparent ">
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
        <h1>
          {Videocount} {""}
          {(Videocount ?? 0) > 1 ? "Videos" : "Video"}
        </h1>
        <div>
          {(Videocount ?? 0) < 1 ? (
            <p>No videos found</p>
          ) : (
            <div className="flex items-center justify-between flex-wrap pt-10 px-10 gap-10">
              {tabs
                .find((tab) => tab.name === selected)
                ?.videos.map((videos, index) => (
                  <div key={index}>
                    <Link href={videos.url} target="_blank">
                      <Image
                        src={videos.image}
                        alt={videos.url}
                        width={400}
                        height={400}
                        className="rounded-3xl"
                      />
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
