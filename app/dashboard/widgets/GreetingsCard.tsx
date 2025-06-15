import Link from "next/link";
import Image from "next/image";

export default function DashboardScreenPage() {
  return (
    <>
      <section className="dashboard-main w-full flex items-center justify-center">
        <div className="dashboard-greetings w-4/6 bg-blue-700 p-8 rounded-2xl relative overflow-hidden">
          <div className="z-10 max-w-[60%]">
            <h2 className="font-extrabold text-white text-5xl mb-2.5">
              Hello, Aromal 👋
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
          <div className="absolute right-0 bottom-0 w-[200px] h-[200px] z-0">
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
