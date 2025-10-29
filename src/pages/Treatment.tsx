import { useState } from "react";
import { FaUserMd, FaSyncAlt } from "react-icons/fa";

interface TreatmentRecord {
  patient: string;
  diagnosis: string;
  services: string[];
  medicines: string[];
  syncedTo: {
    billing: boolean;
    inventory: boolean;
    emr: boolean;
  };
}

export default function Treatment() {
  const [records, setRecords] = useState<TreatmentRecord[]>([]);
  const [patient, setPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [service, setService] = useState("");
  const [medicine, setMedicine] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleAddRecord = () => {
    if (!patient || !diagnosis) {
      alert("Please complete patient name and diagnosis.");
      return;
    }

    const newRecord: TreatmentRecord = {
      patient,
      diagnosis,
      services: service ? [service] : [],
      medicines: medicine ? [medicine] : [],
      syncedTo: { billing: false, inventory: false, emr: false },
    };

    setRecords((prev) => [...prev, newRecord]);

    // Reset input fields
    setPatient("");
    setDiagnosis("");
    setService("");
    setMedicine("");

    // Simulate system sync
    setIsSyncing(true);
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r) =>
          r.patient === newRecord.patient && r.diagnosis === newRecord.diagnosis
            ? {
                ...r,
                syncedTo: { billing: true, inventory: true, emr: true },
              }
            : r
        )
      );
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaUserMd className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Consultation & Treatment Recording
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Record patient treatments and let the system automatically sync with
            billing, inventory, and patient records.
          </p>
        </div>
      </div>

      {/* Consultation Form */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <FaUserMd className="text-blue-600" />
          <span>Treatment Details Entry</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            type="text"
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            type="text"
            placeholder="Service (Optional)"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            type="text"
            placeholder="Medicine / Supplement (Optional)"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
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
              {records.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="p-3 font-medium text-gray-700">
                    {r.patient}
                  </td>
                  <td className="p-3 text-gray-700">{r.diagnosis}</td>
                  <td className="p-3 text-gray-600">{r.services.join(", ")}</td>
                  <td className="p-3 text-gray-600">
                    {r.medicines.join(", ")}
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
                        <FaSyncAlt className="animate-spin-slow" />
                        Syncing to System...
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {records.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4 italic">
              No treatment records yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
