"use client";

import { useState } from "react";

interface SingleFlashCardProps {
  frontText: string;
  backText: string;
}
//need serious changes on this page, don't touch any thing
export default function SingleFlashCard({
  frontText,
  backText,
}: SingleFlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-120 h-80 drop-shadow-2xl  rounded-md perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-500 border-2 border-gray-300 rounded-md transform-style-preserve-3d transition-transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white  rounded-md flex items-center justify-center shadow-md">
          <p className="text-lg font-semibold">{frontText}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-sky-400  rounded-md rotate-y-180 flex items-center justify-center shadow-md">
          <p className="text-lg font-semibold">{backText}</p>
        </div>
      </div>
    </div>
  );
}
