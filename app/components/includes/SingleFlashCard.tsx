"use client";

import { useEffect, useState } from "react";
import FlashcardEndPage from "./FlashcardEndPage";

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

  //flashcard markings
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  //flashcard achievements
  const [finished, setFinished] = useState(false);

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

  //flashcard func (old handleNext)
  // const handleNext = () => {
  //   if (currentIndex + 1 < questionAnswerBundle.length) {
  //     setFlipped(false);

  //     //Wait for animation to complete before switching content
  //     setTimeout(() => {
  //       const nextIndex = currentIndex + 1;
  //       setCurrentIndex(nextIndex);
  //       setFrontText(questionAnswerBundle[nextIndex].question);
  //       setBackText(questionAnswerBundle[nextIndex].answer);
  //     }, 300);
  //   } else {
  //     alert("🎉 You've finished all the flashcards!");
  //   }
  // };

  //updated handleNext
  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questionAnswerBundle.length) {
        setCurrentIndex(nextIndex);
        setFrontText(questionAnswerBundle[nextIndex].question);
        setBackText(questionAnswerBundle[nextIndex].answer);
      } else {
        alert("🎉 You've finished all the flashcards!");
        setFinished(true);
      }
    }, 300);
  };

  //marking func
  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    handleNext();
  };

  const handleWrong = () => {
    setWrongCount((prev) => prev + 1);
    // Don't increment progress visually
    setFlipped(false);
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questionAnswerBundle.length) {
        setCurrentIndex(nextIndex);
        setFrontText(questionAnswerBundle[nextIndex].question);
        setBackText(questionAnswerBundle[nextIndex].answer);
      } else {
        alert("Come back later and try Again 😂😹💀");
        setFinished(true);
      }
    }, 300);
  };

  return (
    <section className="single_page_for_flashcards w-full">
      {finished ? (
        <FlashcardEndPage
          correctCount={correctCount}
          wrongCount={wrongCount}
          total={questionAnswerBundle.length}
          onRetry={() => {
            setCurrentIndex(0);
            setCorrectCount(0);
            setWrongCount(0);
            setFinished(false);
            setFrontText(questionAnswerBundle[0].question);
            setBackText(questionAnswerBundle[0].answer);
          }}
          onGoHome={() => {
            // Redirect or call parent handler here
            window.location.href = "/"; // Or use router.push("/") if using next/router
          }}
        />
      ) : (
        <>
          <div className="progress_and_details w-full mb-5">
            <div className="top mb-2 flex items-center justify-between text-gray-700">
              <span>
                Progress: {correctCount + wrongCount}/
                {questionAnswerBundle.length}
              </span>
              <span>
                ✅ {correctCount} | ❌ {wrongCount}
              </span>
            </div>
            <div className="bottom">
              <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="progressbar w-full h-3 rounded-full bg-sky-600"
                  style={{
                    width: `${
                      (correctCount / questionAnswerBundle.length) * 100
                    }%`,
                    transition: "width 0.3s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </div>
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
                  onClick={handleCorrect}
                  className="p-2 bg-green-100 border-1 border-green-400 rounded-md text-green-600 font-bold"
                >
                  ✅ I Got it
                </button>
                <button
                  onClick={handleWrong}
                  className="p-2 bg-red-100 border-1 border-red-600 rounded-md text-red-600 font-bold"
                >
                  ❌ I didn't Know
                </button>
              </div>
            ) : (
              <></>
            )}
          </section>
        </>
      )}
    </section>
  );
}
