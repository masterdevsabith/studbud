"use client";

import FaqItem from "./FaqItem";

const faqData = [
  {
    question: "How do we onboard students to the platform?",
    answer:
      "Getting started is super easy! Simply create your school account, invite teachers via email, and they can add their students. We provide a simple CSV upload tool for bulk student registration, plus step-by-step onboarding guides.",
  },
  {
    question: "Is the platform mobile compatible?",
    answer:
      "Yes, the platform is fully responsive and optimized for phones and tablets.",
  },
  {
    question: "Do teachers need special training to use this?",
    answer:
      "Not at all! Our user-friendly interface ensures anyone can use it with minimal guidance.",
  },
  {
    question: "Can parents join and monitor their child's progress?",
    answer:
      "Absolutely! Parents can access progress reports and receive updates through the platform.",
  },
];

const FaqSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-[#0D0D0D] py-20 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl text-white font-bold flex items-center justify-center gap-2 mb-2">
          <span>❓</span> Frequently Asked Questions
        </h2>
        <p className="text-gray-200">
          Everything you need to know about our platform
        </p>
      </div>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
