/**
 * @krisspy-file
 * @type page
 * @name "MFAAssistantDashboard"
 * @title "MFA Assistant Dashboard"
 * @description "Medical Field Assistant interface showing disposition, appointments, and inventory management"
 * @routes ["/mfa/dashboard"]
 * @flowName "mfa-cockpit"
 * @layout "MFALayout"
 */

import { useState } from 'react';
import { Calendar, Package, MessageSquare, QrCode, FileText, CheckCircle2, AlertCircle, Clock, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MFAAssistantDashboard() {
  const navigate = useNavigate();
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      patientName: 'Johann Schmidt',
      time: '09:00',
      address: 'Hauptstraße 42, 10115 Berlin',
      priority: 'normal',
      status: 'upcoming',
      material: 'Blutentnahme-Set',
      materials: ['Blutentnahme-Set', 'Desinfektionsmittel', 'Wattestäbchen'],
    },
    {
      id: 2,
      patientName: 'Maria Müller',
      time: '10:30',
      address: 'Unter den Linden 5, 10117 Berlin',
      priority: 'high',
      status: 'upcoming',
      material: 'Grunduntersuchung',
      materials: ['Blutdruckmessgerät', 'Thermometer', 'Stethoskop'],
    },
    {
      id: 3,
      patientName: 'Klaus Wagner',
      time: '12:00',
      address: 'Friedrichstraße 95, 10117 Berlin',
      priority: 'normal',
      status: 'upcoming',
      material: 'EKG-Set',
      materials: ['EKG-Elektroden', 'EKG-Gel', 'Kabel'],
    },
    {
      id: 4,
      patientName: 'Anna Becker',
      time: '14:15',
      address: 'Potsdamer Platz 1, 10785 Berlin',
      priority: 'high',
      status: 'upcoming',
      material: 'Schnelltest',
      materials: ['COVID-Test', 'Abstrichtupfer', 'Testträger'],
    },
  ];

  // Mock inventory data
  const inventory = [
    { id: 1, name: 'Blutentnahme-Sets', quantity: 12, status: 'normal', expiration: '2025-06-15' },
    { id: 2, name: 'Desinfektionsmittel', quantity: 5, status: 'warning', expiration: '2025-04-20' },
    { id: 3, name: 'Verbandsmaterial', quantity: 18, status: 'normal', expiration: '2025-08-10' },
    { id: 4, name: 'Einmalhandschuhe', quantity: 2, status: 'critical', expiration: '2025-03-30' },
  ];

  const quickTools = [
    {
      id: 'scan',
      label: 'QR/Barcode Scanner',
      icon: QrCode,
      color: 'bg-blue hover:bg-blue-hover',
      route: '/mfa/barcode-scanner',
      description: 'Geräte und Materialien scannen',
    },
    {
      id: 'docs',
      label: 'Dokumentation',
      icon: FileText,
      color: 'bg-accent-blue-light hover:bg-accent-blue-light/80',
      route: '/mfa/documentation',
      description: 'Fotos und Unterschriften erfassen',
    },
    {
      id: 'communicate',
      label: 'Kommunikation',
      icon: MessageSquare,
      color: 'bg-accent-yellow hover:bg-accent-yellow/80',
      route: '/mfa/communication',
      description: 'Team-Chat und Handoff',
    },
    {
      id: 'checklist',
      label: 'Checkliste',
      icon: CheckCircle2,
      color: 'bg-success hover:bg-success/80',
      route: '/mfa/pre-visit-checklist',
      description: 'Vorbereitung vor Besuch',
    },
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const getInventoryStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-danger/10 border-danger/30 text-danger';
      case 'warning':
        return 'bg-accent-yellow/10 border-accent-yellow/30 text-accent-yellow';
      default:
        return 'bg-success/10 border-success/30 text-success';
    }
  };

  const getInventoryStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <Clock className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2xl">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-md">Einsatzplanung</h1>
          <p className="text-secondary flex items-center gap-md">
            <Calendar className="w-4 h-4" />
            {new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="bg-secondary rounded-lg p-lg border border-primary text-center">
          <p className="text-secondary text-sm mb-md">Fahrzeugauslastung</p>
          <p className="text-2xl font-bold text-blue">75%</p>
        </div>
      </div>

      {/* Disposition Overview - Row 1 */}
      <section className="space-y-lg">
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-md">
          <Briefcase className="w-6 h-6" />
          Einsatztag Übersicht
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          <div className="bg-secondary rounded-lg p-lg border border-primary">
            <p className="text-secondary text-sm mb-md">Termine heute</p>
            <p className="text-3xl font-bold text-blue">{appointments.length}</p>
            <p className="text-secondary text-xs mt-md">Geplante Besuche</p>
          </div>
          <div className="bg-secondary rounded-lg p-lg border border-primary">
            <p className="text-secondary text-sm mb-md">Fahrtroute</p>
            <p className="text-2xl font-bold text-accent-blue-light">4 Stopps</p>
            <p className="text-secondary text-xs mt-md">Gesamtdauer: 4,5 Std.</p>
          </div>
          <div className="bg-secondary rounded-lg p-lg border border-primary">
            <p className="text-secondary text-sm mb-md">Materialstatus</p>
            <div className="flex items-center gap-md mt-md">
              <CheckCircle2 className="w-6 h-6 text-success" />
              <span className="text-lg font-semibold text-success">OK</span>
            </div>
          </div>
          <div className="bg-secondary rounded-lg p-lg border border-primary">
            <p className="text-secondary text-sm mb-md">Fahrzeugkapazität</p>
            <p className="text-xl font-bold text-blue">3/4 Fächer</p>
            <p className="text-secondary text-xs mt-md">Verfügbar</p>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="space-y-lg">
        <h2 className="text-2xl font-semibold text-primary">Schnellzugriff</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleNavigate(tool.route)}
                className={`${tool.color} card-interactive group p-lg rounded-lg transition-all duration-200`}
              >
                <Icon className="w-8 h-8 text-primary mb-lg group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-primary mb-md text-left">{tool.label}</h3>
                <p className="text-sm text-secondary text-left">{tool.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Appointments */}
      <section className="space-y-lg">
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-md">
          <Calendar className="w-6 h-6" />
          Heutige Termine
        </h2>
        <div className="space-y-md">
          {appointments.map((appointment) => (
            <button
              key={appointment.id}
              onClick={() => navigate('/mfa/appointment-detail')}
              className="card-interactive w-full text-left group"
            >
              <div className="flex items-start justify-between mb-md">
                <div className="flex-1">
                  <div className="flex items-center gap-md mb-md">
                    <Clock className="w-4 h-4 text-blue" />
                    <p className="font-semibold text-primary">{appointment.time} Uhr</p>
                    {appointment.priority === 'high' && (
                      <span className="badge badge-danger">Wichtig</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-sm">{appointment.patientName}</h3>
                  <p className="text-secondary flex items-center gap-md">
                    <MapPin className="w-4 h-4" />
                    {appointment.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-md mt-md">
                {appointment.materials.map((material, idx) => (
                  <span key={idx} className="badge badge-info text-xs">
                    {material}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Inventory Status */}
      <section className="space-y-lg">
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-md">
          <Package className="w-6 h-6" />
          Materiallagerbestand
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {inventory.map((item) => (
            <div key={item.id} className="bg-secondary rounded-lg p-lg border border-primary">
              <div className="flex items-start justify-between mb-md">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary mb-md">{item.name}</h3>
                  <div className="flex items-center gap-md">
                    <span className={`inline-flex items-center gap-sm px-md py-sm rounded-md border ${getInventoryStatusColor(item.status)}`}>
                      {getInventoryStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.quantity} Stück</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-secondary">
                <p>Ablauf: {new Date(item.expiration).toLocaleDateString('de-DE')}</p>
                {item.status === 'critical' && (
                  <button className="text-danger font-semibold hover:text-danger/80">
                    Nachbestellung
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue/10 to-accent-blue-light/10 rounded-lg p-xl border border-blue/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-md">Bereit zum Einsatz?</h3>
            <p className="text-secondary">Starten Sie mit der Vorbereitung auf den heutigen Einsatztag</p>
          </div>
          <button
            onClick={() => navigate('/mfa/pre-visit-checklist')}
            className="btn btn-primary"
          >
            Checkliste starten
          </button>
        </div>
      </section>
    </div>
  );
}
