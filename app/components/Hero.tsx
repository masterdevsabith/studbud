"use client";

import Image from "next/image";

import Link from "next/link";

export default function Hero() {
  const handleCopy = () => {
    const copy = navigator.clipboard.writeText("developeraromal@gmail.com");
    return copy;
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden mb-10">
      <div className="absolute w-60 h-60 bg-sky-500 blurr  translate-x-1/2 right-1/2 bottom-0" />
      <div className="absolute w-60 h-10 bg-sky-500 blurr  translate-x-1/2 left-2/3 bottom-0" />
      <div className="absolute w-60 h-10 bg-sky-400 blurr  translate-x-1/2 bottom-0" />
      <div className="relative h-60 w-full z-[19] mt-8">
        <div className="relative z-20 mx-auto mt-32 mb-2 flex max-w-full flex-col items-center justify-center px-3 md:mt-36 md:max-w-4xl lg:max-w-5xl">
          <Link
            className="group flex cursor-pointer items-center rounded-full border border-black/5 bg-neutral-200 text-sm backdrop-blur-xs transition-transform duration-300 ease-in lg:text-base dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 animate-fadeInDown"
            href="/projects/next-venture"
          >
            <span className="mx-1 rounded-full bg-blue-700 px-1.5 text-xs leading-relaxed text-white">
              New
            </span>
            <span
              className="relative text-[rgb(0,0,0,65%)] dark:text-[rgb(255,255,255,90%)] px-1 py-0.5"
              style={{
                maskImage: `linear-gradient(
                  -75deg,
                  var(--primary) calc(var(--x) + 20%),
                  transparent calc(var(--x) + 30%),
                  var(--primary) calc(var(--x) + 100%)
                )`,
                WebkitMaskImage: `linear-gradient(
                  -75deg,
                  var(--primary) calc(var(--x) + 20%),
                  transparent calc(var(--x) + 30%),
                  var(--primary) calc(var(--x) + 100%)
               )`,
                textShadow: `
                  rgba(255, 255, 255, 0.3) 0px 0px 10px,
                  rgba(255, 255, 255, 0.2) 0px 0px 20px,
                  rgba(255, 255, 255, 0.1) 0px 0px 30px
                `,
                // CSS custom properties should be set via style attribute
                // But in React, setting --x directly requires defining it as a string key:
                // ["--x"]: "-98.50952%",
                transform: "none",
              }}
            >
              StudBud AI is live!
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-right mr-1 size-4 text-black dark:text-neutral-100/70 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 hover:duration-300"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </Link>
          <h2 className="animate-fadeInUp mt-10 w-full py-px text-center text-4xl leading-snug! font-semibold text-balance text-zinc-700 opacity-90 md:text-5xl lg:text-6xl dark:text-zinc-100">
            <span className="md:text-nowrap">StudBud helps students</span>
            <br className="hidden md:block" />
            school life with{" "}
            <span className="font-nyght bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text font-light tracking-wide text-transparent dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
              smart,with AI
            </span>
          </h2>
          <h1 className="animate-fadeInUp grad-white relative z-20 mb-7 flex flex-col items-center justify-center text-center text-xl sm:flex-row md:text-xl lg:text-2xl">
            <span className="grad-white flex items-center justify-center">
              A full application
              <div className="group relative z-300">
                <div className="mx-2 w-16 cursor-pointer overflow-hidden rounded-3xl md:w-20 lg:mx-3">
                  {/* image */}
                  <Image
                    width={150}
                    height={50}
                    src={"/assets/logostudbud.png"}
                    alt="logo"
                  />
                </div>
                <svg
                  aria-hidden="true"
                  className="group-hover:animate-wave pointer-events-none absolute bottom-0 left-0 hidden size-6 animate-none delay-200 group-hover:block"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m4.861 9.147c.94-.657 2.357-.531 3.201.166l-.968-1.407c-.779-1.111-.5-2.313.612-3.093 1.112-.777 4.263 1.312 4.263 1.312-.786-1.122-.639-2.544.483-3.331 1.122-.784 2.67-.513 3.456.611l10.42 14.72-1.328 12.875-11.083-4.042-9.667-14.333c-.793-1.129-.519-2.686.611-3.478z"
                    fill="#ef9645"
                  ></path>
                  <path
                    d="m2.695 17.336s-1.132-1.65.519-2.781c1.649-1.131 2.78.518 2.78.518l5.251 7.658c.181-.302.379-.6.6-.894l-7.288-10.627s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l6.855 9.997c.255-.208.516-.417.785-.622l-7.947-11.591s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l7.947 11.589c.292-.179.581-.334.871-.498l-7.428-10.832s-1.131-1.649.518-2.78 2.78.518 2.78.518l7.854 11.454 1.194 1.742c-4.948 3.394-5.419 9.779-2.592 13.902.565.825 1.39.26 1.39.26-3.393-4.949-2.357-10.51 2.592-13.903l-1.459-7.302s-.545-1.924 1.378-2.47c1.924-.545 2.47 1.379 2.47 1.379l1.685 5.004c.668 1.984 1.379 3.961 2.32 5.831 2.657 5.28 1.07 11.842-3.94 15.279-5.465 3.747-12.936 2.354-16.684-3.11z"
                    fill="#ffdc5d"
                  ></path>
                  <g fill="#5dadec">
                    <path d="m12 32.042c-4 0-8.042-4.042-8.042-8.042 0-.553-.405-1-.958-1s-1.042.447-1.042 1c0 6 4.042 10.042 10.042 10.042.553 0 1-.489 1-1.042s-.447-.958-1-.958z"></path>
                    <path d="m7 34c-3 0-5-2-5-5 0-.553-.447-1-1-1s-1 .447-1 1c0 4 3 7 7 7 .553 0 1-.447 1-1s-.447-1-1-1zm17-32c-.552 0-1 .448-1 1s.448 1 1 1c4 0 8 3.589 8 8 0 .552.448 1 1 1s1-.448 1-1c0-5.514-4-10-10-10z"></path>
                    <path d="m29 .042c-.552 0-1 .406-1 .958s.448 1.042 1 1.042c3 0 4.958 2.225 4.958 4.958 0 .552.489 1 1.042 1s.958-.448.958-1c0-3.837-2.958-6.958-6.958-6.958z"></path>
                  </g>
                </svg>
              </div>
            </span>
            <span className="grad-white leading-relaxed">
              for the Entire School Building
            </span>
          </h1>

          <div className="animate-fadeInUp z-100  flex flex-col items-center justify-center gap-6 sm:flex-row  md:gap-10">
            <button
              className="group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/30 bg-black/20 py-[3px] pr-[3px] pl-2 text-base font-medium opacity-85 backdrop-blur-xs transition-all hover:bg-transparent md:py-1 md:pr-1 md:pl-3 dark:border-white/10 dark:bg-white/10"
              onClick={handleCopy}
            >
              <span className="z-10 px-3 text-black transition-colors duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black">
                Try Demo
              </span>
              <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-white"></span>
              <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2 transition-colors duration-300 group-hover:bg-transparent md:p-2.5 dark:bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-right text-white transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0 dark:text-black"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-right absolute -translate-x-5 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 py-3 text-base font-light text-black dark:text-white/75 outline-hidden transition-all duration-300 cursor-pointer hover:text-black/60 dark:hover:text-white/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-copy"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
              developeraromal@gmail.com
            </button>
          </div>
        </div>

        {/* place of arc */}

        <div
          className="absolute -bottom-110 left-1/2 z-0 h-[400px] w-[1200px] -translate-x-1/2 transform overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
          }}
        >
          <div
            className="absolute bottom-[167px] left-1/2 h-[111px] w-[787px] -translate-x-1/2 transform overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,#5506ba_0%,rgba(10,10,10,0)_100%)] blur-[57px]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #1797ff 0%, rgba(10,10,10,0) 100%)",
              transform: "translateX(-61.0227px)",
            }}
          ></div>
          <div className="absolute right-[-432px] bottom-[-753px] left-[-454px] h-[955px] rounded-[100%] bg-gradient-to-b from-black to-transparent dark:from-white"></div>
          <div
            className="absolute right-[-510px] bottom-[-759px] left-[-532px] aspect-[2.346820809248555/1] h-[956px] rounded-[100%] shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d] dark:bg-black"
            style={{
              boxShadow:
                "inset 0 2px 22.8022px #000000, 0 -10px 52.8022px 1px rgba(255, 255, 255, 0.53)",
              backgroundColor: "#000000",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
