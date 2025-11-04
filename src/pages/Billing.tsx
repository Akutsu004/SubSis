import { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaUserCircle,
  FaClipboardList,
  FaCashRegister,
  FaReceipt,
  FaPlusCircle,
  FaCheckSquare,
} from "react-icons/fa";

export default function Billing() {
  const [treatments, setTreatments] = useState<
    { category: string; service: string; detail: string }[]
  >([]);
  const [patient, setPatient] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newService, setNewService] = useState("");
  const [newDetail, setNewDetail] = useState("");

  // Medicine / Supplement details
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [packs, setPacks] = useState("");

  const [stage, setStage] = useState<"draft" | "synced" | "paid">("draft");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 🔹 Predefined Services List
  const servicesList: Record<string, string[]> = {
    "General Dentistry": [
      "General Consultation",
      "Cleaning / Oral Prophylaxis",
      "Tooth Restoration",
      "Fluoride Treatment",
      "Sealant",
    ],
    Orthodontics: [
      "Brace Consultation",
      "Metallic Braces Initial Placement",
      "Adjustments",
      "Bracket Removals",
    ],
    Prosthodontics: ["Removable Dentures", "Crowns"],
    Radiograph: ["Panoramic X-ray", "Periapical X-ray"],
    Retainers: ["Hawley Retainer", "Clear Retainer"],
  };

  const sendBillingToFrontDesk = () => {
    console.log("🦷 Billing details sent to Front Desk:", { patient, treatments });
    setStage("synced");
    setShowToast(true);
  };

  // 🔹 Add Service / Medicine / Supplement
  const addService = () => {
    if (!patient) return alert("Please enter patient name first.");
    if (!newCategory) return alert("Please select a category.");

    let detailText = newDetail || "—";
    let serviceName = newService;

    // Handle Medicine / Supplement with structured details
    if (newCategory === "Medicine" || newCategory === "Supplement") {
      if (!medName) return alert("Please enter medicine/supplement name.");
      if (!dosage || !frequency || !duration)
        return alert("Please complete dosage, frequency, and duration details.");
      serviceName = medName;
      detailText = `${dosage}, ${frequency} for ${duration}${packs ? `, ${packs} banig(s)` : ""}`;
    }

    const updated = [...treatments, { category: newCategory, service: serviceName, detail: detailText }];
    setTreatments(updated);

    // Reset inputs
    setNewService("");
    setNewDetail("");
    setMedName("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setPacks("");

    if (updated.length > 0) {
      setTimeout(sendBillingToFrontDesk, 1000);
    }
  };

  const handlePayment = () => {
    setShowPaymentModal(false);
    setStage("paid");
    setTimeout(() => setShowReceipt(true), 500);
  };

  const resetBilling = () => {
    setPatient("");
    setTreatments([]);
    setNewService("");
    setNewCategory("");
    setNewDetail("");
    setMedName("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setPacks("");
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

  // 🔹 Group treatments by category
  const groupedSummary = treatments.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof treatments>);

  return (
    <div className="container mx-auto space-y-10 relative pb-16">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3 relative z-10">
        <FaMoneyBillWave className="text-blue-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Billing Summary</h2>
          <p className="text-sm text-gray-600 mt-1">
            Automatic summary of all services, medicines, and supplements — grouped by category and synced to Front Desk.
          </p>
        </div>
      </div>

      {/* PATIENT DETAILS */}
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

      {/* SERVICES INPUT */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-8 relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4">
          <FaClipboardList className="text-blue-600 text-2xl" />
          Log Services, Medicines, and Supplements
        </h3>

        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6">
          {/* Category with Title */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Select Category</label>
            <select
              className="border border-blue-300 rounded-lg p-2 w-52 text-sm focus:ring focus:ring-blue-200 outline-none"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setNewService("");
                setNewDetail("");
              }}
              disabled={stage === "paid"}
            >
              <option value="" disabled hidden></option>
              {Object.keys(servicesList).map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
              <option>Medicine</option>
              <option>Supplement</option>
            </select>
          </div>

          {/* Service or Medicine Fields */}
          {newCategory === "Medicine" || newCategory === "Supplement" ? (
            <div className="flex flex-wrap gap-2 items-end">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">
                  {newCategory} Details
                </label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    placeholder={`${newCategory} Name`}
                    className="border border-blue-300 rounded-lg p-2 w-40"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 500mg)"
                    className="border border-blue-300 rounded-lg p-2 w-36"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Frequency (e.g. 3x/day)"
                    className="border border-blue-300 rounded-lg p-2 w-36"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 5 days)"
                    className="border border-blue-300 rounded-lg p-2 w-36"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Banig (packs)"
                    className="border border-blue-300 rounded-lg p-2 w-28"
                    value={packs}
                    onChange={(e) => setPacks(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Service Dropdown with Title */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Select Service / Item</label>
                <select
                  className="border border-blue-300 rounded-lg p-2 w-56 text-sm focus:ring focus:ring-blue-200 outline-none"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  disabled={stage === "paid"}
                >
                  <option value="" disabled hidden></option>
                  {newCategory && servicesList[newCategory]
                    ? servicesList[newCategory].map((service) => (
                        <option key={service}>{service}</option>
                      ))
                    : null}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">
                  Quantity / Dosage
                </label>
                <input
                  type="text"
                  placeholder="(e.g. 1 session)"
                  className="border border-blue-300 rounded-lg p-2 w-56"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  disabled={stage === "paid"}
                />
              </div>
            </>
          )}

          {/* Add Button */}
          <div className="flex items-end">
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
        </div>
        {/* BILLING TABLE */}
        {treatments.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-blue-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-50 text-blue-700 text-sm uppercase font-medium">
                <tr>
                  <th className="p-3 border border-blue-100">Category</th>
                  <th className="p-3 border border-blue-100">Service / Item</th>
                  <th className="p-3 border border-blue-100">Quantity / Dosage</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((t, i) => (
                  <tr key={i} className="border-b border-blue-50 hover:bg-blue-50 transition">
                    <td className="p-3 text-gray-700">{t.category}</td>
                    <td className="p-3 font-medium text-gray-800">{t.service}</td>
                    <td className="p-3 text-gray-600">{t.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUMMARY */}
        {treatments.length > 0 && (
          <div className="mt-10 bg-gray-50 border border-blue-100 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCheckSquare className="text-green-600" /> Summary Overview (Sent to Front Desk)
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Grouped by category. Checkbox-style overview (no prices).
            </p>
            <div className="space-y-4">
              {Object.entries(groupedSummary).map(([category, items]) => (
                <div key={category}>
                  <h5 className="font-semibold text-blue-700 mb-2">{category}</h5>
                  <table className="w-full border border-blue-100 rounded-md text-sm">
                    <thead className="bg-blue-50 text-gray-700">
                      <tr>
                        <th className="p-2 border border-blue-100 w-10">✔</th>
                        <th className="p-2 border border-blue-100">Service / Item</th>
                        <th className="p-2 border border-blue-100">Quantity / Dosage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((t, i) => (
                        <tr key={i} className="hover:bg-blue-50 transition">
                          <td className="p-2 text-center">☑</td>
                          <td className="p-2 text-gray-800">{t.service}</td>
                          <td className="p-2 text-gray-600">{t.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verification Button */}
        {stage === "synced" && treatments.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              <FaCashRegister /> Process Verification
            </button>
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/20" onClick={() => setShowPaymentModal(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-blue-100 z-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCashRegister className="text-blue-600" /> Confirm Summary
            </h3>
            <p className="text-gray-600 mb-6">
              Confirm that all services, medicines, and supplements have been verified by the Front Desk.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                Cancel
              </button>
              <button onClick={handlePayment} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/20" onClick={resetBilling}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-blue-100 z-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaReceipt className="text-blue-600" /> Verification Complete
            </h3>
            <p className="text-gray-600 mb-4">
              Summary for <strong>{patient}</strong> has been verified and sent to Front Desk.
            </p>
            <ul className="mb-4 text-gray-700">
              {treatments.map((t, i) => (
                <li key={i} className="border-b py-1">
                  <span className="font-medium">{t.service}</span> — {t.detail}
                </li>
              ))}
            </ul>
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
              <button onClick={resetBilling} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-sm animate-fade-in-out">
          🔄 Summary automatically synced to Front Desk!
        </div>
      )}
    </div>
  );
}
