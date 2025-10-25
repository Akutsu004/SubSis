import { FaMoneyBillWave } from "react-icons/fa";

export default function Billing() {
  const treatments = [
    { patient: "John Doe", service: "Tooth Extraction", cost: 1500 },
    { patient: "Jane Smith", service: "Teeth Cleaning", cost: 800 },
  ];

  const total = treatments.reduce((sum, t) => sum + t.cost, 0);

  return (
    <div className="container mx-auto space-y-10">

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaMoneyBillWave className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Billing Summary</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track and review the payment details for patient dental services.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Payment Records
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Patient</th>
                <th className="p-3 border border-blue-100">Service</th>
                <th className="p-3 border border-blue-100">Cost (₱)</th>
              </tr>
            </thead>

            <tbody>
              {treatments.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3 text-gray-700 font-medium">{t.patient}</td>
                  <td className="p-3 text-gray-600">{t.service}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    ₱{t.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-gray-50 font-semibold text-gray-700">
                <td colSpan={2} className="p-3 text-right">
                  Total:
                </td>
                <td className="p-3 text-blue-600">
                  ₱{total.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
