/**
 * @krisspy-file
 * @type page
 * @name "DoctordriverDashboard"
 * @title "Doctor/Driver Dashboard"
 * @description "Main cockpit interface showing daily patient schedule with priority warnings and critical alerts"
 * @routes ["/doctor/dashboard"]
 * @flowName "doctor-cockpit"
 * @layout "DoctorLayout"
 */

import React, { useState } from 'react';
import { Clock, AlertCircle, MapPin, Phone, MessageSquare, Eye, Navigation2, Battery, Wifi, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  condition: string;
  appointmentTime: string;
  location: string;
  priority: 'critical' | 'high' | 'normal';
  distance: string;
  status: 'upcoming' | 'in-progress';
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Schmidt',
    condition: 'Diabetes Management Follow-up',
    appointmentTime: '09:30 AM',
    location: 'Berliner Str. 45, Berlin',
    priority: 'critical',
    distance: '2.3 km',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Hans Müller',
    condition: 'Blood Pressure Check',
    appointmentTime: '10:15 AM',
    location: 'Charlottenburg, Berlin',
    priority: 'high',
    distance: '5.1 km',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Anna Weber',
    condition: 'Routine Examination',
    appointmentTime: '11:00 AM',
    location: 'Mitte District, Berlin',
    priority: 'normal',
    distance: '8.2 km',
    status: 'upcoming'
  },
  {
    id: '4',
    name: 'Klaus Fischer',
    condition: 'Post-Surgery Wound Check',
    appointmentTime: '02:00 PM',
    location: 'Prenzlauer Berg, Berlin',
    priority: 'high',
    distance: '12.5 km',
    status: 'upcoming'
  },
];

