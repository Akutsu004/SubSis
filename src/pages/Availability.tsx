"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  FaCalendarAlt,
  FaUserMd,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

interface Appointment {
  id: string;
  title: string;
  dentistId: number;
  start: string;
  end: string;
  status: "booked" | "available";
  recurring?: boolean;
}

interface Dentist {
  id: number;
  name: string;
  color: string;
}

export default function AvailabilityCalendar() {
  const [dentists] = useState<Dentist[]>([
    { id: 1, name: "Dr. Smith", color: "#3B82F6" },
    { id: 2, name: "Dr. Johnson", color: "#10B981" },
    { id: 3, name: "Dr. Lopez", color: "#8B5CF6" },
  ]);

  const [selectedDentist, setSelectedDentist] = useState<number | "all">("all");
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      dentistId: 1,
      title: "Available - Dr. Smith",
      start: "2025-10-27T10:00:00",
      end: "2025-10-27T11:00:00",
      status: "available",
    },
    {
      id: "2",
      dentistId: 2,
      title: "Booked - Dr. Johnson",
      start: "2025-10-27T11:00:00",
      end: "2025-10-27T12:00:00",
      status: "booked",
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState<"booked" | "available">("available");
  const [recurring, setRecurring] = useState(false);

  const filteredAppointments =
    selectedDentist === "all"
      ? appointments
      : appointments.filter((a) => a.dentistId === selectedDentist);

  const handleDateClick = (info: any) => {
    if (selectedDentist === "all") {
      alert("Please select a dentist first.");
      return;
    }
    setEditing(null);
    setStart(info.dateStr);
    setEnd("");
    setStatus("available");
    setRecurring(false);
    setIsDrawerOpen(true);
  };

  const handleEventClick = (info: any) => {
    const event = appointments.find((a) => a.id === info.event.id);
    if (event) {
      setEditing(event);
      setStart(event.start);
      setEnd(event.end);
      setStatus(event.status);
      setRecurring(!!event.recurring);
      setIsDrawerOpen(true);
    }
  };

  const handleSave = () => {
    if (!start || !end) {
      alert("Please enter both start and end times.");
      return;
    }

    if (editing) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editing.id ? { ...a, start, end, status, recurring } : a
        )
      );
    } else {
      const dentist = dentists.find((d) => d.id === selectedDentist);
      if (!dentist) return;
      const newSlot: Appointment = {
        id: String(Date.now()),
        dentistId: dentist.id,
        title: `${status === "available" ? "Available" : "Booked"} - ${
          dentist.name
        }`,
        start,
        end,
        status,
        recurring,
      };
      setAppointments((prev) => [...prev, newSlot]);
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    if (!editing) return;
    if (confirm("Delete this slot?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== editing.id));
      setIsDrawerOpen(false);
    }
  };

  const eventContent = (arg: any) => {
    const dentist = dentists.find(
      (d) => d.id === arg.event.extendedProps.dentistId
    );
    const color = dentist?.color ?? "#3B82F6";
    const bg =
      arg.event.extendedProps.status === "booked"
        ? "#EF4444"
        : color + "CC";

    return (
      <div
        style={{
          backgroundColor: bg,
          color: "white",
          padding: "4px 6px",
          borderRadius: "6px",
          fontSize: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        {arg.event.title}
      </div>
    );
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaCalendarAlt className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Dentist Availability
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            View, add, and manage dentist availability slots for appointments.
          </p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-8 relative overflow-hidden">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Appointment-Based Availability
        </h3>

        {/* Dentist Filter */}
        <div className="mb-4 flex items-center gap-3">
          <FaUserMd className="text-blue-600 text-lg" />
          <select
            className="border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
            value={selectedDentist}
            onChange={(e) =>
              setSelectedDentist(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">All Dentists</option>
            {dentists.map((dentist) => (
              <option key={dentist.id} value={dentist.id}>
                {dentist.name}
              </option>
            ))}
          </select>
        </div>

        {/* FullCalendar */}
        <div className="[&_.fc]:text-gray-700 [&_.fc]:border-blue-100 [&_.fc-scrollgrid]:border-blue-100 [&_.fc-col-header-cell]:bg-blue-50 [&_.fc-col-header-cell]:text-blue-700 [&_.fc-daygrid-day]:hover:bg-blue-50 transition-all">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={filteredAppointments}
            eventContent={eventContent}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            height="auto"
            slotMinTime="10:00:00"
            slotMaxTime="17:00:00"
            allDaySlot={false}
          />
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
              />

              <motion.div
                className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white border border-blue-100 shadow-2xl rounded-2xl p-6 z-50"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    {editing ? "Edit Availability" : "Add Availability"}
                  </h3>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Date Picker */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  className="border border-blue-300 rounded-lg p-2 w-full mb-4 focus:ring focus:ring-blue-200 outline-none"
                  value={start ? start.split("T")[0] : ""}
                  onChange={(e) => {
                    const date = e.target.value;
                    const startTime = start ? start.split("T")[1] : "";
                    const endTime = end ? end.split("T")[1] : "";
                    setStart(date && startTime ? `${date}T${startTime}` : "");
                    setEnd(date && endTime ? `${date}T${endTime}` : "");
                  }}
                />

                {/* Start Time */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Start Time
                </label>
                <select
                  className="border border-blue-300 rounded-lg p-2 w-full mb-4 focus:ring focus:ring-blue-200 outline-none"
                  value={start ? start.split("T")[1]?.slice(0, 5) : ""}
                  onChange={(e) => {
                    const date =
                      start
                        ? start.split("T")[0]
                        : new Date().toISOString().split("T")[0];
                    setStart(`${date}T${e.target.value}`);
                  }}
                >
                  <option value="">Select start time</option>
                  {[
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "12:00",
                    "12:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {/* End Time */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  End Time
                </label>
                <select
                  className="border border-blue-300 rounded-lg p-2 w-full mb-6 focus:ring focus:ring-blue-200 outline-none"
                  value={end ? end.split("T")[1]?.slice(0, 5) : ""}
                  onChange={(e) => {
                    const date =
                      start
                        ? start.split("T")[0]
                        : new Date().toISOString().split("T")[0];
                    setEnd(`${date}T${e.target.value}`);
                  }}
                >
                  <option value="">Select end time</option>
                  {[
                    "10:30",
                    "11:00",
                    "11:30",
                    "12:00",
                    "12:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {/* Status */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "available" | "booked")
                  }
                  className="border border-blue-300 rounded-lg p-2 w-full mb-6 focus:ring focus:ring-blue-200 outline-none"
                >
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                </select>

                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    checked={recurring}
                    onChange={(e) => setRecurring(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-blue-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Repeat weekly</label>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex justify-end gap-3">
                  {editing && (
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all flex items-center gap-2"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <FaSave /> Save
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
