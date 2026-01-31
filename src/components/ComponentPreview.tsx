import React, { Suspense } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

/*-krisspy-code-start*/
// Auto-generated manifest data from system
const manifest = {
  "version": 1,
  "settings": {
    "framework": "react",
    "enableGuards": false,
    "baseUrl": "/"
  },
  "routes": [
    {
      "id": ".src.pages.designsystemtest",
      "file": "/src/pages/DesignSystemTest.tsx",
      "path": "/design-system",
      "pathExample": null,
      "component": "DesignSystemTest",
      "layout": null,
      "guards": null,
      "requiresAuth": false,
      "title": "Design System Test",
      "description": "Demo page showcasing the dark theme with Spotify-inspired design",
      "design": "template",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.loginscreen",
      "file": "/src/pages/LoginScreen.tsx",
      "path": "/login",
      "pathExample": null,
      "component": "LoginScreen",
      "layout": "AuthLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Login Screen",
      "description": "User authentication interface with role-based login",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.doctordriverdashboard",
      "file": "/src/pages/DoctordriverDashboard.tsx",
      "path": "/doctor/dashboard",
      "pathExample": null,
      "component": "DoctordriverDashboard",
      "layout": "DoctorLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Doctor/Driver Dashboard",
      "description": "Main cockpit interface showing daily patient schedule with priority warnings and critical alerts",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.mfaassistantdashboard",
      "file": "/src/pages/MFAAssistantDashboard.tsx",
      "path": "/mfa/dashboard",
      "pathExample": null,
      "component": "MFAAssistantDashboard",
      "layout": "MFALayout",
      "guards": null,
      "requiresAuth": false,
      "title": "MFA Assistant Dashboard",
      "description": "Medical Field Assistant interface showing disposition, appointments, and inventory management",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.patienthomescreen",
      "file": "/src/pages/PatientHomeScreen.tsx",
      "path": "/patient/home",
      "pathExample": null,
      "component": "PatientHomeScreen",
      "layout": "PatientLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Patient Home Screen",
      "description": "Patient-facing interface for appointment booking and medical history management",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.admindashboard",
      "file": "/src/pages/AdminDashboard.tsx",
      "path": "/admin/dashboard",
      "pathExample": null,
      "component": "AdminDashboard",
      "layout": "AdminLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Admin Dashboard",
      "description": "Administrative backend interface for system management and monitoring",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.patientdetailview",
      "file": "/src/pages/PatientDetailView.tsx",
      "path": "/doctor/patient-detail",
      "pathExample": null,
      "component": "PatientDetailView",
      "layout": "DoctorLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Patient Detail View",
      "description": "Comprehensive patient information including medical history, medications, allergies, and vital signs",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.routenavigation",
      "file": "/src/pages/RouteNavigation.tsx",
      "path": "/doctor/navigation",
      "pathExample": null,
      "component": "RouteNavigation",
      "layout": "DoctorLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Route Navigation",
      "description": "GPS-guided navigation with traffic integration and route optimization",
      "updatedAt": "2026-01-30T22:54:08.033Z"
    },
    {
      "id": ".src.pages.communicationhub",
      "file": "/src/pages/CommunicationHub.tsx",
      "path": "/doctor/communication",
      "pathExample": null,
      "component": "CommunicationHub",
      "layout": "DoctorLayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Communication Hub",
      "description": "Secure voice calls, encrypted messaging, and video consultation capabilities",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.appointmentdetailmfa",
      "file": "/src/pages/AppointmentDetailmfa.tsx",
      "path": "/mfa/appointment-detail",
      "pathExample": null,
      "component": "AppointmentDetailmfa",
      "layout": "MFALayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Appointment Detail (MFA)",
      "description": "Detailed appointment information with pre-visit preparation checklist",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    },
    {
      "id": ".src.pages.inventorymanagement",
      "file": "/src/pages/InventoryManagement.tsx",
      "path": "/mfa/inventory-management",
      "pathExample": null,
      "component": "InventoryManagement",
      "layout": "MFALayout",
      "guards": null,
      "requiresAuth": false,
      "title": "Inventory Management",
      "description": "Real-time material consumption tracking with sterilization status and expiration alerts",
      "updatedAt": "2026-01-30T23:32:46.819Z"
    }
  ],
  "components": [],
  "layouts": [
    {
      "name": "AuthLayout",
      "file": "/src/layouts/AuthLayout.tsx",
      "export": "default",
      "parent": null
    },
    {
      "name": "DoctorLayout",
      "file": "/src/layouts/DoctorLayout.tsx",
      "export": "default",
      "parent": null
    },
    {
      "name": "MFALayout",
      "file": "/src/layouts/MFALayout.tsx",
      "export": "default",
      "parent": null
    },
    {
      "name": "PatientLayout",
      "file": "/src/layouts/PatientLayout.tsx",
      "export": "default",
      "parent": null
    },
    {
      "name": "AdminLayout",
      "file": "/src/layouts/AdminLayout.tsx",
      "export": "default",
      "parent": null
    }
  ],
  "updatedAt": "2026-01-30T23:30:08.782Z",
  "updatedBy": "rckfq338jlotmqz34dhmxi"
};
/*-krisspy-code-end*/

