"use client";

import { useEffect, useState } from "react";
import FlashCardDeck from "@/app/components/includes/FlashcardDeck";
import SingleFlashCard from "@/app/components/includes/SingleFlashCard";

export default function FlashCards() {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");

  //old deck
  // const [decks, setDecks] = useState([
  //   {
  //     title: "Biology Basics",
  //     cardCount: 10,
  //     time: "8 ",
  //     progress: 70,
  //     subject: "Biology",
  //     cards: [
  //       { question: "What is the basic unit of life?", answer: "Cell" },
  //       {
  //         question: "What does DNA stand for?",
  //         answer: "Deoxyribonucleic Acid",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Math Essentials",
  //     cardCount: 12,
  //     time: "10 ",
  //     progress: 40,
  //     subject: "Maths",
  //     cards: [
  //       { question: "What is 7 x 8?", answer: "56" },
  //       { question: "What is the value of π?", answer: "Approximately 3.1416" },
  //     ],
  //   },
  //   {
  //     title: "History Overview",
  //     cardCount: 8,
  //     time: "6 ",
  //     progress: 90,
  //     subject: "History",
  //     cards: [
  //       {
  //         question: "Who was the first President of the USA?",
  //         answer: "George Washington",
  //       },
  //       { question: "When did World War II end?", answer: "1945" },
  //     ],
  //   },
  //   {
  //     title: "Physics Formulas",
  //     cardCount: 15,
  //     time: "11 ",
  //     progress: 55,
  //     subject: "Physics",
  //     cards: [
  //       { question: "What is Newton's Second Law?", answer: "F = ma" },
  //       { question: "Speed formula?", answer: "Speed = Distance / Time" },
  //     ],
  //   },
  //   {
  //     title: "Chemistry Core",
  //     cardCount: 9,
  //     time: "7 ",
  //     progress: 60,
  //     subject: "Chemistry",
  //     cards: [
  //       { question: "Symbol for Sodium?", answer: "Na" },
  //       { question: "Atomic number of Oxygen?", answer: "8" },
  //     ],
  //   },
  //   {
  //     title: "English Grammar",
  //     cardCount: 14,
  //     time: "9 ",
  //     progress: 75,
  //     subject: "English",
  //     cards: [
  //       { question: "What is a noun?", answer: "A person, place, or thing" },
  //       {
  //         question: "Give an example of a verb.",
  //         answer: "Run, eat, think...",
  //       },
  //     ],
  //   },
  // ]);
  //new decks

  const [decks, setDecks] = useState([
    {
      title: "Biology Basics",
      time: "8",
      progress: 70,
      subject: "Biology",
      cards: [
        { question: "What is the basic unit of life?", answer: "Cell" },
        {
          question: "What does DNA stand for?",
          answer: "Deoxyribonucleic Acid",
        },
        {
          question: "What organelle is the powerhouse of the cell?",
          answer: "Mitochondria",
        },
        {
          question: "What is the process of cell division called?",
          answer: "Mitosis",
        },
        {
          question: "Which system is responsible for transporting blood?",
          answer: "Circulatory system",
        },
        {
          question: "What is the function of red blood cells?",
          answer: "Transport oxygen",
        },
        {
          question: "What is osmosis?",
          answer: "Movement of water through a semipermeable membrane",
        },
      ],
    },
    {
      title: "Math Essentials",
      time: "10",
      progress: 40,
      subject: "Maths",
      cards: [
        { question: "What is 7 x 8?", answer: "56" },
        { question: "What is the value of π?", answer: "Approximately 3.1416" },
        { question: "Solve: 12 + 5 x 2", answer: "22" },
        { question: "What is the square root of 64?", answer: "8" },
        { question: "What is 15% of 200?", answer: "30" },
        {
          question: "What is the formula for area of a circle?",
          answer: "πr²",
        },
        { question: "What is 10 to the power of 0?", answer: "1" },
      ],
    },
    {
      title: "History Overview",
      time: "6",
      progress: 90,
      subject: "History",
      cards: [
        {
          question: "Who was the first President of the USA?",
          answer: "George Washington",
        },
        { question: "When did World War II end?", answer: "1945" },
        { question: "Who discovered America?", answer: "Christopher Columbus" },
        { question: "What wall fell in 1989?", answer: "Berlin Wall" },
        {
          question: "Who was the leader of Nazi Germany?",
          answer: "Adolf Hitler",
        },
        {
          question: "When was the Declaration of Independence signed?",
          answer: "1776",
        },
        {
          question: "Who was the first emperor of Rome?",
          answer: "Augustus Caesar",
        },
      ],
    },
    {
      title: "Physics Formulas",
      time: "11",
      progress: 55,
      subject: "Physics",
      cards: [
        { question: "What is Newton's Second Law?", answer: "F = ma" },
        { question: "Speed formula?", answer: "Speed = Distance / Time" },
        { question: "What is the unit of force?", answer: "Newton" },
        { question: "Formula for potential energy?", answer: "PE = mgh" },
        { question: "What is Ohm's Law?", answer: "V = IR" },
        { question: "What is the speed of light?", answer: "3 x 10⁸ m/s" },
        { question: "Acceleration formula?", answer: "a = (v - u) / t" },
      ],
    },
    {
      title: "Chemistry Core",
      time: "7",
      progress: 60,
      subject: "Chemistry",
      cards: [
        { question: "Symbol for Sodium?", answer: "Na" },
        { question: "Atomic number of Oxygen?", answer: "8" },
        { question: "pH of neutral water?", answer: "7" },
        { question: "Formula for common salt?", answer: "NaCl" },
        { question: "Name of H2O2?", answer: "Hydrogen Peroxide" },
        { question: "Symbol for Iron?", answer: "Fe" },
        {
          question: "What is an acid?",
          answer: "A substance with pH less than 7",
        },
      ],
    },
    {
      title: "English Grammar",
      time: "9",
      progress: 75,
      subject: "English",
      cards: [
        { question: "What is a noun?", answer: "A person, place, or thing" },
        {
          question: "Give an example of a verb.",
          answer: "Run, eat, think...",
        },
        {
          question: "What is an adjective?",
          answer: "A word that describes a noun",
        },
        { question: "What is a synonym for 'happy'?", answer: "Joyful" },
        {
          question: "Define a pronoun.",
          answer: "A word that replaces a noun",
        },
        {
          question: "What is a conjunction?",
          answer: "A word that connects clauses",
        },
        {
          question: "What is a preposition?",
          answer: "A word showing relation to time/place",
        },
      ],
    },
  ]);

  return (
    <section className="flashcards p-6 bg-gray-50 h-full">
      {selectedDeck ? (
        <></>
      ) : (
        <div className="top">
          <h3 className="text-2xl font-bold">🎯 Flashcard Study</h3>
          <p>choose a deck to start learning</p>
        </div>
      )}

      <div className="bottom flex flex-wrap w-full  gap-2 mt-6">
        {selectedDeck ? (
          <>
            <div className="activeDeckView w-full h-full">
              <div className="top mb-3 flex items-center justify-between">
                <button
                  className="p-2 bg-blue-600 rounded-md text-white font-bold"
                  onClick={() => setSelectedDeck(null)}
                >
                  ← Back to all decks
                </button>

                <h4 className="text-lg font-bold ">{selectedDeck.title}</h4>

                <button className="p-2 bg-blue-600 rounded-md text-white font-bold">
                  Reset
                </button>
              </div>

              <div className="question_and_answer w-full flex justify-center ">
                <SingleFlashCard
                  // question_and_answers={decks.map((deck) => deck.cards)}
                  question_and_answers={selectedDeck.cards}
                />
                {/* {flipped ? (
                  <div>
                    <button>yeah i know</button>
                    <button>yeah i don't know</button>
                  </div>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </>
        ) : (
          <>
            {decks.map((deck, index) => (
              <FlashCardDeck
                key={index}
                title={deck.title}
                cardsCount={deck.cards.length}
                timeTaken={deck.time}
                progress={deck.progress}
                onClick={() => {
                  setSelectedDeck(deck);
                  setSelectedSubject(deck.subject);
                }}
              />
            ))}

            <div className="addnewdeck w-1/3 max-w-[30%] hover:scale-105 bg-white drop-shadow-md hover:drop-shadow-lg border-dashed border-2 border-gray-300 hover:border-2 hover:border-sky-500 transition-all duration-100z p-4 rounded-md">
              <div className="texts flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-4xl font-extrabold text-gray-600">+</h2>
                <h4 className="text-lg font-medium">Create new deck</h4>
                <p className="text-sm text-gray-500">
                  build your own flashcard collection
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
