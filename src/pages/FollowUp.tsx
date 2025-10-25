import { useState } from "react";
import { FaClock } from "react-icons/fa";

interface FollowUp {
  patientName: string;
  lastVisit: string;
  recommendedAfter: string;
  followUpDate?: string;
  confirmed: boolean;
}

export default function FollowUp() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      patientName: "John Doe",
      lastVisit: "2025-10-20",
      recommendedAfter: "2 weeks",
      confirmed: false,
    },
    {
      patientName: "Jane Smith",
      lastVisit: "2025-10-15",
      recommendedAfter: "1 month",
      confirmed: true,
      followUpDate: "2025-11-15",
    },
  ]);

  const handleConfirm = (index: number) => {
    const updated = [...followUps];
    updated[index].confirmed = true;
    updated[index].followUpDate = new Date().toISOString().split("T")[0];
    setFollowUps(updated);
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaClock className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Follow-Up Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Track and confirm your pending follow-up appointments.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Pending Follow-Ups
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Patient</th>
                <th className="p-3 border border-blue-100">Last Visit</th>
                <th className="p-3 border border-blue-100">Recommended</th>
                <th className="p-3 border border-blue-100">Follow-Up Date</th>
                <th className="p-3 border border-blue-100">Status</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3 text-gray-700 font-medium">
                    {item.patientName}
                  </td>
                  <td className="p-3 text-gray-600">{item.lastVisit}</td>
                  <td className="p-3 text-gray-600">
                    {item.recommendedAfter}
                  </td>
                  <td className="p-3 text-gray-700 font-medium">
                    {item.followUpDate || (
                      <span className="italic text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="p-3">
                    {item.confirmed ? (
                      <span className="px-3 py-1 rounded-lg text-green-700 bg-green-100 font-semibold">
                        Confirmed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleConfirm(i)}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow hover:bg-blue-700 transition"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {followUps.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4 italic">
              No follow-up tasks at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
