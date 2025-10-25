export default function Billing() {
  const treatments = [
    { patient: "John Doe", service: "Tooth Extraction", cost: 1500 },
    { patient: "Jane Smith", service: "Teeth Cleaning", cost: 800 },
  ];

  const total = treatments.reduce((sum, t) => sum + t.cost, 0);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <table className="w-full text-left border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 border">Patient</th>
            <th className="p-3 border">Service</th>
            <th className="p-3 border">Cost (₱)</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((t, i) => (
            <tr key={i} className="border hover:bg-gray-50">
              <td className="p-3 border">{t.patient}</td>
              <td className="p-3 border">{t.service}</td>
              <td className="p-3 border">{t.cost.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td colSpan={2} className="p-3 text-right border">
              Total:
            </td>
            <td className="p-3 border">₱{total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
