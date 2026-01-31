/**
 * @krisspy-file
 * @type page
 * @name "AppointmentDetailmfa"
 * @title "Appointment Detail (MFA)"
 * @description "Detailed appointment information with pre-visit preparation checklist"
 * @routes ["/mfa/appointment-detail"]
 * @flowName "mfa-cockpit"
 * @layout "MFALayout"
 */

import { useState } from 'react';
import { ArrowLeft, AlertCircle, Check, Clock, MapPin, User, Heart, Pill, AlertTriangle, CheckCircle2, Package, Zap } from 'lucide-react';

export default function AppointmentDetailmfa() {
  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);
  const [checklistItems, setChecklistItems] = useState({
    materials: [
      { id: '1', name: 'Sterile Gloves', completed: false, required: true },
      { id: '2', name: 'Disposable Masks', completed: false, required: true },
      { id: '3', name: 'Alcohol Swabs', completed: false, required: true },
      { id: '4', name: 'Bandages Assorted', completed: false, required: true },
      { id: '5', name: 'Medical Thermometer', completed: false, required: true },
    ],
    equipment: [
      { id: '1', name: 'Blood Pressure Monitor', completed: false, required: true },
      { id: '2', name: 'Stethoscope', completed: false, required: true },
      { id: '3', name: 'Portable ECG Device', completed: false, required: false },
      { id: '4', name: 'Oxygen Saturation Monitor', completed: false, required: true },
    ],
    sterilization: [
      { id: '1', name: 'Instrument Tray Sterilized', completed: false, required: true },
      { id: '2', name: 'Needles Counted', completed: false, required: true },
      { id: '3', name: 'Gloves Checked Expiry', completed: false, required: true },
      { id: '4', name: 'Biohazard Container Ready', completed: false, required: true },
    ],
  });

  const toggleChecklistItem = (section: keyof typeof checklistItems, itemId: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleMarkReady = () => {
    alert('Appointment marked as ready!');
  };

  const handleInventoryCheck = () => {
    window.location.href = '/mfa/inventory-management';
  };

  const handleScanItems = () => {
    window.location.href = '/mfa/barcode-scanner';
  };

  const handleBack = () => {
    window.location.href = '/mfa/dashboard';
  };

  // Mock appointment data
  const appointment = {
    patientName: 'Dr. Wolfgang Schmidt',
    patientId: 'PT-2024-1234',
    appointmentTime: '2024-01-20 14:30',
    location: 'Schönhauser Allee 123, Berlin',
    type: 'Kardiale Untersuchung',
    priority: 'Hoch',
  };

  const patientSummary = {
    medicalHistory: ['Bluthochdruck seit 5 Jahren', 'Raucher (aktiv)', 'Familiäre Disposition für Herzerkrankungen'],
    allergies: ['Penicilin G (Ausschlag)', 'Latex'],
    medications: ['Lisinopril 10mg täglich', 'Atorvastatin 20mg abends'],
    vitalSigns: {
      bloodPressure: '145/92 mmHg',
      heartRate: '78 bpm',
      temperature: '36.5°C',
      oxygenSaturation: '98%',
    },
  };

  return (
    <div className="space-y-lg">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <button
            onClick={handleBack}
            className="btn btn-ghost"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
          <h1 className="text-3xl font-bold text-primary">Termin Details</h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Column: Appointment & Patient Info */}
        <div className="lg:col-span-2 space-y-lg">
          {/* Appointment Information Card */}
          <div className="card">
            <div className="flex items-start justify-between mb-lg pb-lg border-b border-tertiary">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-md">Termin Information</h2>
              </div>
              <span className={`px-md py-sm rounded-full text-sm font-medium ${
                appointment.priority === 'Hoch'
                  ? 'bg-danger/20 text-danger'
                  : 'bg-success/20 text-success'
              }`}>
                {appointment.priority} Priorität
              </span>
            </div>

            <div className="space-y-md">
              {/* Patient Info */}
              <div className="flex items-start gap-lg">
                <User className="w-5 h-5 text-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-secondary">Patient Name</p>
                  <p className="text-lg font-semibold text-primary">{appointment.patientName}</p>
                  <p className="text-sm text-secondary">{appointment.patientId}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-lg">
                <Clock className="w-5 h-5 text-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-secondary">Zeit</p>
                  <p className="text-lg font-semibold text-primary">{appointment.appointmentTime}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-lg">
                <MapPin className="w-5 h-5 text-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-secondary">Ort</p>
                  <p className="text-lg font-semibold text-primary">{appointment.location}</p>
                </div>
              </div>

              {/* Type */}
              <div className="flex items-start gap-lg">
                <Heart className="w-5 h-5 text-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-secondary">Termin Typ</p>
                  <p className="text-lg font-semibold text-primary">{appointment.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Medical Summary Card */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-primary mb-lg pb-lg border-b border-tertiary">Medizinische Zusammenfassung</h2>

            <div className="space-y-lg">
              {/* Medical History */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-md flex items-center gap-md">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  Medizinische Vorgeschichte
                </h3>
                <ul className="space-y-sm">
                  {patientSummary.medicalHistory.map((item, idx) => (
                    <li key={idx} className="text-secondary flex items-start gap-md">
                      <span className="text-blue mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Allergies - Alert */}
              <div className="bg-danger/10 border border-danger/30 rounded-lg p-lg flex gap-md">
                <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-danger mb-md">Allergien</p>
                  <div className="space-y-sm">
                    {patientSummary.allergies.map((allergy, idx) => (
                      <p key={idx} className="text-sm text-danger/80">{allergy}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-md flex items-center gap-md">
                  <Pill className="w-5 h-5 text-blue" />
                  Aktuelle Medikamente
                </h3>
                <ul className="space-y-sm">
                  {patientSummary.medications.map((med, idx) => (
                    <li key={idx} className="text-secondary flex items-start gap-md">
                      <span className="text-blue mt-1">•</span>
                      <span>{med}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vital Signs */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-md flex items-center gap-md">
                  <Zap className="w-5 h-5 text-blue" />
                  Letzte Vitalzeichen
                </h3>
                <div className="grid grid-cols-2 gap-md">
                  {Object.entries(patientSummary.vitalSigns).map(([key, value]) => (
                    <div key={key} className="bg-tertiary rounded-lg p-md">
                      <p className="text-xs text-secondary uppercase tracking-wider mb-sm">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-lg font-semibold text-blue">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-Visit Checklist */}
        <div className="space-y-lg">
          {/* Checklist Card */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-primary mb-lg pb-lg border-b border-tertiary">Vorbereitung</h2>

            <div className="space-y-md">
              {Object.entries(checklistItems).map(([section, items]) => (
                <div key={section}>
                  <button
                    onClick={() => setSelectedChecklist(selectedChecklist === section ? null : section)}
                    className={`w-full flex items-center justify-between p-md rounded-lg transition-colors ${
                      selectedChecklist === section
                        ? 'bg-tertiary text-primary'
                        : 'hover:bg-tertiary/50 text-secondary'
                    }`}
                  >
                    <span className="font-semibold capitalize">
                      {section === 'materials' ? 'Materialien' : section === 'equipment' ? 'Ausrüstung' : 'Sterilisierung'}
                    </span>
                    <span className="text-sm bg-secondary/50 px-md py-sm rounded-full">
                      {items.filter(i => i.completed).length}/{items.length}
                    </span>
                  </button>

                  {selectedChecklist === section && (
                    <div className="mt-md space-y-sm ml-md border-l-2 border-tertiary pl-md">
                      {items.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-md p-sm rounded cursor-pointer hover:bg-tertiary/50 transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleChecklistItem(section as keyof typeof checklistItems, item.id)}
                            className="w-4 h-4 rounded border-blue accent-blue cursor-pointer"
                          />
                          <span className={`flex-1 text-sm transition-all ${
                            item.completed
                              ? 'text-secondary line-through'
                              : 'text-primary group-hover:text-primary'
                          }`}>
                            {item.name}
                          </span>
                          {item.required && (
                            <span className="text-xs text-danger">*</span>
                          )}
                          {item.completed && (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-secondary mt-lg pt-lg border-t border-tertiary">
              * = Erforderlich
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-md">
            <button
              onClick={handleMarkReady}
              className="btn btn-primary w-full flex items-center justify-center gap-md"
            >
              <Check className="w-5 h-5" />
              Fertig markieren
            </button>
            <button
              onClick={handleInventoryCheck}
              className="btn btn-secondary w-full flex items-center justify-center gap-md"
            >
              <Package className="w-5 h-5" />
              Bestand prüfen
            </button>
            <button
              onClick={handleScanItems}
              className="btn btn-ghost w-full flex items-center justify-center gap-md"
            >
              <Zap className="w-5 h-5" />
              QR scannen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
