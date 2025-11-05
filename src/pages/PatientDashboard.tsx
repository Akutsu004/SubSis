import { FaClipboardList, FaEye, FaFileMedicalAlt, FaTooth, FaChartBar } from "react-icons/fa";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { usePatientContext } from "../contexts/PatientContext";

interface PatientDashboardProps {
  onSelectPatient?: (tab: "treatment" | "chart" | "workspace") => void;
}

export default function PatientDashboardSync({ onSelectPatient }: PatientDashboardProps) {
  const { patientRecords, selectedPatient, setSelectedPatient, setActivePatientForForms } = usePatientContext();

  const handleSelectPatient = (patient: typeof patientRecords[0], tab?: "treatment" | "chart" | "workspace") => {
    setSelectedPatient(patient);
    setActivePatientForForms(patient);
    if (tab && onSelectPatient) {
      onSelectPatient(tab);
    }
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <MdOutlineMonitorHeart className="text-blue-600 text-3xl" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Patient Dashboard Sync
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor patients' recent dental records and follow-up needs. Click on a patient to view details or use action buttons to navigate to related sections.
          </p>
        </div>
        {selectedPatient && (
          <div className="bg-white px-4 py-2 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600">Selected:</p>
            <p className="text-sm font-semibold text-blue-600">{selectedPatient.name}</p>
          </div>
        )}
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
                <th className="p-3 border border-blue-100">Patient ID</th>
                <th className="p-3 border border-blue-100">Last Treatment</th>
                <th className="p-3 border border-blue-100">Prescriptions</th>
                <th className="p-3 border border-blue-100">Follow-Up Date</th>
                <th className="p-3 border border-blue-100">Actions</th>
              </tr>
            </thead>

            <tbody>
              {patientRecords.map((p, i) => (
                <tr
                  key={p.patientId || i}
                  className={`border-b border-gray-100 hover:bg-blue-50 transition duration-200 ${
                    selectedPatient?.patientId === p.patientId ? "bg-blue-100" : ""
                  }`}
                >
                  <td className="p-3 font-medium text-gray-700">{p.name}</td>
                  <td className="p-3 text-gray-600 text-sm">{p.patientId}</td>
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
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleSelectPatient(p)}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition flex items-center gap-1"
                        title="Select Patient"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleSelectPatient(p, "treatment")}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition flex items-center gap-1"
                        title="Go to Treatment"
                      >
                        <FaTooth />
                      </button>
                      <button
                        onClick={() => handleSelectPatient(p, "chart")}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition flex items-center gap-1"
                        title="Go to Dental Chart"
                      >
                        <FaChartBar />
                      </button>
                      <button
                        onClick={() => handleSelectPatient(p, "workspace")}
                        className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200 transition flex items-center gap-1"
                        title="Go to EMR"
                      >
                        <FaFileMedicalAlt />
                      </button>
                    </div>
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
