/**
 * @krisspy-file
 * @type page
 * @name "PatientHomeScreen"
 * @title "Patient Home Screen"
 * @description "Patient-facing interface for appointment booking and medical history management"
 * @routes ["/patient/home"]
 * @flowName "patient-app"
 * @layout "PatientLayout"
 */

import { Calendar, FileText, Pill, Heart, ArrowRight, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function PatientHomeScreen() {
  const [patientName] = useState('Max Müller');

  // Mock data
  const upcomingAppointment = {
    date: '25. Januar 2025',
    time: '14:30 Uhr',
    doctor: 'Dr. Sarah Schmidt',
    specialty: 'Allgemeinmedizin',
    location: 'Berlin, Mitte',
    status: 'Bestätigt'
  };

  const recentVisits = [
    { id: 1, date: '18. Januar 2025', doctor: 'Dr. Schmidt', reason: 'Routineuntersuchung' },
    { id: 2, date: '10. Januar 2025', doctor: 'Dr. Weber', reason: 'Blutdruck-Kontrolle' },
    { id: 3, date: '02. Januar 2025', doctor: 'Dr. Schmidt', reason: 'Grippeimpfung' },
  ];

  const activePrescriptions = [
    { id: 1, name: 'Ibuprofen 400mg', dosage: '1-2 Tabletten täglich', endDate: '25.02.2025' },
    { id: 2, name: 'Vitamin D', dosage: '1 Kapsel täglich', endDate: '31.03.2025' },
  ];

  return (
    <div className="min-h-screen bg-primary text-primary pb-lg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary/80 backdrop-blur-md border-b border-tertiary">
        <div className="max-w-7xl mx-auto px-lg py-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Willkommen, {patientName}</h1>
              <p className="text-secondary text-sm mt-sm">Deine Gesundheit ist unsere Priorität</p>
            </div>
            <Heart className="w-8 h-8 text-blue" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-lg py-2xl space-y-2xl">

        {/* Welcome Section with Health Status */}
        <section className="space-y-lg">
          <h2 className="text-lg font-semibold text-primary">Status & Übersicht</h2>

          {/* Upcoming Appointment Card */}
          <div className="card bg-gradient-to-br from-blue/20 to-accent-yellow/10 border border-tertiary p-lg">
            <div className="flex items-start justify-between mb-lg">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-blue/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Nächster Termin</h3>
                  <p className="text-secondary text-sm">{upcomingAppointment.date}</p>
                </div>
              </div>
              <span className="badge badge-success">{upcomingAppointment.status}</span>
            </div>

            <div className="space-y-md bg-secondary/30 rounded-lg p-lg">
              <div className="flex items-center gap-md">
                <Clock className="w-5 h-5 text-blue flex-shrink-0" />
                <div>
                  <p className="text-secondary text-sm">Zeit</p>
                  <p className="text-primary font-medium">{upcomingAppointment.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-md">
                <Heart className="w-5 h-5 text-blue flex-shrink-0" />
                <div>
                  <p className="text-secondary text-sm">Arzt</p>
                  <p className="text-primary font-medium">{upcomingAppointment.doctor}</p>
                </div>
              </div>

              <div className="flex items-center gap-md">
                <MapPin className="w-5 h-5 text-blue flex-shrink-0" />
                <div>
                  <p className="text-secondary text-sm">Ort</p>
                  <p className="text-primary font-medium">{upcomingAppointment.location}</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-lg flex items-center justify-center gap-md">
              Termin verwalten
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Main Actions */}
        <section className="space-y-lg">
          <h2 className="text-lg font-semibold text-primary">Schnellzugriff</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Book Appointment */}
            <button className="card-interactive group p-lg text-left transition-all">
              <div className="flex items-start justify-between mb-lg">
                <div className="w-12 h-12 rounded-lg bg-blue/20 flex items-center justify-center group-hover:bg-blue/30 transition-colors">
                  <Calendar className="w-6 h-6 text-blue" />
                </div>
                <ArrowRight className="w-5 h-5 text-secondary group-hover:text-blue transition-colors" />
              </div>
              <h3 className="font-semibold text-primary mb-sm">Termin buchen</h3>
              <p className="text-secondary text-sm">Vereinbare einen neuen Arzttermin</p>
            </button>

            {/* Medical History */}
            <button className="card-interactive group p-lg text-left transition-all">
              <div className="flex items-start justify-between mb-lg">
                <div className="w-12 h-12 rounded-lg bg-accent-blue-light/20 flex items-center justify-center group-hover:bg-accent-blue-light/30 transition-colors">
                  <FileText className="w-6 h-6 text-accent-blue-light" />
                </div>
                <ArrowRight className="w-5 h-5 text-secondary group-hover:text-accent-blue-light transition-colors" />
              </div>
              <h3 className="font-semibold text-primary mb-sm">Krankengeschichte</h3>
              <p className="text-secondary text-sm">Deine medizinische Vorgeschichte</p>
            </button>

            {/* Prescriptions */}
            <button className="card-interactive group p-lg text-left transition-all">
              <div className="flex items-start justify-between mb-lg">
                <div className="w-12 h-12 rounded-lg bg-accent-yellow/20 flex items-center justify-center group-hover:bg-accent-yellow/30 transition-colors">
                  <Pill className="w-6 h-6 text-accent-yellow" />
                </div>
                <ArrowRight className="w-5 h-5 text-secondary group-hover:text-accent-yellow transition-colors" />
              </div>
              <h3 className="font-semibold text-primary mb-sm">Rezepte</h3>
              <p className="text-secondary text-sm">Aktuelle und vergangene Rezepte</p>
            </button>

            {/* Follow-up Care */}
            <button className="card-interactive group p-lg text-left transition-all">
              <div className="flex items-start justify-between mb-lg">
                <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-colors">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <ArrowRight className="w-5 h-5 text-secondary group-hover:text-success transition-colors" />
              </div>
              <h3 className="font-semibold text-primary mb-sm">Nachsorge</h3>
              <p className="text-secondary text-sm">Empfehlungen und Folgetermine</p>
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Letzte Aktivität</h2>
            <button className="text-blue hover:text-blue-hover transition-colors flex items-center gap-sm text-sm">
              Alle anzeigen
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Visits */}
          <div className="card p-lg">
            <h3 className="font-semibold text-primary mb-lg flex items-center gap-md">
              <Calendar className="w-5 h-5 text-blue" />
              Letzte Besuche
            </h3>
            <div className="space-y-md">
              {recentVisits.map((visit, idx) => (
                <div key={visit.id} className={`pb-md ${idx !== recentVisits.length - 1 ? 'border-b border-tertiary' : ''}`}>
                  <div className="flex items-center justify-between mb-sm">
                    <p className="text-primary font-medium">{visit.doctor}</p>
                    <p className="text-secondary text-sm">{visit.date}</p>
                  </div>
                  <p className="text-secondary text-sm">{visit.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="card p-lg">
            <h3 className="font-semibold text-primary mb-lg flex items-center gap-md">
              <Pill className="w-5 h-5 text-accent-yellow" />
              Aktive Rezepte ({activePrescriptions.length})
            </h3>
            <div className="space-y-md">
              {activePrescriptions.map((prescription, idx) => (
                <div key={prescription.id} className={`pb-md ${idx !== activePrescriptions.length - 1 ? 'border-b border-tertiary' : ''}`}>
                  <p className="text-primary font-medium mb-sm">{prescription.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-secondary text-sm">{prescription.dosage}</p>
                    <p className="text-secondary text-xs">Bis: {prescription.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-accent-blue-light/10 to-accent-yellow/10 rounded-lg p-lg border border-tertiary text-center">
          <h3 className="text-lg font-semibold text-primary mb-md">Fragen zu deiner Gesundheit?</h3>
          <p className="text-secondary mb-lg">Wende dich an unser Supportteam oder schaue dir deine Unterlagen an</p>
          <button className="btn btn-primary">
            Kontakt zum Support
          </button>
        </section>
      </main>
    </div>
  );
}
