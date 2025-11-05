"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaTooth,
  FaUser,
  FaTrash,
  FaBolt,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaClipboardList,
  FaUserFriends,
  FaFileMedicalAlt,
  FaTooth as FaToothIcon,
} from "react-icons/fa";
import jsPDF from "jspdf";
import { usePatientContext } from "../contexts/PatientContext";

type ToothCondition =
  | "healthy"
  | "caries"
  | "filled"
  | "missing"
  | "crown"
  | "implant"
  | "root_canal";

type Tooth = {
  id: number;
  condition: ToothCondition;
  notes?: string;
};

const CONDITION_META: Record<
  ToothCondition,
  { label: string; className: string }
> = {
  healthy: { label: "Healthy", className: "bg-white border-gray-200 text-gray-700" },
  caries: { label: "Caries", className: "bg-red-100 border-red-300 text-red-700" },
  filled: { label: "Filled", className: "bg-yellow-100 border-yellow-300 text-yellow-700" },
  missing: {
    label: "Missing",
    className: "bg-gray-200 border-gray-300 text-gray-700 line-through opacity-70",
  },
  crown: { label: "Crown", className: "bg-indigo-100 border-indigo-300 text-indigo-700" },
  implant: { label: "Implant", className: "bg-green-100 border-green-300 text-green-700" },
  root_canal: { label: "Root Canal", className: "bg-pink-100 border-pink-300 text-pink-700" },
};

const STORAGE_PREFIX = "dentalChart_v1_us";

function defaultTeethUniversal(): Tooth[] {
  return Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    condition: "healthy" as ToothCondition,
    notes: "",
  }));
}

interface DentalChartProps {
  onNavigate?: (tab: "patient" | "treatment" | "workspace") => void;
}

