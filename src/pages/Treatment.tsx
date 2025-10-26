import { useState } from "react";
import { FaUserMd } from "react-icons/fa";

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
    if (!patient || !diagnosis)
      return alert("Please complete patient name and diagnosis.");

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
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaUserMd className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Treatment & Prescription
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add patient treatment details and keep medical records organized.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Add Treatment Record
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
            className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Save Treatment Record
          </button>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Recorded Treatments
        </h3>

       <div className="overflow-x-auto">
  <table className="w-full text-left border-collapse border border-blue-200 rounded-xl overflow-hidden">
    <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
      <tr>
        <th className="p-3 border border-blue-200">Patient</th>
        <th className="p-3 border border-blue-200">Diagnosis</th>
        <th className="p-3 border border-blue-200">Services</th>
        <th className="p-3 border border-blue-200">Medicines</th>
      </tr>
    </thead>
    <tbody>
      {records.map((r, i) => (
        <tr
          key={i}
          className="border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          <td className="p-3 font-medium text-gray-700 border border-blue-100">
            {r.patient}
          </td>
          <td className="p-3 text-gray-700 border border-blue-100">
            {r.diagnosis}
          </td>
          <td className="p-3 text-gray-600 border border-blue-100">
            {r.services.join(", ")}
          </td>
          <td className="p-3 text-gray-600 border border-blue-100">
            {r.medicines.join(", ")}
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
