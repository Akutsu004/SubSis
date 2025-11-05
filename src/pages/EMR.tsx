import React, { useState, useEffect } from "react";
import PatientDashboard from "./PatientDashboard";
import Treatment from "./Treatment";
import DentalChart from "./DentalChart";
import {
  FaUserFriends,
  FaTooth,
  FaClipboardList,
  FaFileMedicalAlt,
} from "react-icons/fa";
import { PatientProvider, usePatientContext } from "../contexts/PatientContext";

export default function EMRUnifiedPage() {
  return (
    <PatientProvider>
      <EMRUnifiedPageContent />
    </PatientProvider>
  );
}

function EMRUnifiedPageContent() {
  const tabs = [
    { key: "patient", label: "Patient Sync", icon: <FaUserFriends /> },
    { key: "treatment", label: "Treatment", icon: <FaTooth /> },
    { key: "chart", label: "Dental Chart", icon: <FaClipboardList /> },
    { key: "workspace", label: "EMR", icon: <FaFileMedicalAlt /> },
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("patient");

  const handleSelectPatient = (tab: "treatment" | "chart" | "workspace") => {
    setActive(tab as (typeof tabs)[number]["key"]);
  };

  const handleNavigate = (tab: "patient" | "treatment" | "chart" | "workspace") => {
    setActive(tab as (typeof tabs)[number]["key"]);
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaFileMedicalAlt className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Clinical Workspace</h2>
            <p className="text-sm text-gray-600 mt-1">
              Unified patient management system. All sections are connected and share patient data.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex flex-wrap gap-2 p-3 border-b border-gray-100">
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                }`}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="p-4">
          {active === "patient" && (
            <div>
              <PatientDashboard onSelectPatient={handleSelectPatient} />
            </div>
          )}

          {active === "treatment" && (
            <div>
              <Treatment onNavigate={handleNavigate} />
            </div>
          )}

          {active === "chart" && (
            <div>
              <DentalChart onNavigate={handleNavigate} />
            </div>
          )}

          {active === "workspace" && (
            <div>
              <EMRContentEditable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Inlined original EMR content as a local component for the EMR tab ---
function EMRContentEditable() {
  const { selectedPatient, activePatientForForms, addPatientRecord, setActivePatientForForms } = usePatientContext();
  
  const [emrData, setEmrData] = useState({
    patientName: "",
    patientId: "",
    birthdate: "",
    contactNumber: "",
    email: "",
    sex: "",
    address: "",
    emergencyContact: "",
    allergies: "",
    healthProblems: "",
    currentMedicines: "",
    panoramicXray: "",
    periapicalXray: "",
    bloodTest: "",
    plannedCategory: "",
    plannedService: "",
    plannedRemarks: "",
    dateOfVisit: "",
    serviceGiven: "",
    whatWasDone: "",
    dentistName: "",
    medicineName: "",
    howOften: "",
    howManyDays: "",
    homeDo: "",
    homeAvoid: "",
    warningSigns: "",
  });

  // Auto-populate from selected patient
  useEffect(() => {
    if (selectedPatient) {
      setEmrData((prev) => ({
        ...prev,
        patientName: selectedPatient.name || "",
        patientId: selectedPatient.patientId || "",
        birthdate: selectedPatient.birthdate || "",
        contactNumber: selectedPatient.contactNumber || "",
        email: selectedPatient.email || "",
        sex: selectedPatient.sex || "",
        address: selectedPatient.address || "",
        emergencyContact: selectedPatient.emergencyContact || "",
        allergies: selectedPatient.allergies || "",
        healthProblems: selectedPatient.healthProblems || "",
        currentMedicines: selectedPatient.currentMedicines || "",
      }));
    }
  }, [selectedPatient]);

  useEffect(() => {
    if (activePatientForForms) {
      setEmrData((prev) => ({
        ...prev,
        patientName: activePatientForForms.name || prev.patientName,
        patientId: activePatientForForms.patientId || prev.patientId,
        birthdate: activePatientForForms.birthdate || prev.birthdate,
        contactNumber: activePatientForForms.contactNumber || prev.contactNumber,
        email: activePatientForForms.email || prev.email,
        sex: activePatientForForms.sex || prev.sex,
        address: activePatientForForms.address || prev.address,
        emergencyContact: activePatientForForms.emergencyContact || prev.emergencyContact,
        allergies: activePatientForForms.allergies || prev.allergies,
        healthProblems: activePatientForForms.healthProblems || prev.healthProblems,
        currentMedicines: activePatientForForms.currentMedicines || prev.currentMedicines,
      }));
    }
  }, [activePatientForForms]);

  const handleChange = (field: string, value: string) =>
    setEmrData((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    // Save/update patient record
    if (emrData.patientId && emrData.patientName) {
      addPatientRecord({
        name: emrData.patientName,
        patientId: emrData.patientId,
        followUp: emrData.dateOfVisit || new Date().toISOString().split("T")[0],
        lastTreatment: emrData.serviceGiven || "",
        prescriptions: emrData.medicineName ? [emrData.medicineName] : [],
        birthdate: emrData.birthdate,
        contactNumber: emrData.contactNumber,
        email: emrData.email,
        sex: emrData.sex,
        address: emrData.address,
        emergencyContact: emrData.emergencyContact,
        allergies: emrData.allergies,
        healthProblems: emrData.healthProblems,
        currentMedicines: emrData.currentMedicines,
      });
      
      setActivePatientForForms({
        name: emrData.patientName,
        patientId: emrData.patientId,
      });
    }
    
    console.log("Saved EMR Data:", emrData);
    alert("EMR data saved! Patient record updated.");
  };

  const renderInput = (
    field: string,
    type: string = "text",
    textarea: boolean = false
  ) =>
    textarea ? (
      <textarea
        value={emrData[field as keyof typeof emrData]}
        onChange={(e) => handleChange(field, (e.target as HTMLTextAreaElement).value)}
        className="w-full border border-blue-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        rows={3}
      />
    ) : (
      <input
        type={type}
        value={emrData[field as keyof typeof emrData]}
        onChange={(e) => handleChange(field, (e.target as HTMLInputElement).value)}
        className="w-full border border-blue-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    );

  return (
    <div className="space-y-10 relative pb-4">
      {/* Selected Patient Indicator */}
      {selectedPatient && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaUserFriends className="text-blue-600 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Currently Viewing:</p>
              <p className="text-lg font-semibold text-blue-700">{selectedPatient.name} ({selectedPatient.patientId})</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
            PRE-TREATMENT
          </h2>

          <Section title="1. Patient Information">
            <TableRow label="Patient Name">{renderInput("patientName")}</TableRow>
            <TableRow label="Patient ID">{renderInput("patientId")}</TableRow>
            <TableRow label="Birthdate">{renderInput("birthdate", "date")}</TableRow>
            <TableRow label="Contact Number">{renderInput("contactNumber")}</TableRow>
            <TableRow label="Email Address">{renderInput("email")}</TableRow>
            <TableRow label="Sex">{renderInput("sex")}</TableRow>
            <TableRow label="Address">{renderInput("address")}</TableRow>
            <TableRow label="Emergency Contact">{renderInput("emergencyContact")}</TableRow>
          </Section>

          <Section title="2. Medical History">
            <TableRow label="Allergies">{renderInput("allergies")}</TableRow>
            <TableRow label="Health Problems">{renderInput("healthProblems")}</TableRow>
            <TableRow label="Current Medicines">{renderInput("currentMedicines")}</TableRow>
          </Section>

          <Section title="3. Tests">
            <TableRow label="Panoramic X-ray">{renderInput("panoramicXray")}</TableRow>
            <TableRow label="Periapical X-ray">{renderInput("periapicalXray")}</TableRow>
            <TableRow label="Blood Test">{renderInput("bloodTest")}</TableRow>
          </Section>

          <Section title="4. Planned Service (Treatment Plan)">
            <TableRow label="Category">{renderInput("plannedCategory")}</TableRow>
            <TableRow label="Service Selected">{renderInput("plannedService")}</TableRow>
            <TableRow label="Remarks">{renderInput("plannedRemarks", "text", true)}</TableRow>
          </Section>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
            POST-TREATMENT
          </h2>

          <Section title="1. Patient Information">
            <TableRow label="Patient Name">{renderInput("patientName")}</TableRow>
            <TableRow label="Patient ID">{renderInput("patientId")}</TableRow>
            <TableRow label="Date of Visit">{renderInput("dateOfVisit", "date")}</TableRow>
          </Section>

          <Section title="2. Treatment Done">
            <TableRow label="Service Given">{renderInput("serviceGiven")}</TableRow>
            <TableRow label="What Was Done">{renderInput("whatWasDone", "text", true)}</TableRow>
            <TableRow label="Dentist / Staff Name">{renderInput("dentistName")}</TableRow>
          </Section>

          <Section title="3. Medicines (if any)">
            <TableRow label="Medicine Name">{renderInput("medicineName")}</TableRow>
            <TableRow label="How Often">{renderInput("howOften")}</TableRow>
            <TableRow label="How Many Days">{renderInput("howManyDays")}</TableRow>
          </Section>

          <Section title="4. Home Care">
            <TableRow label="What to Do">{renderInput("homeDo", "text", true)}</TableRow>
            <TableRow label="What to Avoid">{renderInput("homeAvoid", "text", true)}</TableRow>
            <TableRow label="Warning Signs">{renderInput("warningSigns", "text", true)}</TableRow>
          </Section>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Save EMR
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">{title}</h3>
      <table className="w-full border border-blue-100 rounded-lg text-sm">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TableRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="border-t border-blue-50">
      <td className="p-2 font-medium w-1/3 bg-blue-50 text-gray-700">{label}</td>
      <td className="p-2">{children}</td>
    </tr>
  );
}