export default function DentalChart({ onNavigate }: DentalChartProps) {
  const { selectedPatient, activePatientForForms } = usePatientContext();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientDOB, setPatientDOB] = useState("");
  const [teeth, setTeeth] = useState<Tooth[]>(() => defaultTeethUniversal());
  const [activeTooth, setActiveTooth] = useState<Tooth | null>(null);
  const [draftCondition, setDraftCondition] = useState<ToothCondition>("healthy");
  const [draftNotes, setDraftNotes] = useState("");
  const [material, setMaterial] = useState("");
  const [quickSelect, setQuickSelect] = useState<ToothCondition | null>(null);
  const [showQuickSelect, setShowQuickSelect] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);

  // Sync with selected patient
  useEffect(() => {
    if (selectedPatient) {
      setPatientName(selectedPatient.name);
      setPatientId(selectedPatient.patientId);
      if (selectedPatient.birthdate) {
        setPatientDOB(selectedPatient.birthdate);
      }
    }
  }, [selectedPatient]);

  useEffect(() => {
    if (activePatientForForms) {
      setPatientName(activePatientForForms.name || "");
      setPatientId(activePatientForForms.patientId || "");
      if (activePatientForForms.birthdate) {
        setPatientDOB(activePatientForForms.birthdate);
      }
    }
  }, [activePatientForForms]);

  const baseKey = useMemo(
    () => `${STORAGE_PREFIX}_${patientId || patientName || "default"}`,
    [patientId, patientName]
  );

  useEffect(() => {
    const raw = localStorage.getItem(baseKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.teeth) setTeeth(parsed.teeth);
      if (parsed.patientName) setPatientName(parsed.patientName);
      if (parsed.patientDOB) setPatientDOB(parsed.patientDOB);
    } catch {}
  }, [baseKey]);

  useEffect(() => {
    localStorage.setItem(
      baseKey,
      JSON.stringify({ teeth, patientName, patientDOB })
    );
  }, [teeth, patientName, patientDOB, baseKey]);

  function openToothEditor(id: number) {
    // Quick select mode: apply immediately without opening modal
    if (quickSelect) {
      const noteText =
        quickSelect === "filled"
          ? `Filler: ${material || "unspecified"}`
          : quickSelect === "implant"
          ? `Implant: ${material || "unspecified"}`
          : "";
      setTeeth((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, condition: quickSelect, notes: noteText } : t
        )
      );
      return;
    }
    const t = teeth.find((x) => x.id === id);
    if (!t) return;
    setActiveTooth(t);
    setDraftCondition(t.condition);
    setDraftNotes(t.notes ?? "");
    setMaterial("");
  }

  function saveTooth() {
    if (!activeTooth) return;
    const noteText =
      draftCondition === "filled"
        ? `Filler: ${material || "unspecified"}`
        : draftCondition === "implant"
        ? `Implant: ${material || "unspecified"}`
        : draftNotes;

    setTeeth((prev) =>
      prev.map((t) =>
        t.id === activeTooth.id
          ? { ...t, condition: draftCondition, notes: noteText }
          : t
      )
    );
    setActiveTooth(null);
  }

  function resetChart() {
    if (!confirm("Reset chart to default (all teeth healthy)?")) return;
    setTeeth(defaultTeethUniversal());
    localStorage.removeItem(baseKey);
  }

  const summary = useMemo(() => {
    const counts: Record<string, number> = {};
    teeth.forEach((t) => {
      counts[t.condition] = (counts[t.condition] || 0) + 1;
    });
    return counts;
  }, [teeth]);

  const overview = useMemo(() => {
    const fillings = teeth.filter((t) => t.condition === "filled");
    const implants = teeth.filter((t) => t.condition === "implant");

    const recommendations: string[] = [];

    if (implants.length > 0)
      recommendations.push(
        "Review implant sites for proper osseointegration and regular maintenance checkups."
      );
    if (fillings.length > 0)
      recommendations.push(
        "Monitor filled teeth for cracks or leakage; replace if wear is observed."
      );
    if (teeth.some((t) => t.condition === "caries"))
      recommendations.push("Perform restoration or extraction for carious teeth.");
    if (teeth.some((t) => t.condition === "root_canal"))
      recommendations.push("Schedule post-root canal crown installation if not yet done.");

    return { fillings, implants, recommendations };
  }, [teeth]);

  function exportChartPDF() {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setFontSize(18);
      pdf.text("Dental Chart Report", 10, 15);

      pdf.setFontSize(12);
      pdf.text(`Patient Name: ${patientName || "N/A"}`, 10, 30);
      pdf.text(`Patient ID: ${patientId || "N/A"}`, 10, 37);
      pdf.text(`Date of Birth: ${patientDOB || "N/A"}`, 10, 44);
      pdf.line(10, 48, 200, 48);

      pdf.setFontSize(10);
      let y = 56;

      teeth.forEach((tooth) => {
        const note = tooth.notes ? ` (${tooth.notes})` : "";
        pdf.text(
          `Tooth ${tooth.id}: ${CONDITION_META[tooth.condition].label}${note}`,
          10,
          y
        );
        y += 6;
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      });

      // === Add Summary Section ===
      y += 10;
      pdf.setFontSize(12);
      pdf.text("Summary & Recommendations", 10, y);
      y += 6;

      pdf.setFontSize(10);
      pdf.text(`Healthy: ${summary["healthy"] || 0}`, 10, y);
      y += 5;
      pdf.text(`Caries: ${summary["caries"] || 0}`, 10, y);
      y += 5;
      pdf.text(`Missing: ${summary["missing"] || 0}`, 10, y);
      y += 5;
      pdf.text(`Implants: ${overview.implants.length}`, 10, y);
      y += 5;
      pdf.text(`Filled: ${overview.fillings.length}`, 10, y);
      y += 8;

      if (overview.implants.length > 0) {
        pdf.text("Implant Details:", 10, y);
        y += 5;
        overview.implants.forEach((t) => {
          pdf.text(`Tooth ${t.id}: ${t.notes || "No details provided"}`, 12, y);
          y += 5;
        });
      }

      if (overview.fillings.length > 0) {
        y += 6;
        pdf.text("Filling Details:", 10, y);
        y += 5;
        overview.fillings.forEach((t) => {
          pdf.text(`Tooth ${t.id}: ${t.notes || "No details provided"}`, 12, y);
          y += 5;
        });
      }

      if (overview.recommendations.length > 0) {
        y += 6;
        pdf.text("Recommended Procedures:", 10, y);
        y += 5;
        overview.recommendations.forEach((r) => {
          pdf.text(`• ${r}`, 12, y);
          y += 5;
          if (y > 280) {
            pdf.addPage();
            y = 20;
          }
        });
      }

      pdf.save(`${patientName || "Dental_Chart"}.pdf`);
    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("PDF Export failed. Check console for details.");
    }
  }

  const upperRow = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerRow = Array.from({ length: 16 }, (_, i) => i + 17);

  return (
    <div className="container mx-auto space-y-10 relative pb-16" ref={chartRef}>
      {/* Header - matches Billing Summary style */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex items-center gap-3 relative z-10">
        <FaTooth className="text-blue-600 text-3xl" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">Dental Chart</h2>
          <p className="text-sm text-gray-600 mt-1">
            Interactive tooth condition tracker for each patient.
          </p>
        </div>
        {selectedPatient && (
          <div className="bg-white px-4 py-2 rounded-lg border border-blue-200 flex items-center gap-2">
            <FaUserFriends className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Selected:</p>
              <p className="text-sm font-semibold text-blue-600">{selectedPatient.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      {onNavigate && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate("patient")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
            >
              <FaUserFriends /> View Patient Dashboard
            </button>
            <button
              onClick={() => onNavigate("treatment")}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm"
            >
              <FaToothIcon /> Open Treatment
            </button>
            <button
              onClick={() => onNavigate("workspace")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition text-sm"
            >
              <FaFileMedicalAlt /> Open EMR
            </button>
          </div>
        </div>
      )}

      {/* === Main Layout === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart (2/3) */}
        <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FaTooth className="text-blue-600" /> Tooth Layout
            </span>
            <button
              onClick={() => setShowQuickSelect(!showQuickSelect)}
              className="flex items-center gap-2 px-3 py-1 text-sm border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <FaBolt className="text-yellow-500" />
              Quick Select
              {showQuickSelect ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </h3>

          {/* Quick Select */}
          {showQuickSelect && (
            <div className="flex flex-col gap-3 p-3 mb-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(CONDITION_META) as ToothCondition[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setQuickSelect(quickSelect === c ? null : c)}
                    className={`px-3 py-1 rounded-lg border text-sm transition ${
                      quickSelect === c
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-white border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {CONDITION_META[c].label}
                  </button>
                ))}
                {quickSelect && (
                  <button
                    onClick={() => {
                      setQuickSelect(null);
                      setMaterial("");
                    }}
                    className="ml-auto px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Clear
                  </button>
                )}
              </div>

              {(quickSelect === "filled" || quickSelect === "implant") && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    {quickSelect === "filled" ? "Filler Material:" : "Implant Type:"}
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="border border-blue-200 rounded-lg p-2 text-sm"
                  >
                    <option value="">Select...</option>
                    {quickSelect === "filled"
                      ? ["Amalgam", "Composite", "Glass Ionomer", "Gold", "Porcelain"].map(
                          (m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          )
                        )
                      : ["Titanium", "Zirconia", "Ceramic", "Hybrid"].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {[upperRow, lowerRow].map((row, i) => (
            <div key={i} className="flex justify-center mb-4">
              <div className="flex gap-2 bg-gray-50 p-3 rounded-xl shadow-inner">
                {row.map((num) => {
                  const t = teeth.find((x) => x.id === num)!;
                  const meta = CONDITION_META[t.condition];
                  return (
                    <button
                      key={num}
                      onClick={() => openToothEditor(num)}
                      className={`w-12 h-14 border rounded-md text-xs flex flex-col items-center justify-center hover:scale-105 transition ${meta.className}`}
                    >
                      <span className="font-semibold">{num}</span>
                      {t.condition !== "healthy" && (
                        <span className="text-[10px]">{meta.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar (1/3) */}
        <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <FaUser className="text-blue-600" /> Patient Information
          </h3>

          <input
            placeholder="Patient ID (optional)"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full border border-blue-200 rounded-lg p-2 focus:ring focus:ring-blue-100 outline-none text-sm"
          />
          <input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full border border-blue-200 rounded-lg p-2 focus:ring focus:ring-blue-100 outline-none text-sm"
          />
          <input
            placeholder="Date of Birth"
            value={patientDOB}
            onChange={(e) => setPatientDOB(e.target.value)}
            className="w-full border border-blue-200 rounded-lg p-2 focus:ring focus:ring-blue-100 outline-none text-sm"
          />

          <div className="flex gap-2">
            <button
              onClick={exportChartPDF}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <FaDownload /> Export PDF
            </button>
            <button
              onClick={resetChart}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <FaTrash /> Reset
            </button>
          </div>

          <h4 className="text-sm font-medium text-gray-700 mt-4 mb-1">Legend</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(CONDITION_META).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-3 p-2 rounded-lg border">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center ${meta.className}`}
                >
                  <span className="text-xs font-semibold">
                    {meta.label.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {meta.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {summary[key] ?? 0} teeth
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary & Recommendations (matching card style) */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaClipboardList className="text-blue-600" /> Summary & Recommendations
        </h3>

        <div className="text-sm text-gray-700">
          <p><strong>Total Teeth:</strong> 32</p>
          <p><strong>Healthy:</strong> {summary["healthy"] || 0}</p>
          <p><strong>Caries:</strong> {summary["caries"] || 0}</p>
          <p><strong>Missing:</strong> {summary["missing"] || 0}</p>
          <p><strong>Implants:</strong> {overview.implants.length}</p>
          <p><strong>Filled:</strong> {overview.fillings.length}</p>
        </div>

        {overview.implants.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mt-2">Implant Details:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {overview.implants.map((t) => (
                <li key={t.id}>
                  Tooth {t.id} – {t.notes || "No details provided"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {overview.fillings.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mt-2">Filling Details:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {overview.fillings.map((t) => (
                <li key={t.id}>
                  Tooth {t.id} – {t.notes || "No details provided"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {overview.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mt-2">Recommended Procedures:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {overview.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal */}
      {activeTooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setActiveTooth(null)}
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-blue-100 z-10">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">
                Tooth {activeTooth.id}
              </h4>
              <button
                className="text-gray-500"
                onClick={() => setActiveTooth(null)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-sm text-gray-600">Condition</label>
              <select
                value={draftCondition}
                onChange={(e) =>
                  setDraftCondition(e.target.value as ToothCondition)
                }
                className="w-full border border-blue-200 rounded-lg p-2"
              >
                {(Object.keys(CONDITION_META) as ToothCondition[]).map((c) => (
                  <option key={c} value={c}>
                    {CONDITION_META[c].label}
                  </option>
                ))}
              </select>

              {(draftCondition === "filled" || draftCondition === "implant") && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {draftCondition === "filled" ? "Filler Material" : "Implant Type"}
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="border rounded-lg w-full p-2"
                  >
                    <option value="">Select material</option>
                    {draftCondition === "filled"
                      ? ["Amalgam", "Composite", "Glass Ionomer", "Resin"].map(
                          (m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          )
                        )
                      : ["Titanium", "Zirconia", "Gold", "Silver"].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                  </select>
                </div>
              )}

              <label className="block text-sm text-gray-600">Notes</label>
              <textarea
                value={draftNotes}
                onChange={(e) => setDraftNotes(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-2 h-28"
                placeholder="Observations or procedures..."
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActiveTooth(null)}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTooth}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
