import { FaMoneyBillWave } from "react-icons/fa";

export default function Billing() {
  const treatments = [
    { patient: "John Doe", service: "Tooth Extraction", cost: 1500 },
    { patient: "Jane Smith", service: "Teeth Cleaning", cost: 800 },
  ];

  const total = treatments.reduce((sum, t) => sum + t.cost, 0);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
      <h1 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
        Billing Summary
      </h1>

      <table className="w-full text-left rounded-xl overflow-hidden">
        <thead className="bg-blue-50 text-gray-700">
          <tr>
            <th className="p-4 font-semibold">Patient</th>
            <th className="p-4 font-semibold">Service</th>
            <th className="p-4 font-semibold">Cost (₱)</th>
          </tr>
        </thead>

        <tbody>
          {treatments.map((t, i) => (
            <tr
              key={i}
              className="border-b hover:bg-blue-50 transition-all duration-200"
            >
              <td className="p-4">{t.patient}</td>
              <td className="p-4">{t.service}</td>
              <td className="p-4 font-medium text-blue-600">
                ₱{t.cost.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="bg-gray-100 font-semibold text-gray-700">
            <td colSpan={2} className="p-4 text-right">
              Total:
            </td>
            <td className="p-4 text-blue-600 flex items-center gap-2">
              <FaMoneyBillWave />
              ₱{total.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
