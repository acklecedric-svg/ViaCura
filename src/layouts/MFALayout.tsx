/**
 * @krisspy-file
 * @type layout
 * @name "MFALayout"
 * @export "default"
 */

import React, { useState } from 'react';
import { Menu, X, Briefcase, Package, BarChart3, MessageSquare, Home } from 'lucide-react';

interface MFALayoutProps {
  children: React.ReactNode;
}

export default function MFALayout({ children }: MFALayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', icon: Home, href: '/mfa/dashboard' },
    { label: 'Appointments', icon: Briefcase, href: '/mfa/appointment-detail' },
    { label: 'Inventory', icon: Package, href: '/mfa/inventory-management' },
    { label: 'Analytics', icon: BarChart3, href: '#' },
    { label: 'Communication', icon: MessageSquare, href: '#' },
  ];

  return (
    <div className="MFALayout-layout flex min-h-screen bg-primary text-primary">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-secondary border-r border-primary transform transition-transform duration-300 lg:static lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-lg border-b border-primary flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-blue flex items-center justify-center">
                <Briefcase size={24} className="text-primary" />
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline">ViaCura+</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-secondary hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-lg space-y-md overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-md p-md rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-all duration-200 group"
                >
                  <Icon size={20} className="group-hover:text-blue transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-lg border-t border-primary">
            <div className="p-md bg-tertiary rounded-lg">
              <p className="text-sm text-secondary">MFA Assistant</p>
              <p className="text-xs text-secondary mt-sm">Mobile Unit Ready</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-secondary border-b border-primary">
          <div className="flex items-center justify-between p-lg">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-secondary hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-primary flex-1 text-center lg:text-left">
              Medical Field Assistant
            </h1>
            <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
              <span className="text-sm font-semibold text-blue">MFA</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-lg lg:p-xl max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-secondary border-t border-primary p-lg text-center text-sm text-secondary">
          <p>© 2024 ViaCura+ | Medical Field Assistant Panel</p>
        </footer>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
