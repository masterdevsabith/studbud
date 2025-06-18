import { BookOpen, Clock } from "lucide-react";

interface FlashCardDeckProps {
  title: string;
  cardsCount: number;
  timeTaken: string;
  progress: number;
  onClick: any;
}
export default function FlashCards({
  title,
  cardsCount,
  timeTaken,
  progress,
  onClick,
}: FlashCardDeckProps) {
  return (
    <div
      onClick={onClick}
      className="flashcarddeck w-1/3 max-w-[30%] hover:scale-105 bg-white drop-shadow-md hover:drop-shadow-lg border-2 hover:border-2 hover:border-sky-500 transition-all duration-100z p-4 rounded-md"
    >
      <div className="top flex items-center justify-start space-x-2">
        <BookOpen className="text-blue-600" size={16} />
        <h4>{title}</h4>
      </div>
      <div className="mid flex items-center justify-between mt-2">
        <div className="left flex items-center space-x-2">
          <div className="blue_dot w-2 h-2 bg-blue-600 rounded-full"></div>
          <span>{cardsCount} cards</span>
        </div>
        <div className="right flex items-center space-x-2">
          <Clock className="text-gray-500" size={16} />
          <span>{timeTaken} min</span>
        </div>
      </div>
      <div className="bottom mt-2">
        <div className="progress_bar w-full h-3 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
