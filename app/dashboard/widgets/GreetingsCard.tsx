"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardScreenPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
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
        setName(res.data.user.response[0]?.name);
      } catch (e) {
        console.log(e);
      }
    };
    getName();
  }, []);

  console.log(name);

  return (
    <>
      <section className="dashboard-main flex items-center justify-center ">
        <div className="dashboard-greetings w-6/6 bg-blue-700 p-8 rounded-2xl relative overflow-hidden">
          <div className="z-10 lg:max-w-[60%] sm:max-w-[100%]">
            <h2 className="font-extrabold text-white text-5xl mb-2.5">
              Hello, {name ? name : "loading...."}👋
            </h2>
            <p className="font-normal text-gray-300 text-xl mb-7">
              How was your day ? <br />
              Shall we start the homework session ?
            </p>
            <Link
              className="border-2 p-2.5 rounded-2xl bg-white font-bold text-blue-700 mr-3"
              href="#"
            >
              Start Learning
            </Link>
            <Link className="border-2 p-2.5 rounded-2xl text-white" href="#">
              Join Learning
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-[200px] h-[200px] z-0 lg:block sm:hidden">
            <Image
              src="/assets/dashboard-avatar.png"
              alt="Character"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
}
