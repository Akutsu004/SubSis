import { useState } from "react";
import { FaClock } from "react-icons/fa";

interface Slot {
  time: string;
  availableDentists: number;
}

export default function Availability() {
  const [slots, setSlots] = useState<Slot[]>([
    { time: "09:00 AM - 10:00 AM", availableDentists: 2 },
    { time: "10:00 AM - 11:00 AM", availableDentists: 1 },
    { time: "11:00 AM - 12:00 PM", availableDentists: 0 },
  ]);

  const updateSlot = (index: number, newValue: number) => {
    const updated = [...slots];
    updated[index].availableDentists = newValue;
    setSlots(updated);
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaClock className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Availability Management
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage dentist availability per time slot.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Time Slot Overview
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Time Slot</th>
                <th className="p-3 border border-blue-100">Available Dentists</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="p-3 text-gray-700 font-medium">
                    {slot.time}
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min={0}
                      value={slot.availableDentists}
                      onChange={(e) =>
                        updateSlot(i, parseInt(e.target.value) || 0)
                      }
                      className="border border-blue-300 rounded-lg px-3 py-1 w-24 text-center focus:ring focus:ring-blue-200 outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200">
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
}
