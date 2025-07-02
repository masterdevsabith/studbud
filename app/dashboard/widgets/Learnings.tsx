"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle, Info } from "lucide-react";

export default function Learning() {
  const [selected, setSelected] = useState<string>("English");
  const [videosBySubject, setVideosBySubject] = useState<Record<string, any[]>>(
    {}
  );
  const [className, setClassName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchUserClassName = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const validateRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/authentication/protect/validate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedClassName = String(
          validateRes.data.user.response[0]?.classname
        );
        setClassName(fetchedClassName);
      } catch (err) {
        console.error("Error validating user:", err);
        setError("Failed to validate user.");
      }
    };

    fetchUserClassName();
  }, []);

  const fetchYouTubeVideos = async (subject: string) => {
    if (!className) {
      console.warn("Class name not set yet. Skipping fetch.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Compose query by combining className + subject for more relevant results
      const query = `${className} ${subject}`;

      const options = {
        method: "GET",
        url: `https://youtube138.p.rapidapi.com/search/?q=${encodeURIComponent(
          query
        )}&hl=en&gl=US`,
        headers: {
          // "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
          "x-rapidapi-host": "youtube138.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

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
      setError("Failed to fetch videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (className && !videosBySubject[selected]) {
      fetchYouTubeVideos(selected);
    }
  }, [selected, className]);

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600 mt-6">
        <AlertCircle size={20} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="mt-8 px-4 md:px-10 h-screen bg-white">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Info size={28} className="text-blue-600" />
        Learning Path
      </h2>

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

      <h3 className="mt-4 text-lg font-medium flex items-center gap-2">
        {loading && (
          <Loader2 className="animate-spin text-blue-600" size={20} />
        )}
        Showing {videosBySubject[selected]?.length || 0} Video
        {videosBySubject[selected]?.length !== 1 ? "s" : ""} for {className}{" "}
        {selected}
      </h3>

      {loading ? (
        <p className="mt-6 text-gray-500">Loading videos...</p>
      ) : videosBySubject[selected] && videosBySubject[selected].length > 0 ? (
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
        !loading && (
          <p className="text-gray-500 mt-6">
            No videos available for {className} {selected}.
          </p>
        )
      )}
    </section>
  );
}
