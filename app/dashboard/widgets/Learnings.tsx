"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Learning() {
  const [selected, setSelected] = useState<string>("English");
  const [videosBySubject, setVideosBySubject] = useState<Record<string, any[]>>(
    {}
  );

  const tabs = [
    "Hindi",
    "Maths",
    "English",
    "Science",
    "Social Science",
    "Computer Science",
    "Biology",
    "Chemistry",
    "Physics",
    "Environmental Studies",
    "Geography",
  ];

  const fetchYouTubeVideos = async (subject: string) => {
    try {
      const options = {
        method: "GET",
        url: `https://youtube138.p.rapidapi.com/search/?q=${subject}&hl=en&gl=US`,
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
          "x-rapidapi-host": "youtube138.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      // ✅ Filter and map video items only
      const videoList = response.data.contents
        .filter((item: any) => item.type === "video" && item.video?.videoId)
        .map((item: any) => ({
          id: item.video.videoId,
          url: `https://www.youtube.com/watch?v=${item.video.videoId}`,
          title: item.video.title,
          thumbnail:
            item.video.thumbnails?.[1]?.url || item.video.thumbnails?.[0]?.url,
        }));

      setVideosBySubject((prev) => ({ ...prev, [subject]: videoList }));
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      setVideosBySubject((prev) => ({ ...prev, [subject]: [] }));
    }
  };

  useEffect(() => {
    if (!videosBySubject[selected]) {
      fetchYouTubeVideos(selected);
    }
  }, [selected]);

  return (
    <section className="mt-8 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-6">📚 Learning Path</h2>

      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setSelected(tab)}
            className={`shrink-0 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
              selected === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <h3 className="mt-4 text-lg font-medium">
        Showing {videosBySubject[selected]?.length || 0} Video
        {videosBySubject[selected]?.length !== 1 ? "s" : ""} for {selected}
      </h3>

      {videosBySubject[selected] && videosBySubject[selected].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {videosBySubject[selected].map((video, index) => (
            <Link
              href={video.url}
              key={index}
              target="_blank"
              className="block group"
            >
              <div className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition duration-200">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={400}
                  height={225}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2">
                  <p className="text-sm font-semibold">{video.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">
          No videos available for {selected}.
        </p>
      )}
    </section>
  );
}
