import { useState } from "react";

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
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Follow-Up Management
      </h1>

      <table className="w-full text-left border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 border">Patient</th>
            <th className="p-3 border">Last Visit</th>
            <th className="p-3 border">Recommended</th>
            <th className="p-3 border">Follow-Up Date</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map((item, i) => (
            <tr key={i} className="border hover:bg-gray-50">
              <td className="p-3 border">{item.patientName}</td>
              <td className="p-3 border">{item.lastVisit}</td>
              <td className="p-3 border">{item.recommendedAfter}</td>
              <td className="p-3 border">{item.followUpDate || "Pending"}</td>
              <td className="p-3 border">
                {item.confirmed ? (
                  <span className="text-green-600 font-semibold">
                    Confirmed
                  </span>
                ) : (
                  <button
                    onClick={() => handleConfirm(i)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
