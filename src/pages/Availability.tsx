import { useState } from "react";
import MasterLayout from "../components/MasterLayout";

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4">Availability Management</h2>
        <table className="w-full text-left border rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 border">Time Slot</th>
              <th className="p-3 border">Available Dentists</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, i) => (
              <tr key={i} className="border hover:bg-gray-50 transition">
                <td className="p-3 border">{slot.time}</td>
                <td className="p-3 border">
                  <input
                    type="number"
                    min={0}
                    value={slot.availableDentists}
                    onChange={(e) =>
                      updateSlot(i, parseInt(e.target.value) || 0)
                    }
                    className="border rounded px-2 py-1 w-20 text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition">
          Save Availability
        </button>
      </div>
    </div>
  );
}
