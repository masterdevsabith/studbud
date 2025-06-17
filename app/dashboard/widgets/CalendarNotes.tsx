"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useState, useEffect } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarNotes() {
  const [date, setDate] = useState<Value>(new Date());
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Record<string, string[]>>({
    "Tue Jun 17 2025": ["Project discussion at 2PM", "Buy notebooks"],
    "Tue Jun 18 2024": ["Submit history assignment"],
    "Wed Jun 19 2024": ["Birthday party 🎉", "Call grandma"],
  });

  // Safely extract the display date
  const formattedDate = (() => {
    if (date instanceof Date) {
      return date.toDateString();
    } else if (Array.isArray(date) && date[0] instanceof Date) {
      return date[0].toDateString(); // just use the start date
    }
    return "Invalid Date";
  })();

  //add new notes
  const handleAddNote = () => {
    if (newNote.trim() === "") return; // Prevent adding empty notes

    setNotes((prevNotes) => {
      const existingNotes = prevNotes[formattedDate] || [];
      return {
        ...prevNotes,
        [formattedDate]: [...existingNotes, newNote.trim()],
      };
    });
    setNewNote(""); // Clear the input after adding
  };

  return (
    <section className="calendar_and_notes">
      <Calendar
        className="mb-5 "
        onChange={setDate}
        value={date}
        prevLabel={"◀️"}
        prev2Label={"⏮️"}
        next2Label={"▶️"}
        nextLabel={"⏭️"}
        tileContent={({ date }) =>
          notes[date.toDateString()]?.length ? (
            <div className="relative w-full h-full flex justify-center items-center ">
              <div className="absolute bottom-0 middle-0 w-2 h-2 rounded-full bg-red-500"></div>
            </div>
          ) : null
        }
      />
      <div className="notes">
        <h3 className="font-bold text-white">Notes for {formattedDate} :</h3>
        {notes[formattedDate]?.length ? (
          <ul className="mb-5 ml-5 italic ">
            {notes[formattedDate].map((note, index) => (
              <li key={index} className="text-gray-200">
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-gray-300">No notes for this day.</p>
        )}
        <textarea
          className="w-full p-2 border rounded bg-white"
          rows={4}
          onChange={(e) => setNewNote(e.target.value)}
          value={newNote}
          placeholder={`Add notes for ${formattedDate}...`}
        />
        <button
          className="mt-2 bg-white text-black px-4 py-1 rounded-md font-bold"
          onClick={handleAddNote}
        >
          + Add Note
        </button>
      </div>
    </section>
  );
}
