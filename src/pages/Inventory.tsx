import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";

interface Item {
  name: string;
  stock: number;
  threshold: number;
}

export default function Inventory() {
  const [items, setItems] = useState<Item[]>([
    { name: "Anesthetic", stock: 15, threshold: 10 },
    { name: "Filling Material", stock: 5, threshold: 10 },
    { name: "Gloves", stock: 50, threshold: 20 },
  ]);

  const handleUseItem = (index: number) => {
    const updated = [...items];
    updated[index].stock -= 1;
    setItems(updated);
  };

  return (
    <div className="container mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3">
        <FaBoxOpen className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Inventory Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor, update, and track clinic supplies.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Available Supplies
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Item</th>
                <th className="p-3 border border-blue-100">Stock</th>
                <th className="p-3 border border-blue-100">Threshold</th>
                <th className="p-3 border border-blue-100">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => {
                const isLow = item.stock <= item.threshold;
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 transition duration-200 ${
                      isLow ? "bg-red-50 text-red-700" : "hover:bg-blue-50"
                    }`}
                  >
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.stock}</td>
                    <td className="p-3">{item.threshold}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleUseItem(i)}
                        disabled={item.stock <= 0}
                        className={`px-4 py-1.5 rounded-lg shadow font-medium transition ${
                          isLow
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                      >
                        Use 1
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {items.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4 italic">
              Inventory list is currently empty.
            </p>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="space-y-2 mt-5">
          {items
            .filter((item) => item.stock <= item.threshold)
            .map((lowItem) => (
              <div
                key={lowItem.name}
                className="flex items-center gap-2 text-red-700 font-medium bg-red-50 border border-red-200 px-3 py-2 rounded-lg shadow-sm"
              >
                <FaBoxOpen className="text-red-600" />
                Low stock alert: {lowItem.name} — only {lowItem.stock} left!
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
