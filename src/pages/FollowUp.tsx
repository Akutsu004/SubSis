import { useState } from "react";
import {
  FaCalendarCheck,
  FaClipboardList,
  FaUserCheck,
  FaSyncAlt,
} from "react-icons/fa";

interface AvailabilitySlot {
  dentistId: number;
  dentistName: string;
  start: string;
  end: string;
  status: "available" | "booked";
}

interface FollowUp {
  patientName: string;
  lastVisit: string;
  recommendedAfter: string;
  preferredDate?: string;
  dentist?: string;
  followUpDate?: string;
  confirmed: boolean;
  synced: boolean;
}

export default function FollowUp() {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    {
      dentistId: 1,
      dentistName: "Dr. Smith",
      start: "2025-10-27T10:00:00",
      end: "2025-10-27T11:00:00",
      status: "available",
    },
    {
      dentistId: 1,
      dentistName: "Dr. Smith",
      start: "2025-10-27T14:00:00",
      end: "2025-10-27T15:00:00",
      status: "available",
    },
    {
      dentistId: 2,
      dentistName: "Dr. Johnson",
      start: "2025-10-28T11:00:00",
      end: "2025-10-28T12:00:00",
      status: "available",
    },
  ]);

  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      patientName: "John Doe",
      lastVisit: "2025-10-20",
      recommendedAfter: "2 weeks (by Dr. Smith)",
      confirmed: false,
      synced: false,
    },
  ]);

  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dentists = Array.from(new Set(availability.map((a) => a.dentistName)));

  const handleBook = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSaveBooking = () => {
    if (!selectedDentist || !selectedSlot) {
      alert("Please select dentist and slot.");
      return;
    }

    const updatedFollowUps = [...followUps];
    updatedFollowUps[selectedIndex!] = {
      ...updatedFollowUps[selectedIndex!],
      dentist: selectedDentist,
      followUpDate: selectedSlot,
      confirmed: true,
      synced: true,
    };
    setFollowUps(updatedFollowUps);

    const updatedAvailability = availability.map((slot) =>
      slot.start === selectedSlot && slot.dentistName === selectedDentist
        ? { ...slot, status: "booked" as "booked" }
        : slot
    );

    setAvailability(updatedAvailability);
    setSelectedIndex(null);
    setSelectedDentist("");
    setSelectedSlot("");
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaCalendarCheck className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Follow-Up Consultation Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Handles dentist recommendations, front desk confirmations, and
            system synchronization automatically.
          </p>
        </div>
      </div>

      {/* Follow-Up Records Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <FaClipboardList className="text-blue-600" />
          Follow-Up Records Overview
        </h3>

        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
            <tr>
              <th className="p-3 border border-blue-200">Patient</th>
              <th className="p-3 border border-blue-200">Last Visit</th>
              <th className="p-3 border border-blue-200">
                Recommended (By Dentist)
              </th>
              <th className="p-3 border border-blue-200">Dentist (Assigned)</th>
              <th className="p-3 border border-blue-200">Follow-Up Date</th>
              <th className="p-3 border border-blue-200">System Status</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((f, i) => (
              <tr
                key={i}
                className="border-b border-blue-100 hover:bg-blue-50 transition"
              >
                <td className="p-3 font-medium text-gray-700">
                  {f.patientName}
                </td>
                <td className="p-3 text-gray-600">{f.lastVisit}</td>
                <td className="p-3 text-gray-600">{f.recommendedAfter}</td>
                <td className="p-3 text-gray-700">{f.dentist || "—"}</td>
                <td className="p-3 text-gray-700">
                  {f.followUpDate
                    ? new Date(f.followUpDate).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—"}
                </td>
                <td className="p-3 flex items-center gap-2">
                  {f.synced ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-green-700 bg-green-100 font-semibold">
                      <FaSyncAlt className="animate-spin-slow" /> Synced
                    </span>
                  ) : f.confirmed ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-blue-700 bg-blue-100 font-semibold">
                      <FaUserCheck /> Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBook(i)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      Confirm (Front Desk)
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserCheck className="text-blue-600" />
              Confirm Follow-Up Appointment
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Dentist recommended:{" "}
              <strong>{followUps[selectedIndex].recommendedAfter}</strong>
              <br />
              Patient (via email/phone) prefers a confirmed date.
            </p>

            {/* Dentist dropdown */}
            <label className="block text-sm text-gray-600 mb-1">Dentist</label>
            <select
              className="border border-blue-300 rounded-lg p-2 w-full mb-4 focus:ring focus:ring-blue-200 outline-none"
              value={selectedDentist}
              onChange={(e) => setSelectedDentist(e.target.value)}
            >
              <option value="">Select Dentist</option>
              {dentists.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Available Slots */}
            {selectedDentist && (
              <>
                <label className="block text-sm text-gray-600 mb-1">
                  Available Slots
                </label>
                <select
                  className="border border-blue-300 rounded-lg p-2 w-full mb-4 focus:ring focus:ring-blue-200 outline-none"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                >
                  <option value="">Select Slot</option>
                  {availability
                    .filter(
                      (slot) =>
                        slot.dentistName === selectedDentist &&
                        slot.status === "available"
                    )
                    .map((slot, i) => (
                      <option key={i} value={slot.start}>
                        {new Date(slot.start).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </option>
                    ))}
                </select>
              </>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedIndex(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBooking}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
              >
                Save & Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
