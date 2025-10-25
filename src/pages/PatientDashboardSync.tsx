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
    <div className="bg-white rounded-xl p-6 shadow">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Patient Dashboard Sync
      </h1>

      <table className="w-full text-left border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 border">Patient</th>
            <th className="p-3 border">Last Treatment</th>
            <th className="p-3 border">Prescriptions</th>
            <th className="p-3 border">Follow-Up Date</th>
          </tr>
        </thead>
        <tbody>
          {patientRecords.map((p, i) => (
            <tr key={i} className="border hover:bg-gray-50">
              <td className="p-3 border">{p.name}</td>
              <td className="p-3 border">{p.lastTreatment}</td>
              <td className="p-3 border">{p.prescriptions.join(", ")}</td>
              <td className="p-3 border">{p.followUp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
