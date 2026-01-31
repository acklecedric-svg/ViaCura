/**
 * @krisspy-file
 * @type page
 * @name "PatientDetailView"
 * @title "Patient Detail View"
 * @description "Comprehensive patient information including medical history, medications, allergies, and vital signs"
 * @routes ["/doctor/patient-detail"]
 * @flowName "doctor-cockpit"
 * @layout "DoctorLayout"
 */

import React, { useState } from 'react';
import { Phone, Video, Clock, AlertCircle, Heart, Pill, User, Calendar, MapPin, Phone as PhoneIcon, Mail, ChevronDown, ChevronUp } from 'lucide-react';

interface PatientInfo {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  respiratoryRate: number;
  lastMeasured: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  indication: string;
}

interface MedicalHistory {
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export default function PatientDetailView() {
  const [expandedSections, setExpandedSections] = useState({
    info: true,
    vitals: true,
    medications: true,
    allergies: true,
    history: true,
    checklist: true,
  });

  // Mock patient data
  const patientInfo: PatientInfo = {
    id: 'P-2024-001',
    name: 'Maria Müller',
    age: 58,
    gender: 'Weiblich',
    contact: '+49 30 1234567',
    email: 'maria.mueller@email.com',
    address: 'Berliner Str. 45, 10115 Berlin',
    emergencyContact: 'Hans Müller (Ehemann)',
    emergencyPhone: '+49 30 7654321',
  };

  const vitalSigns: VitalSigns = {
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 36.8,
    respiratoryRate: 16,
    lastMeasured: '2024-01-15 14:30',
  };

  const medications: Medication[] = [
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: '2x täglich',
      startDate: '2023-06-01',
      indication: 'Typ 2 Diabetes',
    },
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: '1x täglich',
      startDate: '2022-09-15',
      indication: 'Bluthochdruck',
    },
    {
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: '1x täglich (Abend)',
      startDate: '2021-03-10',
      indication: 'Cholesterin',
    },
  ];

  const allergies = ['Penicillin (Hautausschlag)', 'Nussallergien', 'Sulfonamide'];

  const medicalHistory: MedicalHistory[] = [
    {
      date: '2024-01-10',
      diagnosis: 'Atemwegsinfekt',
      treatment: 'Antibiotika, Ruhe',
      notes: 'Leichte Pneumonie, ambulante Behandlung',
    },
    {
      date: '2023-11-20',
      diagnosis: 'Hypertension Kontrolle',
      treatment: 'Medikamentöse Anpassung',
      notes: 'Blutdruck jetzt kontrolliert',
    },
    {
      date: '2023-08-15',
      diagnosis: 'Typ 2 Diabetes Screening',
      treatment: 'Lebensstiländerung, Metformin',
      notes: 'HbA1c: 6.8%, Diät-Anpassung empfohlen',
    },
  ];

  const treatmentChecklist = [
    { task: 'Voruntersuchung durchführen', completed: false },
    { task: 'Blutdruck messen', completed: false },
    { task: 'Herzfrequenz prüfen', completed: false },
    { task: 'Labortests anordnen', completed: false },
    { task: 'Medikamentenliste aktualisieren', completed: false },
    { task: 'Nachsorge-Termin buchen', completed: false },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({ title, section, icon: Icon }: any) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-lg bg-tertiary hover:bg-secondary border border-primary rounded-lg transition-colors"
    >
      <div className="flex items-center gap-md">
        <Icon className="w-5 h-5 text-blue" />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-secondary" />
      ) : (
        <ChevronDown className="w-5 h-5 text-secondary" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-primary p-lg md:p-2xl">
      <div className="max-w-4xl mx-auto space-y-lg">
        {/* Header mit Aktionen */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-lg">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-sm">{patientInfo.name}</h1>
            <p className="text-secondary">ID: {patientInfo.id}</p>
          </div>
          <div className="flex gap-md flex-wrap">
            <button className="btn btn-primary flex items-center gap-md">
              <Phone className="w-5 h-5" />
              <span>Anrufen</span>
            </button>
            <button className="btn btn-secondary flex items-center gap-md">
              <Video className="w-5 h-5" />
              <span>Telemedicine</span>
            </button>
            <button className="btn btn-primary flex items-center gap-md">
              <Clock className="w-5 h-5" />
              <span>Behandlung starten</span>
            </button>
          </div>
        </div>

        {/* Kritische Warnungen */}
        <div className="bg-warning bg-opacity-20 border border-warning rounded-lg p-lg flex items-start gap-md">
          <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-xs" />
          <div>
            <h4 className="font-semibold text-warning mb-xs">Kritische Allergien</h4>
            <p className="text-secondary text-sm">Penicillin (bekannte schwere Reaktion) - Beachten Sie vor der Verschreibung</p>
          </div>
        </div>

        {/* Patienteninformationen */}
        <div className="space-y-md">
          <SectionHeader title="Patienteninformationen" section="info" icon={User} />
          {expandedSections.info && (
            <div className="bg-secondary rounded-lg p-lg border border-primary space-y-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <p className="text-secondary text-sm mb-xs">Alter</p>
                  <p className="text-primary font-semibold">{patientInfo.age} Jahre</p>
                </div>
                <div>
                  <p className="text-secondary text-sm mb-xs">Geschlecht</p>
                  <p className="text-primary font-semibold">{patientInfo.gender}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-secondary text-sm mb-xs">Adresse</p>
                  <div className="flex items-start gap-md">
                    <MapPin className="w-5 h-5 text-blue flex-shrink-0 mt-xs" />
                    <p className="text-primary">{patientInfo.address}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-secondary text-sm mb-xs">Kontaktinformationen</p>
                  <div className="space-y-sm">
                    <div className="flex items-center gap-md">
                      <PhoneIcon className="w-5 h-5 text-blue" />
                      <p className="text-primary">{patientInfo.contact}</p>
                    </div>
                    <div className="flex items-center gap-md">
                      <Mail className="w-5 h-5 text-blue" />
                      <p className="text-primary">{patientInfo.email}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 border-t border-primary pt-md">
                  <p className="text-secondary text-sm mb-xs">Notfallkontakt</p>
                  <p className="text-primary font-semibold mb-sm">{patientInfo.emergencyContact}</p>
                  <div className="flex items-center gap-md">
                    <PhoneIcon className="w-5 h-5 text-blue" />
                    <p className="text-primary">{patientInfo.emergencyPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Aktuelle Vitalwerte */}
        <div className="space-y-md">
          <SectionHeader title="Aktuelle Vitalzeichen" section="vitals" icon={Heart} />
          {expandedSections.vitals && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="bg-secondary rounded-lg p-lg border border-primary">
                <p className="text-secondary text-sm mb-md">Herzfrequenz</p>
                <p className="text-3xl font-bold text-blue mb-sm">{vitalSigns.heartRate}</p>
                <p className="text-secondary text-xs">bpm (normal)</p>
              </div>
              <div className="bg-secondary rounded-lg p-lg border border-primary">
                <p className="text-secondary text-sm mb-md">Blutdruck</p>
                <p className="text-3xl font-bold text-blue mb-sm">{vitalSigns.bloodPressure}</p>
                <p className="text-secondary text-xs">mmHg (normal)</p>
              </div>
              <div className="bg-secondary rounded-lg p-lg border border-primary">
                <p className="text-secondary text-sm mb-md">Temperatur</p>
                <p className="text-3xl font-bold text-blue mb-sm">{vitalSigns.temperature}°C</p>
                <p className="text-secondary text-xs">normal</p>
              </div>
              <div className="bg-secondary rounded-lg p-lg border border-primary">
                <p className="text-secondary text-sm mb-md">Atemfrequenz</p>
                <p className="text-3xl font-bold text-blue mb-sm">{vitalSigns.respiratoryRate}</p>
                <p className="text-secondary text-xs">Atemzüge/min (normal)</p>
              </div>
              <p className="text-secondary text-xs col-span-1 md:col-span-2">Zuletzt gemessen: {vitalSigns.lastMeasured}</p>
            </div>
          )}
        </div>

        {/* Medikamente */}
        <div className="space-y-md">
          <SectionHeader title="Aktuelle Medikamente" section="medications" icon={Pill} />
          {expandedSections.medications && (
            <div className="space-y-md">
              {medications.map((med, idx) => (
                <div key={idx} className="bg-secondary rounded-lg p-lg border border-primary">
                  <div className="flex items-start justify-between mb-md">
                    <div>
                      <h4 className="text-lg font-semibold text-primary">{med.name}</h4>
                      <p className="text-secondary text-sm">{med.indication}</p>
                    </div>
                    <span className="badge badge-info">{med.dosage}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-md text-sm">
                    <div>
                      <p className="text-secondary">Häufigkeit</p>
                      <p className="text-primary font-semibold">{med.frequency}</p>
                    </div>
                    <div>
                      <p className="text-secondary">Startdatum</p>
                      <p className="text-primary font-semibold">{med.startDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Allergien */}
        <div className="space-y-md">
          <SectionHeader title="Bekannte Allergien" section="allergies" icon={AlertCircle} />
          {expandedSections.allergies && (
            <div className="flex flex-wrap gap-md">
              {allergies.map((allergy, idx) => (
                <div key={idx} className="badge badge-danger text-base px-md py-sm">
                  {allergy}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Medizinische Chronologie */}
        <div className="space-y-md">
          <SectionHeader title="Medizinische Chronologie" section="history" icon={Calendar} />
          {expandedSections.history && (
            <div className="space-y-md">
              {medicalHistory.map((entry, idx) => (
                <div key={idx} className="bg-secondary rounded-lg p-lg border border-primary">
                  <div className="flex items-start justify-between mb-md">
                    <div>
                      <h4 className="text-lg font-semibold text-primary">{entry.diagnosis}</h4>
                      <p className="text-secondary text-sm">{entry.date}</p>
                    </div>
                    <span className="badge badge-info">{entry.treatment}</span>
                  </div>
                  <p className="text-secondary">{entry.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Behandlungs-Checkliste */}
        <div className="space-y-md">
          <SectionHeader title="Behandlungs-Checkliste" section="checklist" icon={Clock} />
          {expandedSections.checklist && (
            <div className="bg-secondary rounded-lg p-lg border border-primary space-y-md">
              {treatmentChecklist.map((item, idx) => (
                <label key={idx} className="flex items-center gap-md cursor-pointer hover:opacity-80 transition-opacity">
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    className="w-5 h-5 rounded border-primary accent-blue cursor-pointer"
                  />
                  <span className={`${item.completed ? 'line-through text-secondary' : 'text-primary'}`}>
                    {item.task}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
