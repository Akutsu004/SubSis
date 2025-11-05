import { useState, useEffect } from "react";
import { FaUserMd, FaSyncAlt, FaUserFriends, FaFileMedicalAlt, FaChartBar } from "react-icons/fa";
import { usePatientContext } from "../contexts/PatientContext";

interface TreatmentProps {
  onNavigate?: (tab: "patient" | "chart" | "workspace") => void;
}

export default function Treatment({ onNavigate }: TreatmentProps) {
  const {
    selectedPatient,
    activePatientForForms,
    treatmentRecords,
    addTreatmentRecord,
    patientRecords,
  } = usePatientContext();

  const [patient, setPatient] = useState("");
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [service, setService] = useState("");
  const [medicine, setMedicine] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  // Auto-fill patient info when a patient is selected
  useEffect(() => {
    if (activePatientForForms) {
      setPatient(activePatientForForms.name || "");
      setPatientId(activePatientForForms.patientId || "");
    }
  }, [activePatientForForms]);

  // Auto-fill when selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      setPatient(selectedPatient.name);
      setPatientId(selectedPatient.patientId);
    }
  }, [selectedPatient]);

  const handleAddRecord = () => {
    if (!patient || !diagnosis) {
      alert("Please complete patient name and diagnosis.");
      return;
    }

    // Find or create patient ID
    const foundPatient = patientRecords.find((p) => p.name === patient || p.patientId === patientId);
    const finalPatientId = patientId || foundPatient?.patientId || `P-${Date.now()}`;

    addTreatmentRecord({
      patient,
      patientId: finalPatientId,
      diagnosis,
      services: service ? [service] : [],
      medicines: medicine ? [medicine] : [],
    });

    // Reset input fields
    setPatient("");
    setPatientId("");
    setDiagnosis("");
    setService("");
    setMedicine("");

    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaUserMd className="text-blue-600 text-3xl" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Consultation & Treatment Recording
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Record patient treatments and let the system automatically sync with
            billing, inventory, and patient records.
          </p>
        </div>
        {selectedPatient && (
          <div className="bg-white px-4 py-2 rounded-lg border border-blue-200 flex items-center gap-2">
            <FaUserFriends className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Selected:</p>
              <p className="text-sm font-semibold text-blue-600">{selectedPatient.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      {onNavigate && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate("patient")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
            >
              <FaUserFriends /> View Patient Dashboard
            </button>
            <button
              onClick={() => onNavigate("chart")}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm"
            >
              <FaChartBar /> Open Dental Chart
            </button>
            <button
              onClick={() => onNavigate("workspace")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition text-sm"
            >
              <FaFileMedicalAlt /> Open EMR
            </button>
          </div>
        </div>
      )}

      {/* Consultation Form */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <FaUserMd className="text-blue-600" />
          <span>Treatment Details Entry</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Patient Name</label>
            <input
              type="text"
              placeholder="Patient Name"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Patient ID (Optional)</label>
            <input
              type="text"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Diagnosis *</label>
            <input
              type="text"
              placeholder="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Service (Optional)</label>
            <input
              type="text"
              placeholder="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Medicine / Supplement (Optional)</label>
            <input
              type="text"
              placeholder="Medicine / Supplement"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddRecord}
            disabled={isSyncing}
            className={`mt-6 px-6 py-2.5 rounded-xl shadow-md transition-all duration-200 ${
              isSyncing
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSyncing ? "Syncing..." : "Save Treatment Record"}
          </button>
        </div>
      </div>

      {/* Synced Records */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <FaSyncAlt className="text-blue-600" />
          <span>Synced Treatment Records</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Date</th>
                <th className="p-3 border border-blue-100">Patient</th>
                <th className="p-3 border border-blue-100">Diagnosis</th>
                <th className="p-3 border border-blue-100">Services</th>
                <th className="p-3 border border-blue-100">Medicines</th>
                <th className="p-3 border border-blue-100">
                  System Sync Status
                </th>
              </tr>
            </thead>
            <tbody>
              {treatmentRecords.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="p-3 text-gray-600 text-sm">{r.date}</td>
                  <td className="p-3 font-medium text-gray-700">
                    {r.patient}
                  </td>
                  <td className="p-3 text-gray-700">{r.diagnosis}</td>
                  <td className="p-3 text-gray-600">{r.services.join(", ") || "N/A"}</td>
                  <td className="p-3 text-gray-600">
                    {r.medicines.join(", ") || "N/A"}
                  </td>
                  <td className="p-3 text-sm">
                    {r.syncedTo.billing &&
                    r.syncedTo.inventory &&
                    r.syncedTo.emr ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-green-700 bg-green-100 px-2 py-1 rounded-lg font-semibold text-xs">
                          ✔ Sent to Front Desk (Billing)
                        </span>
                        <span className="text-green-700 bg-green-100 px-2 py-1 rounded-lg font-semibold text-xs">
                          ✔ Sent to Inventory (Stock Deduction)
                        </span>
                        <span className="text-green-700 bg-green-100 px-2 py-1 rounded-lg font-semibold text-xs">
                          ✔ Sent to Patient Records (EMR)
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <FaSyncAlt className="animate-spin" />
                        Syncing to System...
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {treatmentRecords.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4 italic">
              No treatment records yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
