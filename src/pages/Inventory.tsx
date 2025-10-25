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
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-4">
      <h1 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
        Inventory Management
      </h1>

      <table className="w-full text-left rounded-xl overflow-hidden">
        <thead className="bg-blue-50 text-gray-700">
          <tr>
            <th className="p-4 font-medium">Item</th>
            <th className="p-4 font-medium">Stock</th>
            <th className="p-4 font-medium">Threshold</th>
            <th className="p-4 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => {
            const isLow = item.stock <= item.threshold;
            return (
              <tr
                key={i}
                className={`border-b transition-all duration-200 ${
                  isLow ? "bg-red-50 text-red-700" : "hover:bg-blue-50"
                }`}
              >
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4">{item.threshold}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleUseItem(i)}
                    disabled={item.stock <= 0}
                    className={`px-3 py-1 rounded font-medium transition ${
                      isLow
                        ? "bg-red-500 text-white hover:bg-red-600"
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

      <div className="space-y-1">
        {items
          .filter((item) => item.stock <= item.threshold)
          .map((lowItem) => (
            <div
              key={lowItem.name}
              className="text-red-600 text-sm font-semibold flex items-center gap-2"
            >
              <FaBoxOpen />
              Low stock alert: {lowItem.name} (only {lowItem.stock} left)
            </div>
          ))}
      </div>
    </div>
  );
}
