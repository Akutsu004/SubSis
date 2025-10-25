import { useState } from "react";

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
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Inventory Management
      </h1>

      <table className="w-full text-left border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 border">Item</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Threshold</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={i}
              className={`border ${
                item.stock <= item.threshold ? "bg-red-50" : "hover:bg-gray-50"
              }`}
            >
              <td className="p-3 border">{item.name}</td>
              <td className="p-3 border">{item.stock}</td>
              <td className="p-3 border">{item.threshold}</td>
              <td className="p-3 border">
                <button
                  onClick={() => handleUseItem(i)}
                  disabled={item.stock <= 0}
                  className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                >
                  Use 1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        {items
          .filter((item) => item.stock <= item.threshold)
          .map((lowItem) => (
            <div
              key={lowItem.name}
              className="text-red-600 text-sm font-semibold"
            >
              ⚠️ Low stock alert: {lowItem.name} (only {lowItem.stock} left)
            </div>
          ))}
      </div>
    </div>
  );
}
