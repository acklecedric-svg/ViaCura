import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComponentPreviewRouter } from './components/ComponentPreview';

/*-krisspy-code-start*/
// Auto-generated imports from manifest
import DesignSystemTest from '/src/pages/DesignSystemTest.tsx';
import LoginScreen from '/src/pages/LoginScreen.tsx';
import DoctordriverDashboard from '/src/pages/DoctordriverDashboard.tsx';
import MFAAssistantDashboard from '/src/pages/MFAAssistantDashboard.tsx';
import PatientHomeScreen from '/src/pages/PatientHomeScreen.tsx';
import AdminDashboard from '/src/pages/AdminDashboard.tsx';
import PatientDetailView from '/src/pages/PatientDetailView.tsx';
import RouteNavigation from '/src/pages/RouteNavigation.tsx';
import CommunicationHub from '/src/pages/CommunicationHub.tsx';
import AppointmentDetailmfa from '/src/pages/AppointmentDetailmfa.tsx';
import InventoryManagement from '/src/pages/InventoryManagement.tsx';
import AuthLayout from '/src/layouts/AuthLayout.tsx';
import DoctorLayout from '/src/layouts/DoctorLayout.tsx';
import MFALayout from '/src/layouts/MFALayout.tsx';
import PatientLayout from '/src/layouts/PatientLayout.tsx';
import AdminLayout from '/src/layouts/AdminLayout.tsx';
/*-krisspy-code-end*/



// Auth guard component
function AuthGuard({ children, requiresAuth = false }: { children: React.ReactNode, requiresAuth?: boolean }) {
  if (requiresAuth) {
    const isAuthenticated = false; // This would come from your auth context/store
    
    if (!isAuthenticated) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Authentication Required</h1>
          <p>You need to be logged in to access this page</p>
          <button style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}>
            Sign In
          </button>
        </div>
      );
    }
  }
  
  return <>{children}</>;
}

// Layout wrapper component
function PageWithLayout({ 
  page: Page, 
  layouts = [] 
}: { 
  page: React.ComponentType, 
  layouts?: React.ComponentType<{ children: React.ReactNode }>[] 
}) {
  if (!layouts.length) {
    return <Page />;
  }
  
  // Render nested layouts from outermost to innermost
  return layouts.reduceRight(
    (acc, Layout) => <Layout>{acc}</Layout>, 
    <Page />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/*-krisspy-code-start*/}
        {/* Auto-generated routes from manifest */}
        <Route path="/" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={LoginScreen} layouts={[AuthLayout]} />
          </AuthGuard>
        } />

        <Route path="/design-system" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={DesignSystemTest} layouts={[]} />
          </AuthGuard>
        } />

        <Route path="/login" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={LoginScreen} layouts={[AuthLayout]} />
          </AuthGuard>
        } />

        <Route path="/doctor/dashboard" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={DoctordriverDashboard} layouts={[DoctorLayout]} />
          </AuthGuard>
        } />

        <Route path="/mfa/dashboard" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={MFAAssistantDashboard} layouts={[MFALayout]} />
          </AuthGuard>
        } />

        <Route path="/patient/home" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={PatientHomeScreen} layouts={[PatientLayout]} />
          </AuthGuard>
        } />

        <Route path="/admin/dashboard" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={AdminDashboard} layouts={[AdminLayout]} />
          </AuthGuard>
        } />

        <Route path="/doctor/patient-detail" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={PatientDetailView} layouts={[DoctorLayout]} />
          </AuthGuard>
        } />

        <Route path="/doctor/navigation" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={RouteNavigation} layouts={[DoctorLayout]} />
          </AuthGuard>
        } />

        <Route path="/doctor/communication" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={CommunicationHub} layouts={[DoctorLayout]} />
          </AuthGuard>
        } />

        <Route path="/mfa/appointment-detail" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={AppointmentDetailmfa} layouts={[MFALayout]} />
          </AuthGuard>
        } />

        <Route path="/mfa/inventory-management" element={
          <AuthGuard requiresAuth={false}>
            <PageWithLayout page={InventoryManagement} layouts={[MFALayout]} />
          </AuthGuard>
        } />
        {/*-krisspy-code-end*/}
        
        <Route path="/_component/*" element={<ComponentPreviewRouter />} />
        <Route path="*" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
              Go back to home
            </a>
          </div>
        } />
      </Routes>
    </Router>
  );
}