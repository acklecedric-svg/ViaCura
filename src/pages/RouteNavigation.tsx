import React, { useMemo, useState } from "react";
import {
  MapPin,
  Navigation2,
  AlertCircle,
  Clock,
  Fuel,
  ArrowLeft,
  MapPinOff,
  ChevronRight,
} from "lucide-react";

interface RouteOption {
  id: string;
  name: string;
  duration: number;
  distance: number;
  trafficLevel: "low" | "medium" | "high";
}

interface NavigationState {
  isNavigating: boolean;
  selectedRoute: string;
  currentStep: number;
}

export default function RouteNavigation() {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isNavigating: false,
    selectedRoute: "fastest",
    currentStep: 0,
  });

  const patientLocation = {
    name: "Mr. Hans Mueller",
    address: "Hauptstrasse 42, 8000 Zurich",
    lat: 47.3769,
    lng: 8.5472,
  };

  const routeOptions: RouteOption[] = [
    {
      id: "fastest",
      name: "Fastest Route",
      duration: 18,
      distance: 12.5,
      trafficLevel: "low",
    },
    {
      id: "shortest",
      name: "Shortest Route",
      duration: 24,
      distance: 8.3,
      trafficLevel: "medium",
    },
    {
      id: "fuel-efficient",
      name: "Fuel Efficient",
      duration: 21,
      distance: 9.2,
      trafficLevel: "low",
    },
  ];

  const turnByTurnDirections = [
    "Turn right onto Bahnhofstrasse",
    "Continue straight for 2 km",
    "Turn left at traffic lights",
    "Merge onto Highway A4",
    "Exit toward Universitaetstrasse",
    "Arrive at destination on the right",
  ];

  const getTrafficColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
    }
  };

  const getTrafficBgColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "bg-green-500/20";
      case "medium":
        return "bg-yellow-500/20";
      case "high":
        return "bg-red-500/20";
    }
  };

  const selectedRouteData = routeOptions.find(
    (r) => r.id === navigationState.selectedRoute
  );

  // TSX-safe SVG background (no Tailwind bg-[url(...)] needed)
  const mapBackgroundSvg = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#444" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="300" fill="#1a1a1a"/>
        <rect width="400" height="300" fill="url(#grid)"/>
      </svg>
    `;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      {/* Map Display */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Simulated Map Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: mapBackgroundSvg,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Route line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          <polyline
            points="50,250 150,200 250,150 350,100"
            fill="none"
            stroke="#3b82f6"
            strokeWidth={3}
            opacity={0.8}
          />
        </svg>

        {/* Current Location Marker */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-300 animate-pulse" />
          <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400/30 rounded-full animate-ping" />
        </div>

        {/* Destination Marker */}
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 z-10">
          <MapPin className="w-6 h-6 text-red-500 drop-shadow-lg" fill="currentColor" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button
            type="button"
            onClick={() => (window.location.href = "/doctor/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Map indicator */}
        <div className="absolute bottom-4 right-4 z-20 text-gray-300 text-xs">
          📍 Interactive Map View
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-4xl mx-auto p-4">
          {/* Navigation summary */}
          {navigationState.isNavigating && (
            <div className="mb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-300 text-sm">
                    To: {patientLocation.name}
                  </p>
                  <p className="text-white font-semibold">
                    {selectedRouteData?.distance} km • {selectedRouteData?.duration} min
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    selectedRouteData
                      ? getTrafficBgColor(selectedRouteData.trafficLevel)
                      : "bg-green-500/20"
                  }`}
                >
                  <AlertCircle
                    className={`w-4 h-4 ${
                      selectedRouteData
                        ? getTrafficColor(selectedRouteData.trafficLevel)
                        : "text-green-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold uppercase ${
                      selectedRouteData
                        ? getTrafficColor(selectedRouteData.trafficLevel)
                        : "text-green-400"
                    }`}
                  >
                    {(selectedRouteData?.trafficLevel ?? "low").toUpperCase()} traffic
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Route Options */}
          {!navigationState.isNavigating && (
            <>
              <h3 className="text-lg font-bold text-white mb-4">
                Available Routes
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {routeOptions.map((route) => (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() =>
                      setNavigationState((prev) => ({
                        ...prev,
                        selectedRoute: route.id,
                      }))
                    }
                    className={`p-4 rounded-lg border transition-colors ${
                      navigationState.selectedRoute === route.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-700 bg-gray-900 hover:border-blue-500"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-white text-sm font-semibold">
                        {route.name}
                      </span>
                      <Navigation2 className="w-4 h-4 text-blue-400" />
                    </div>

                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Clock className="w-3 h-3" />
                        <span>{route.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Fuel className="w-3 h-3" />
                        <span>{route.distance} km</span>
                      </div>
                    </div>

                    <div
                      className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${getTrafficBgColor(
                        route.trafficLevel
                      )} ${getTrafficColor(route.trafficLevel)}`}
                    >
                      {route.trafficLevel.toUpperCase()} traffic
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Turn-by-turn */}
          {navigationState.isNavigating && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-3">Directions</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {turnByTurnDirections.map((direction, index) => {
                  const isCurrent = index === navigationState.currentStep;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        isCurrent
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700 bg-gray-900"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          isCurrent
                            ? "bg-blue-500 text-white"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            isCurrent ? "text-white font-semibold" : "text-gray-300"
                          }`}
                        >
                          {direction}
                        </p>
                      </div>

                      {isCurrent && (
                        <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {navigationState.isNavigating ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setNavigationState((prev) => ({
                      ...prev,
                      currentStep:
                        (prev.currentStep + 1) % turnByTurnDirections.length,
                    }))
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Navigation2 className="w-5 h-5" />
                  Next Step
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setNavigationState({
                      isNavigating: false,
                      selectedRoute: "fastest",
                      currentStep: 0,
                    })
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  <MapPinOff className="w-5 h-5" />
                  Stop Navigation
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setNavigationState((prev) => ({
                      ...prev,
                      isNavigating: true,
                      currentStep: 0,
                    }))
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Navigation2 className="w-5 h-5" />
                  Start Navigation
                </button>

                <button
                  type="button"
                  onClick={() => (window.location.href = "/doctor/patient-detail")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  View Patient Details
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @krisspy-file
 * @type page
 * @name RouteNavigation
 * @title "Route Navigation"
 * @description "GPS-guided navigation with traffic integration and route optimization"
 * @routes ["/doctor/navigation"]
 * @flowName "doctor-cockpit"
 * @layout "DoctorLayout"
 */