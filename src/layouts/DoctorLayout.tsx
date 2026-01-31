/**
 * @krisspy-file
 * @type layout
 * @name "DoctorLayout"
 * @export "default"
 */

import React, { useState } from 'react';
import { Menu, X, Home, MapPin, Phone, FileText, Settings, LogOut, ChevronRight } from 'lucide-react';

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/doctor/dashboard', id: 'dashboard' },
    { icon: MapPin, label: 'Navigation', href: '/doctor/navigation', id: 'navigation' },
    { icon: FileText, label: 'Patient Details', href: '/doctor/patient-detail', id: 'patient' },
    { icon: Phone, label: 'Communication', href: '/doctor/communication', id: 'communication' },
    { icon: Settings, label: 'Settings', href: '#settings', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-secondary border-r border-primary transition-all duration-300 flex flex-col hidden md:flex`}
      >
        {/* Header */}
        <div className="p-lg border-b border-primary flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-md">
              <div className="w-8 h-8 bg-blue rounded-md flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-primary">ViaCura+</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-md hover:bg-tertiary rounded-md transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-secondary" />
            ) : (
              <Menu className="w-5 h-5 text-secondary" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-md space-y-sm overflow-y-auto">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-md p-md rounded-md transition-colors hover:bg-tertiary group ${
                sidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <item.icon className="w-5 h-5 text-secondary group-hover:text-blue transition-colors flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-md border-t border-primary space-y-sm">
          <button className={`w-full flex items-center gap-md p-md rounded-md transition-colors hover:bg-tertiary ${
            sidebarOpen ? 'justify-start' : 'justify-center'
          }`}>
            <LogOut className="w-5 h-5 text-secondary hover:text-blue transition-colors flex-shrink-0" />
            {sidebarOpen && <span className="text-sm text-secondary">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-secondary border-b border-primary px-lg py-lg flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 bg-blue rounded-md flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-primary">ViaCura+</h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-md hover:bg-tertiary rounded-md transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-secondary" />
            ) : (
              <Menu className="w-6 h-6 text-secondary" />
            )}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-secondary border-b border-primary px-lg py-lg space-y-sm">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center justify-between p-md rounded-md transition-colors hover:bg-tertiary group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-md">
                  <item.icon className="w-5 h-5 text-secondary group-hover:text-blue transition-colors" />
                  <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-secondary" />
              </a>
            ))}
            <div className="pt-md border-t border-primary">
              <button className="w-full flex items-center gap-md p-md rounded-md transition-colors hover:bg-tertiary">
                <LogOut className="w-5 h-5 text-secondary hover:text-blue transition-colors" />
                <span className="text-sm text-secondary">Logout</span>
              </button>
            </div>
          </nav>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