function DynamicComponent({ modulePromise, exportName, props }: any) {
  const [Comp, setComp] = React.useState<any>(null);
  
  React.useEffect(() => {
    let mounted = true;
    modulePromise.then((m: any) => {
      if (mounted) {
        const component = exportName === 'default' ? m.default : m[exportName];
        setComp(() => component);
      }
    }).catch(() => {
      if (mounted) setComp(null);
    });
    return () => { mounted = false; };
  }, [modulePromise, exportName]);
  
  if (!Comp) return <div>Loading component...</div>;
  return <Comp {...props} />;
}

export default function ComponentPreview() {
  const [searchParams] = useSearchParams();
  const componentId = searchParams.get('id');
  
  if (!componentId) {
    return <div>No component ID specified</div>;
  }
  
  const comp = manifest.components?.find((c: any) => c.id === componentId);
  if (!comp) {
    return <div>Component "{componentId}" not found</div>;
  }
  
  const variantSlug = searchParams.get('variant') || comp.variants?.[0]?.slug || 'default';
  const variant = comp.variants?.find((v: any) => v.slug === variantSlug) || comp.variants?.[0];
  
  const width = Number(searchParams.get('w') || comp.canvas?.width || 600);
  const height = Number(searchParams.get('h') || comp.canvas?.height || 400);
  
  const modulePromise = import(/* @vite-ignore */ comp.file.replace('./src/components/', './'));
  const exportName = comp.export === 'default' || !comp.export ? 'default' : comp.export;
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent 
          modulePromise={modulePromise}
          exportName={exportName}
          props={variant?.props || {}} 
        />
      </Suspense>
    </div>
  );
}

export const ComponentPreviewRouter: React.FC = () => {
  return <ComponentPreview />;
};

function PageRouter() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Find the matching route in the manifest
  const route = manifest.routes?.find((r: any) => r.path === currentPath);
  
  if (!route) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page "{currentPath}" does not exist.</p>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go back to home
        </a>
      </div>
    );
  }
  
  // Check guards/permissions if enabled
  if (manifest.settings?.enableGuards && route.guards) {
    for (const guard of route.guards) {
      if (guard === 'auth') {
        // Simulate auth check - in real app, this would check actual auth state
        const isAuthenticated = false; // This would come from your auth context/store
        
        if (!isAuthenticated) {
          return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Authentication Required</h1>
              <p>You need to be logged in to access "{route.title}"</p>
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
    }
  }
  
  // Build layout chain by following parent dependencies
  const buildLayoutChain = (layoutName: string | null): string[] => {
    const chain: string[] = [];
    let currentLayoutName = layoutName;
    
    while (currentLayoutName) {
      chain.push(currentLayoutName);
      const layout = manifest.layouts?.find((l: any) => l.name === currentLayoutName);
      currentLayoutName = layout?.parent || null;
    }
    
    return chain.reverse(); // Reverse to get outermost first
  };
  
  const initialLayoutName = route.meta?.layout || manifest.settings?.defaultLayout || null;
  const layoutChain = buildLayoutChain(initialLayoutName);
  
  const pageModulePromise = import(/* @vite-ignore */ route.file.replace('./src/', '../'));
  
  // If no layouts, render page directly
  if (layoutChain.length === 0) {
    return (
      <Suspense fallback={<div>Loading {route.title || route.component}...</div>}>
        <DynamicComponent 
          modulePromise={pageModulePromise}
          exportName="default"
          props={{}} 
        />
      </Suspense>
    );
  }
  
  // Render page wrapped in nested layouts (recursive)
  const renderWithLayouts = (layoutIndex: number, children: React.ReactNode): React.ReactNode => {
    if (layoutIndex >= layoutChain.length) {
      return children;
    }
    
    const layoutName = layoutChain[layoutIndex];
    const layout = manifest.layouts?.find((l: any) => l.name === layoutName);
    
    if (!layout) {
      console.warn(`Layout "${layoutName}" not found in manifest`);
      return renderWithLayouts(layoutIndex + 1, children);
    }
    
    const layoutModulePromise = import(/* @vite-ignore */ layout.file.replace('./src/', '../'));
    
    return (
      <DynamicComponent 
        modulePromise={layoutModulePromise}
        exportName={layout.export || 'default'}
        props={{
          children: renderWithLayouts(layoutIndex + 1, children)
        }} 
      />
    );
  };
  
  const pageComponent = (
    <DynamicComponent 
      modulePromise={pageModulePromise}
      exportName="default"
      props={{}} 
    />
  );
  
  return (
    <Suspense fallback={<div>Loading {route.title || route.component}...</div>}>
      {renderWithLayouts(0, pageComponent)}
    </Suspense>
  );
}

export const PagePreviewRouter: React.FC = () => {
  return <PageRouter />;
};