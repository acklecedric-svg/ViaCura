/**
 * @krisspy-file
 * @type layout
 * @name "PatientLayout"
 * @export "default"
 */

import React from 'react';

interface PatientLayoutProps {
  children: React.ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="PatientLayout-layout">
      {/* PatientLayout layout wrapper */}
      {children}
    </div>
  );
}
