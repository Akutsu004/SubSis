import { FaUser } from "react-icons/fa";

export default function PatientDashboardSync() {
  const patientRecords = [
    {
      name: "John Doe",
      followUp: "2025-11-10",
      lastTreatment: "Tooth Extraction",
      prescriptions: ["Pain Reliever", "Antibiotic"],
    },
    {
      name: "Jane Smith",
      followUp: "2025-11-15",
      lastTreatment: "Cleaning",
      prescriptions: ["Fluoride Toothpaste"],
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-4">
      <h1 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
        Patient Dashboard Sync
      </h1>

      <table className="w-full text-left rounded-xl overflow-hidden">
        <thead className="bg-blue-50 text-gray-700">
          <tr>
            <th className="p-4 font-medium flex items-center gap-2">
              <FaUser className="text-blue-600" /> Patient
            </th>
            <th className="p-4 font-medium">Last Treatment</th>
            <th className="p-4 font-medium">Prescriptions</th>
            <th className="p-4 font-medium">Follow-Up Date</th>
          </tr>
        </thead>

        <tbody>
          {patientRecords.map((p, i) => (
            <tr
              key={i}
              className="border-b hover:bg-blue-50 transition-all duration-200"
            >
              <td className="p-4">{p.name}</td>
              <td className="p-4">{p.lastTreatment}</td>
              <td className="p-4">{p.prescriptions.join(", ")}</td>
              <td className="p-4 text-blue-600 font-medium">{p.followUp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
