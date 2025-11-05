import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface PatientRecord {
  name: string;
  patientId: string;
  followUp: string;
  lastTreatment: string;
  prescriptions: string[];
  birthdate?: string;
  contactNumber?: string;
  email?: string;
  sex?: string;
  address?: string;
  emergencyContact?: string;
  allergies?: string;
  healthProblems?: string;
  currentMedicines?: string;
}

export interface TreatmentRecord {
  id: string;
  patient: string;
  patientId: string;
  diagnosis: string;
  services: string[];
  medicines: string[];
  date: string;
  syncedTo: {
    billing: boolean;
    inventory: boolean;
    emr: boolean;
  };
}

interface PatientContextType {
  // Current selected patient
  selectedPatient: PatientRecord | null;
  setSelectedPatient: (patient: PatientRecord | null) => void;
  
  // Patient records list
  patientRecords: PatientRecord[];
  addPatientRecord: (patient: PatientRecord) => void;
  updatePatientRecord: (patientId: string, updates: Partial<PatientRecord>) => void;
  
  // Treatment records
  treatmentRecords: TreatmentRecord[];
  addTreatmentRecord: (treatment: Omit<TreatmentRecord, "id" | "date" | "syncedTo">) => void;
  
  // Active patient for forms (for pre-filling)
  activePatientForForms: Partial<PatientRecord> | null;
  setActivePatientForForms: (patient: Partial<PatientRecord> | null) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>([
    {
      name: "John Doe",
      patientId: "P-2025-0001",
      followUp: "2025-11-10",
      lastTreatment: "Tooth Extraction",
      prescriptions: ["Pain Reliever", "Antibiotic"],
      birthdate: "1990-05-15",
      contactNumber: "0917-123-4567",
      email: "john.doe@example.com",
      sex: "Male",
      address: "123 Main St, City",
      emergencyContact: "Jane Doe - 0918-123-4567",
      allergies: "None",
      healthProblems: "None",
      currentMedicines: "None",
    },
    {
      name: "Jane Smith",
      patientId: "P-2025-0002",
      followUp: "2025-11-15",
      lastTreatment: "Cleaning",
      prescriptions: ["Fluoride Toothpaste"],
      birthdate: "1985-08-20",
      contactNumber: "0917-234-5678",
      email: "jane.smith@example.com",
      sex: "Female",
      address: "456 Oak Ave, City",
      emergencyContact: "John Smith - 0918-234-5678",
      allergies: "Penicillin",
      healthProblems: "Diabetes",
      currentMedicines: "Metformin",
    },
  ]);
  
  const [treatmentRecords, setTreatmentRecords] = useState<TreatmentRecord[]>([]);
  const [activePatientForForms, setActivePatientForForms] = useState<Partial<PatientRecord> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPatients = localStorage.getItem("patientRecords");
    const savedTreatments = localStorage.getItem("treatmentRecords");
    
    if (savedPatients) {
      try {
        setPatientRecords(JSON.parse(savedPatients));
      } catch (e) {
        console.error("Failed to load patient records:", e);
      }
    }
    
    if (savedTreatments) {
      try {
        setTreatmentRecords(JSON.parse(savedTreatments));
      } catch (e) {
        console.error("Failed to load treatment records:", e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("patientRecords", JSON.stringify(patientRecords));
  }, [patientRecords]);

  useEffect(() => {
    localStorage.setItem("treatmentRecords", JSON.stringify(treatmentRecords));
  }, [treatmentRecords]);

  const addPatientRecord = (patient: PatientRecord) => {
    setPatientRecords((prev) => {
      const existing = prev.findIndex((p) => p.patientId === patient.patientId);
      if (existing >= 0) {
        return prev.map((p, i) => (i === existing ? patient : p));
      }
      return [...prev, patient];
    });
  };

  const updatePatientRecord = (patientId: string, updates: Partial<PatientRecord>) => {
    setPatientRecords((prev) =>
      prev.map((p) => (p.patientId === patientId ? { ...p, ...updates } : p))
    );
  };

  const addTreatmentRecord = (treatment: Omit<TreatmentRecord, "id" | "date" | "syncedTo">) => {
    const newTreatment: TreatmentRecord = {
      ...treatment,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      syncedTo: { billing: false, inventory: false, emr: false },
    };

    setTreatmentRecords((prev) => [...prev, newTreatment]);

    // Update patient record with latest treatment
    const patient = patientRecords.find((p) => p.patientId === treatment.patientId || p.name === treatment.patient);
    if (patient) {
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + 30); // Default 30 days follow-up
      
      updatePatientRecord(patient.patientId, {
        lastTreatment: treatment.diagnosis,
        prescriptions: treatment.medicines,
        followUp: followUpDate.toISOString().split("T")[0],
      });
    }

    // Simulate sync after 2 seconds
    setTimeout(() => {
      setTreatmentRecords((prev) =>
        prev.map((t) =>
          t.id === newTreatment.id
            ? { ...t, syncedTo: { billing: true, inventory: true, emr: true } }
            : t
        )
      );
    }, 2000);
  };

  return (
    <PatientContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,
        patientRecords,
        addPatientRecord,
        updatePatientRecord,
        treatmentRecords,
        addTreatmentRecord,
        activePatientForForms,
        setActivePatientForForms,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatientContext must be used within PatientProvider");
  }
  return context;
}

