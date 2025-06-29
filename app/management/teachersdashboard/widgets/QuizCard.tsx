import {
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  Eye,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function QuizCard({ quiz }) {
  const totalQuestions =
    Object.keys(quiz.question?.normalQuestions || {}).length +
    Object.keys(quiz.question?.multiplechoice || {}).length;

  useEffect(() => {
    console.log(quiz);
  });

  return (
    <div className="flex justify-between items-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="space-y-2">
        {/* Title and Tags */}
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
            EXAM
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            SCHEDULED
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span>Class {quiz.classname}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{quiz.subject}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>10:00 AM ({quiz.duration} minutes)</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="text-sm text-gray-500">
          {/* You can remove "32 students" if you don't have that data */}
          <span className="mr-4">—</span>
          <span>{totalQuestions} questions</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 text-gray-900">
        <Link
          href={`/management/teachersdashboard/tabs/examandtests/e&t/${quiz.examId}`}
        >
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center gap-1">
            <Eye className="w-4 h-4" />
            View
          </button>
        </Link>
        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center gap-1">
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
