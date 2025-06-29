"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";

interface Settings {
  join_before_host: boolean;
  waiting_room: boolean;
}

interface MeetingData {
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  password: string;
  settings: Settings;
}

const timezones = [
  "Asia/Kolkata",
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];

const CreateMeeting: React.FC = () => {
  const [meeting, setMeeting] = useState<MeetingData>({
    topic: "",
    type: 2,
    start_time: "",
    duration: 30,
    timezone: "Asia/Kolkata",
    password: "",
    settings: {
      join_before_host: false,
      waiting_room: true,
    },
  });

  const [className, setClassName] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "join_before_host" || name === "waiting_room") {
      setMeeting((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          [name]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else if (name === "type" || name === "duration") {
      setMeeting((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setMeeting((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let date = meeting.start_time ? new Date(meeting.start_time) : new Date();

    if (name === "date") {
      const [year, month, day] = value.split("-");
      date.setFullYear(Number(year), Number(month) - 1, Number(day));
    } else {
      const [hour, minute] = value.split(":");
      date.setHours(Number(hour), Number(minute));
    }

    setMeeting((prev) => ({
      ...prev,
      start_time: date.toISOString(),
    }));
  };

  const getDateInputValue = () => {
    return meeting.start_time ? meeting.start_time.split("T")[0] : "";
  };

  const getTimeInputValue = () => {
    return meeting.start_time
      ? meeting.start_time.split("T")[1].slice(0, 5)
      : "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!className.trim()) {
      alert("Class name is required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/v1/create/meet", {
        classname: className.trim(),
        meetingData: meeting,
      });

      if (res.data.success) {
        alert("Meeting created successfully!");

        // Reset form
        setMeeting({
          topic: "",
          type: 2,
          start_time: "",
          duration: 30,
          timezone: "Asia/Kolkata",
          password: "",
          settings: {
            join_before_host: false,
            waiting_room: true,
          },
        });
        setClassName("");
      } else {
        alert("Meeting creation failed.");
      }
    } catch (error: any) {
      console.error("Axios error:", error.response?.data || error.message);
      alert(
        "Something went wrong: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="w-full h-screen bg-white p-6 text-black overflow-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
        <div>
          <label htmlFor="topic" className="block mb-1 font-semibold">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={meeting.topic}
            onChange={handleChange}
            required
            placeholder="Science Class"
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 font-semibold">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={meeting.type}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2"
          >
            <option value={1}>Type 1</option>
            <option value={2}>Type 2</option>
            <option value={3}>Type 3</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="date" className="block mb-1 font-semibold">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={getDateInputValue()}
              onChange={handleDateTimeChange}
              required
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="time" className="block mb-1 font-semibold">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={getTimeInputValue()}
              onChange={handleDateTimeChange}
              required
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block mb-1 font-semibold">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={meeting.duration}
            onChange={handleChange}
            min={1}
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="timezone" className="block mb-1 font-semibold">
            Timezone
          </label>
          <select
            id="timezone"
            name="timezone"
            value={meeting.timezone}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={meeting.password}
            onChange={handleChange}
            placeholder="123456"
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="className" className="block mb-1 font-semibold">
            Class Name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            placeholder="Eg: 10A or Chemistry"
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="font-semibold mb-2">Settings</legend>

          <label className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              name="join_before_host"
              checked={meeting.settings.join_before_host}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Join before host</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="waiting_room"
              checked={meeting.settings.waiting_room}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Waiting room enabled</span>
          </label>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition"
        >
          Create Meeting
        </button>
      </form>
    </div>
  );
};

export default CreateMeeting;
