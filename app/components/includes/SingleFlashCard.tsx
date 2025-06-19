"use client";

import { useEffect, useState } from "react";

interface SingleFlashCardProps {
  question_and_answers: Array<any>;
}
//need serious changes on this page, don't touch any thing
export default function SingleFlashCard({
  question_and_answers,
}: SingleFlashCardProps) {
  //for flipping flashcard
  const [flipped, setFlipped] = useState(false);

  //flashcard question and answer usestates
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  //set of question answer bundle for the respective subjects
  const [questionAnswerBundle, setQuestionAnswerBundle] =
    useState(question_and_answers);

  useEffect(() => {
    if (question_and_answers && question_and_answers.length > 0) {
      setQuestionAnswerBundle(question_and_answers);
      setFrontText(question_and_answers[0].question);
      setBackText(question_and_answers[0].answer);
    }
  }, [question_and_answers]);

  //flashcard func
  const handleNext = () => {
    if (currentIndex + 1 < questionAnswerBundle.length) {
      setFlipped(false);

      //Wait for animation to complete before switching content
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setFrontText(questionAnswerBundle[nextIndex].question);
        setBackText(questionAnswerBundle[nextIndex].answer);
      }, 300);
    } else {
      alert("🎉 You've finished all the flashcards!");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div
        className="w-120 h-80 drop-shadow-xl  rounded-md perspective"
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
      {flipped ? (
        <div className="buttons mt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleNext}
            className="p-2 bg-green-100 border-1 border-green-400 rounded-md text-green-600 font-bold"
          >
            ✅ I Got it
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-red-100 border-1 border-red-600 rounded-md text-red-600 font-bold"
          >
            ❌ I didn't Know
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
