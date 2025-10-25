import { useState } from "react";
import MasterLayout from "../components/MasterLayout";

interface TreatmentRecord {
  patient: string;
  diagnosis: string;
  services: string[];
  medicines: string[];
}

export default function Treatment() {
  const [records, setRecords] = useState<TreatmentRecord[]>([]);
  const [patient, setPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [service, setService] = useState("");
  const [medicine, setMedicine] = useState("");

  const handleAddRecord = () => {
    if (!patient || !diagnosis) return alert("Please complete details.");

    const newRecord: TreatmentRecord = {
      patient,
      diagnosis,
      services: service ? [service] : [],
      medicines: medicine ? [medicine] : [],
    };
    setRecords([...records, newRecord]);
    setPatient("");
    setDiagnosis("");
    setService("");
    setMedicine("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition space-y-4">
        <h2 className="text-xl font-semibold">Add Treatment Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Medicine / Supplement"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleAddRecord}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Save Treatment Record
        </button>
      </div>

      {/* Treatment Table */}
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4">Recorded Treatments</h2>
        <table className="w-full text-left border rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 border">Patient</th>
              <th className="p-3 border">Diagnosis</th>
              <th className="p-3 border">Services</th>
              <th className="p-3 border">Medicines</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border hover:bg-gray-50 transition">
                <td className="p-3 border">{r.patient}</td>
                <td className="p-3 border">{r.diagnosis}</td>
                <td className="p-3 border">{r.services.join(", ")}</td>
                <td className="p-3 border">{r.medicines.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
