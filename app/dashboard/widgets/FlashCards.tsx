"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

  //modal details + flashcard func
  type FlashcardContent = {
    details?: {
      subject?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };

  type FlashcardType = {
    content: FlashcardContent[];
    progress?: number;
    [key: string]: any;
  } | null;

  const [flashcard, setFlashcard] = useState<FlashcardType[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlashcard = async () => {
      const flashId = localStorage.getItem("flash_id");
      if (!flashId) {
        console.warn("⚠️ No flash_id in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          `https://studbud-backend-server.onrender.com/api/v1/get/flashcard/${flashId}`
        );
        setFlashcard(response.data);
        console.log("📦 Flashcard data:", response.data);
      } catch (error) {
        console.error("❌ Error fetching flashcard:", error);
      }
    };

    fetchFlashcard();
  }, []);

  return (
    <section className="flashcards p-6 bg-white text-black h-full sm:ml-18 lg:ml-0">
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
          //earlier use deck now flashcard
          <>
            {flashcard.map((card, index) =>
              card ? (
                <FlashCardDeck
                  key={index}
                  title={card.content[0]?.details?.subject}
                  cardsCount={
                    card.content?.length ? card.content.length - 1 : 0
                  }
                  timeTaken={card.content[0]?.details?.time}
                  progress={card.progress || 0}
                  onClick={() => {
                    const qaCards = card.content?.slice(1) || [];
                    setSelectedDeck({ cards: qaCards });
                    setSelectedSubject(card.subject);
                  }}
                />
              ) : null
            )}
            <div
              className="addnewdeck w-1/3 max-w-[30%] hover:scale-105 bg-zinc-100 drop-shadow-md hover:drop-shadow-lg border-dashed border-2 border-gray-300 hover:border-2 hover:border-sky-500 transition-all duration-100z p-4 rounded-md"
              onClick={() => setShowModal(true)}
            >
              <div className="texts flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-4xl font-extrabold text-gray-300">+</h2>
                <h4 className="text-lg font-medium">Create new deck</h4>
                <p className="text-sm text-gray-400">
                  build your own flashcard collection
                </p>
              </div>
            </div>
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative">
                  <button
                    className="absolute top-2 right-3 text-gray-600 text-xl"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                  <h3 className="text-xl font-bold mb-4">🧠 Create New Deck</h3>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      📺 YouTube Video Link
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      value={youtubeUrl}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Paste your YouTube link"
                    />
                  </div>

                  <button
                    className="w-full mt-2 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-all"
                    onClick={async () => {
                      if (!youtubeUrl)
                        return alert("Paste a YouTube link first");

                      try {
                        setLoading(true);
                        const response = await axios.post(
                          "https://studbud-backend-server.onrender.com/api/v1/generate/flashcard",
                          { videoUrl: youtubeUrl }
                        );

                        // console.log("✅ Flashcards received:", response.data);

                        // const flashId = response.data[0].flash_id;
                        const flashId = "766faffd-4706-4c82-ac86-0b667117a2d7";
                        localStorage.setItem("flash_id", flashId);
                        setLoading(false);

                        console.log(
                          "✅ flash_id saved in localStorage:",
                          flashId
                        );

                        // optional reset
                        setYoutubeUrl("");
                        setShowModal(false);
                      } catch (error) {
                        console.error("❌ Failed to fetch flashcards:", error);
                        alert("Something went wrong.");
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
