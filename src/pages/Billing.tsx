import { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaUserCircle,
  FaClipboardList,
  FaCashRegister,
  FaReceipt,
  FaPlusCircle,
} from "react-icons/fa";

export default function Billing() {
  const [treatments, setTreatments] = useState<{ service: string; cost: number }[]>([]);
  const [patient, setPatient] = useState("");
  const [newService, setNewService] = useState("");
  const [newCost, setNewCost] = useState<number | string>("");
  const [stage, setStage] = useState<"draft" | "synced" | "paid">("draft");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "PayMongo QR" | "">("");
  const [showToast, setShowToast] = useState(false);

  const total = treatments.reduce((sum, t) => sum + t.cost, 0);

  const sendBillingToFrontDesk = () => {
    console.log("Billing details sent to Front Desk:", { patient, treatments, total });
    setStage("synced");
    setShowToast(true);
  };

  const addService = () => {
    if (!patient) return alert("Please enter patient name first.");
    if (!newService || !newCost) return alert("Please fill in all fields.");
    const updated = [...treatments, { service: newService, cost: Number(newCost) }];
    setTreatments(updated);
    setNewService("");
    setNewCost("");

    if (updated.length > 0) {
      setTimeout(sendBillingToFrontDesk, 1000);
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    setShowPaymentModal(false);
    setStage("paid");
    setTimeout(() => setShowReceipt(true), 500);
  };

  const resetBilling = () => {
    setPatient("");
    setTreatments([]);
    setNewService("");
    setNewCost("");
    setPaymentMethod("");
    setStage("draft");
    setShowReceipt(false);
    setShowPaymentModal(false);
    setShowToast(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="container mx-auto space-y-10 relative pb-16">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3 relative z-10">
        <FaMoneyBillWave className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Billing Summary</h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time billing synchronization between Dentist and Front Desk.
          </p>
        </div>
      </div>

      {/* SECTION 1: PATIENT DETAILS */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-8 space-y-5 relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
          <FaUserCircle className="text-blue-600 text-2xl" />
          Patient Information
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Enter Patient Name"
            className="border border-blue-300 rounded-lg p-2 w-64 focus:ring focus:ring-blue-200 outline-none"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            disabled={stage !== "draft"}
          />
          {patient && stage === "draft" && (
            <button
              onClick={() =>
                confirm("Lock this patient name and start logging services?") &&
                setStage("synced")
              }
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Confirm
            </button>
          )}
        </div>
      </div>

      {/* SECTION 2: SERVICES */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-8 relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4">
          <FaClipboardList className="text-blue-600 text-2xl" />
          Log Services, Medicines, and Supplements
        </h3>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Service / Medicine"
            className="border border-blue-300 rounded-lg p-2 w-56 focus:ring focus:ring-blue-200 outline-none"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            disabled={stage === "paid"}
          />
          <input
            type="number"
            placeholder="Cost"
            className="border border-blue-300 rounded-lg p-2 w-32 focus:ring focus:ring-blue-200 outline-none"
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
            disabled={stage === "paid"}
          />
          <button
            onClick={addService}
            disabled={stage === "paid" || !patient}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white ${
              stage !== "paid"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <FaPlusCircle /> Add
          </button>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto rounded-lg border border-blue-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
              <tr>
                <th className="p-3 border border-blue-100">Service / Item</th>
                <th className="p-3 border border-blue-100 text-right">Cost (₱)</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-blue-50 hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3 text-gray-700 font-medium">{t.service}</td>
                  <td className="p-3 text-right font-semibold text-blue-600">
                    ₱{t.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold text-gray-700">
                <td className="p-3 text-right">Total:</td>
                <td className="p-3 text-right text-blue-600">
                  ₱{total.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {stage === "synced" && treatments.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              <FaCashRegister /> Process Payment
            </button>
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/20"
            onClick={() => setShowPaymentModal(false)}
          ></div>

          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-blue-100 z-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCashRegister className="text-blue-600" /> Select Payment Method
            </h3>

            <div className="space-y-3 mb-6">
              {["Cash", "PayMongo QR"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                    paymentMethod === method
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-gray-700">{method}</span>
                  <input
                    type="radio"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method as any)}
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/20"
            onClick={resetBilling}
          ></div>

          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-blue-100 z-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaReceipt className="text-blue-600" /> Digital Receipt
            </h3>
            <p className="text-gray-600 mb-4">
              Payment completed for <strong>{patient}</strong> via{" "}
              <strong>{paymentMethod}</strong>.
            </p>
            <ul className="mb-4 text-gray-700">
              {treatments.map((t, i) => (
                <li key={i} className="flex justify-between border-b py-1">
                  <span>{t.service}</span>
                  <span>₱{t.cost.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-gray-800 text-right mb-6">
              Total: ₱{total.toLocaleString()}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  window.print();
                  resetBilling();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
              >
                Print / Download
              </button>
              <button
                onClick={resetBilling}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-sm animate-fade-in-out">
          🔄 Billing automatically synced to Front Desk!
        </div>
      )}
    </div>
  );
}
