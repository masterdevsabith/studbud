"use client";

import Hero from "./components/Hero";
import Navbar from "./components/includes/Navbar";
import { BentoGridDemo } from "./components/ui/bento";
import WhoThisIsFor from "./components/whothisisfor/WhoThisIsFor";
import SeeItInAction from "./components/setitanaction/setitanaction";
import WhySchoolsChooseUs from "./components/whyschoolchooseus/Whyschoolchooseus";
import FaqSection from "./components/faq/Faqsection";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#0D0D0D]">
      <Navbar />
      <Hero />
      <BentoGridDemo />
      <WhoThisIsFor />
      <SeeItInAction />
      <WhySchoolsChooseUs />
      <FaqSection />
      <Banner />
      <Footer />
    </main>
  );
}
