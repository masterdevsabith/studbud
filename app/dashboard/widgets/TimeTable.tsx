"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Events with different soft colors
const events = [
  {
    id: "e1",
    title: "Math Class",
    start: "2025-06-30T09:00:00",
    end: "2025-06-30T10:30:00",
    backgroundColor: "#bfdbfe", // blue-200
  },
  {
    id: "e2",
    title: "Science Fair",
    start: "2025-06-25T11:00:00",
    end: "2025-06-25T13:00:00",
    backgroundColor: "#fde68a", // yellow-200
  },
  {
    id: "e3",
    title: "Art Workshop",
    start: "2025-06-28T14:00:00",
    end: "2025-06-28T15:00:00",
    backgroundColor: "#bbf7d0", // green-200
  },
];

export default function ResponsiveScheduler() {
  return (
    <div className="w-screen h-screen bg-white text-gray-800">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "",
        }}
        events={events}
        editable={false}
        selectable={true}
        height="100%"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        }}
        eventContent={(eventInfo) => (
          <div className="text-sm font-semibold px-1 text-gray-800 truncate">
            {eventInfo.event.title}
          </div>
        )}
        eventDidMount={(info) => {
          const el = info.el.closest(".fc-daygrid-day");
          if (el) {
            el.classList.add("bg-yellow-100"); // or any pastel color
          }
        }}
      />
    </div>
  );
}
