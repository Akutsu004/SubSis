import { FaUser, FaClipboardList } from "react-icons/fa";
import { MdOutlineMonitorHeart } from "react-icons/md";

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
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <MdOutlineMonitorHeart className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Patient Dashboard Sync
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor patients’ recent dental records and follow-up needs.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <FaClipboardList className="text-blue-500 text-lg" />
          Patient Records
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Patient</th>
                <th className="p-3 border border-blue-100">Last Treatment</th>
                <th className="p-3 border border-blue-100">Prescriptions</th>
                <th className="p-3 border border-blue-100">Follow-Up Date</th>
              </tr>
            </thead>

            <tbody>
              {patientRecords.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3 font-medium text-gray-700">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.lastTreatment}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {p.prescriptions.map((drug, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium"
                        >
                          {drug}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-blue-600">
                    {p.followUp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {patientRecords.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4 italic">
              No patient records available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
