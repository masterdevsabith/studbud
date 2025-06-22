import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
  IconNotebook,
  IconLayoutGrid,
  IconCards,
  IconClipboardList,
  IconChartBar,
  IconLayoutDashboard,
  IconSchool,
} from "@tabler/icons-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const ImageHeader = ({ src }: { src: string }) => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-cover bg-top"
    style={{ backgroundImage: `url(${src})` }}
  />
);
const items = [
  {
    title: "Master Your Homework",
    description: "Easily track assignments and never miss a due date again.",
    header: <ImageHeader src="/assets/hw.png" />,
    icon: <IconNotebook className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Class Management",
    description:
      "Organize classes, schedules, and daily routines effortlessly.",
    header: <ImageHeader src="/assets/class-management.png" />,
    icon: <IconLayoutGrid className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Boost with Flashcards",
    description: "Revise faster with intelligent and interactive flashcards.",
    header: <ImageHeader src="/assets/flashcard.png" />,
    icon: <IconCards className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Quick Forms & Polls",
    description:
      "Create and respond to forms, quizzes, and class polls instantly.",
    header: <ImageHeader src="/assets/forms.jpg" />,
    icon: <IconClipboardList className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Track Academic Progress",
    description: "Stay motivated with insights into your learning journey.",
    header: <ImageHeader src="/assets/planner.png" />,
    icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Personalized Dashboard",
    description:
      "Get a clear view of tasks, subjects, and goals all in one place.",
    header: <ImageHeader src="/assets/dashboard.png" />,
    icon: <IconLayoutDashboard className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Your School Companion",
    description:
      "StudBud is built to make every school day easier and smarter.",
    header: <ImageHeader src="/assets/announcements.png" />,
    icon: <IconSchool className="h-4 w-4 text-neutral-500" />,
  },
];
