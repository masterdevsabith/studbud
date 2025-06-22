"use client";

import Hero from "./components/Hero";
import Navbar from "./components/includes/Navbar";
import {BentoGridDemo} from "./components/ui/bento";
import WhoThisIsFor from "./components/whothisisfor/WhoThisIsFor";
import SeeItInAction from "./components/setitanaction/setitanaction";
import WhySchoolsChooseUs from "./components/whyschoolchooseus/Whyschoolchooseus";
import FaqSection from "./components/faq/Faqsection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BentoGridDemo/>
      <WhoThisIsFor/>
      <SeeItInAction/>
      <WhySchoolsChooseUs/>
      <FaqSection/>
    </main>
  );
}