export default function DoctordriverDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-danger bg-danger/10';
      case 'high':
        return 'border-yellow-500 bg-yellow-500/10';
      default:
        return 'border-blue bg-blue/10';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-danger/20 text-danger';
      case 'high':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-blue/20 text-blue';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'CRITICAL';
      case 'high':
        return 'HIGH';
      default:
        return 'NORMAL';
    }
  };

  return (
    <div className="min-h-screen bg-primary p-lg md:p-2xl">
      {/* Header Section */}
      <div className="mb-2xl">
        <div className="flex items-center justify-between mb-lg">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-md">Daily Schedule</h1>
            <p className="text-secondary">Today's patient appointments & critical alerts</p>
          </div>
          <div className="flex gap-md">
            <div className="bg-secondary border border-primary rounded-lg p-md flex items-center gap-sm">
              <Battery className="w-5 h-5 text-blue" />
              <span className="text-sm text-primary font-medium">94%</span>
            </div>
            <div className="bg-secondary border border-primary rounded-lg p-md flex items-center gap-sm">
              <Wifi className="w-5 h-5 text-blue" />
              <span className="text-sm text-primary font-medium">LTE</span>
            </div>
          </div>
        </div>

        {/* Critical Alert Banner */}
        {mockPatients.some(p => p.priority === 'critical') && (
          <div className="bg-danger/10 border border-danger rounded-lg p-lg flex gap-lg items-start">
            <AlertCircle className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-danger mb-sm">⚠ Critical Alert</p>
              <p className="text-sm text-danger/90">1 patient requires immediate attention. Review Maria Schmidt's case before departure.</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-2xl">
        <div className="bg-secondary border border-primary rounded-lg p-lg">
          <div className="flex items-center justify-between mb-md">
            <p className="text-secondary text-sm">Vehicle Status</p>
            <CheckCircle2 className="w-5 h-5 text-blue" />
          </div>
          <p className="text-xl font-bold text-primary">Ready</p>
          <p className="text-xs text-secondary mt-md">All systems operational</p>
        </div>
        <div className="bg-secondary border border-primary rounded-lg p-lg">
          <div className="flex items-center justify-between mb-md">
            <p className="text-secondary text-sm">Total Patients</p>
            <Clock className="w-5 h-5 text-blue" />
          </div>
          <p className="text-xl font-bold text-primary">{mockPatients.length}</p>
          <p className="text-xs text-secondary mt-md">Today's appointments</p>
        </div>
        <div className="bg-secondary border border-primary rounded-lg p-lg">
          <div className="flex items-center justify-between mb-md">
            <p className="text-secondary text-sm">Next Appointment</p>
            <Clock className="w-5 h-5 text-blue" />
          </div>
          <p className="text-xl font-bold text-primary">09:30</p>
          <p className="text-xs text-secondary mt-md">In 15 minutes</p>
        </div>
        <div className="bg-secondary border border-primary rounded-lg p-lg">
          <div className="flex items-center justify-between mb-md">
            <p className="text-secondary text-sm">Total Distance</p>
            <Navigation2 className="w-5 h-5 text-blue" />
          </div>
          <p className="text-xl font-bold text-primary">28.1 km</p>
          <p className="text-xs text-secondary mt-md">Estimated route</p>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-lg">
        <h2 className="text-xl font-semibold text-primary">Patient Schedule</h2>
        {mockPatients.map((patient, index) => (
          <div
            key={patient.id}
            className={`bg-secondary border rounded-lg p-lg transition-all duration-200 cursor-pointer hover:border-blue hover:shadow-lg ${
              getPriorityColor(patient.priority)
            } ${selectedPatient === patient.id ? 'ring-2 ring-blue' : ''}`}
            onClick={() => setSelectedPatient(selectedPatient === patient.id ? null : patient.id)}
          >
            <div className="flex items-start justify-between gap-lg">
              <div className="flex-1">
                {/* Priority Badge & Patient Name */}
                <div className="flex items-center gap-md mb-md">
                  <span className={`text-xs font-bold px-md py-xs rounded-full ${getPriorityBadgeColor(patient.priority)}`}>
                    {getPriorityLabel(patient.priority)}
                  </span>
                  <h3 className="text-lg font-semibold text-primary">{`${index + 1}. ${patient.name}`}</h3>
                </div>

                {/* Condition & Time */}
                <p className="text-secondary text-sm mb-md">{patient.condition}</p>

                <div className="flex flex-wrap gap-lg text-sm">
                  <div className="flex items-center gap-sm text-secondary">
                    <Clock className="w-4 h-4" />
                    <span>{patient.appointmentTime}</span>
                  </div>
                  <div className="flex items-center gap-sm text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span>{patient.location}</span>
                  </div>
                  <div className="flex items-center gap-sm text-secondary">
                    <Navigation2 className="w-4 h-4" />
                    <span>{patient.distance}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedPatient === patient.id && (
                  <div className="mt-lg pt-lg border-t border-primary/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div>
                        <p className="text-xs text-secondary uppercase font-semibold mb-sm">Medical Notes</p>
                        <p className="text-sm text-primary">Patient waiting for scheduled visit. All pre-visit forms completed.</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary uppercase font-semibold mb-sm">Visit Status</p>
                        <p className="text-sm text-primary">Upcoming appointment • Ready for visit</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-md">
                <button className="w-12 h-12 bg-tertiary hover:bg-blue/20 border border-primary rounded-lg flex items-center justify-center transition-all duration-200 group" title="View Details">
                  <Eye className="w-5 h-5 text-secondary group-hover:text-blue" />
                </button>
                <button className="w-12 h-12 bg-tertiary hover:bg-blue/20 border border-primary rounded-lg flex items-center justify-center transition-all duration-200 group" title="Start Navigation">
                  <Navigation2 className="w-5 h-5 text-secondary group-hover:text-blue" />
                </button>
                <button className="w-12 h-12 bg-tertiary hover:bg-blue/20 border border-primary rounded-lg flex items-center justify-center transition-all duration-200 group" title="Call Patient">
                  <Phone className="w-5 h-5 text-secondary group-hover:text-blue" />
                </button>
                <button className="w-12 h-12 bg-tertiary hover:bg-blue/20 border border-primary rounded-lg flex items-center justify-center transition-all duration-200 group" title="Message MFA Assistant">
                  <MessageSquare className="w-5 h-5 text-secondary group-hover:text-blue" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-2xl pt-lg border-t border-primary text-center text-secondary text-sm">
        <p>Last updated: Today at 08:45 AM • Route optimization enabled</p>
      </div>
    </div>
  );
}
