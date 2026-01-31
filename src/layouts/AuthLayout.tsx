/**
 * @krisspy-file
 * @type layout
 * @name "AuthLayout"
 * @export "default"
 */

import React from 'react';
import { Zap } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-primary text-primary flex flex-col">
      {/* Background accent elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl" />
      </div>

      {/* Header with Logo */}
      <header className="relative z-10 border-b border-primary bg-primary/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-lg py-lg flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-gradient-to-br from-blue to-accent-blue-light rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">ViaCura+</h1>
              <p className="text-secondary text-xs">Healthcare Platform</p>
            </div>
          </div>
          <p className="text-secondary text-sm hidden md:block">On-Demand Medical Services</p>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-lg py-2xl">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary bg-primary/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-lg py-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-lg text-secondary text-sm">
            <p>© 2025 ViaCura+. All rights reserved.</p>
            <div className="flex gap-xl">
              <button className="hover:text-primary transition-colors">Privacy</button>
              <button className="hover:text-primary transition-colors">Terms</button>
              <button className="hover:text-primary transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
