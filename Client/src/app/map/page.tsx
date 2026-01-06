"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type Hospital } from "@/components/HospitalMap"; // Importing type

const HospitalMap = dynamic(() => import("@/components/HospitalMap"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>,
});

// Helper to generate mock hospitals around a location
const generateNearbyHospitals = (centerLat: number, centerLng: number): Hospital[] => {
    return [
        {
            id: "1",
            name: "City General Hospital",
            type: "Govt",
            lat: centerLat + 0.005,
            lng: centerLng + 0.002,
            availability: 82,
            distance: "0.8km",
            address: "Near City Center",
            features: ["Cardiology", "Trauma Center"],
            status: "Available"
        },
        {
            id: "2",
            name: "St. Mary's Private",
            type: "Private",
            lat: centerLat - 0.004,
            lng: centerLng + 0.006,
            availability: 15,
            distance: "1.2km",
            address: "45 Park Avenue",
            features: ["Pediatrics", "General"],
            status: "Limited"
        },
        {
            id: "3",
            name: "Apollo Cradle",
            type: "Private",
            lat: centerLat + 0.008,
            lng: centerLng - 0.003,
            availability: 0,
            distance: "2.1km",
            address: "Sector 14, Main Road",
            features: ["Maternity", "Critical Care"],
            status: "Critical"
        }
    ];
};

export default function MapPage() {
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Map State
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [center, setCenter] = useState<[number, number]>([28.4595, 77.0266]); // Default fallback
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [isLocating, setIsLocating] = useState(true);

    // Initial Location Detection
    React.useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userPos: [number, number] = [latitude, longitude];
                    setUserLocation(userPos);
                    setCenter(userPos);
                    setHospitals(generateNearbyHospitals(latitude, longitude));
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Location error:", error);
                    setIsLocating(false);
                    // Generate hospitals around default center if location fails
                    setHospitals(generateNearbyHospitals(28.4595, 77.0266));
                },
                { enableHighAccuracy: true }
            );
        } else {
            setIsLocating(false);
            setHospitals(generateNearbyHospitals(28.4595, 77.0266));
        }
    }, []);

    const handleCenterOnMe = () => {
        if (userLocation) {
            setCenter(userLocation);
        } else {
            // Retry detection
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userPos: [number, number] = [latitude, longitude];
                    setUserLocation(userPos);
                    setCenter(userPos);
                    setHospitals(generateNearbyHospitals(latitude, longitude));
                    setIsLocating(false);
                },
                () => setIsLocating(false)
            );
        }
    };

    return (
        <div className="bg-background-light text-slate-900 font-display h-screen flex flex-col overflow-hidden">
            {/* 1. Minimal Header */}
            <header className="flex-none h-16 bg-surface-light border-b border-slate-200 flex items-center justify-between px-6 z-20 shadow-sm">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-8 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined text-2xl">local_hospital</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">RakshaPath</h1>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">Emergency Map</p>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-yellow-700">Locating nearest care for Cardiology...</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex flex-col items-end mr-2">
                        <span className="text-xs text-slate-500 font-medium">Your Location</span>
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-base">my_location</span>
                            Sector 42, Gurgaon
                        </span>
                    </div>
                    <button className="bg-medical-red hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-red-200 transition-all flex items-center gap-2 group">
                        <span className="material-symbols-outlined group-hover:animate-pulse">call</span>
                        <span>Call Ambulance (108)</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area: Split View */}
            <main className="flex-1 flex overflow-hidden relative">
                {/* 3. Left Side Panel – Hospital List */}
                <aside
                    className={`w-[400px] flex-none bg-surface-light border-r border-slate-200 flex flex-col h-full z-10 shadow-xl lg:shadow-none absolute lg:relative transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                    id="sidePanel"
                >
                    {/* Filters & Context */}
                    <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                        <div className="flex flex-wrap gap-2 mb-1">
                            <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-transparent hover:border-slate-300 transition-colors">All Types</button>
                            <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-transparent hover:border-slate-300 transition-colors">Government</button>
                            <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-transparent hover:border-slate-300 transition-colors">Private</button>
                            <button className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 transition-colors">24/7 Trauma</button>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-xs text-slate-500">
                            <span>{hospitals.length} facilities found near you</span>
                            <button className="text-primary font-medium hover:underline">Sort by: Time</button>
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 bg-slate-50">
                        {hospitals.map(hospital => (
                            <div
                                key={hospital.id}
                                onClick={() => setSelectedHospital(hospital)}
                                className={`bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer relative group ${selectedHospital?.id === hospital.id ? 'border-primary ring-1 ring-primary' : 'border-primary/30'}`}
                            >
                                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide
                                        ${hospital.status === 'Available' ? 'bg-green-100 text-green-700' : ''}
                                        ${hospital.status === 'Limited' ? 'bg-amber-100 text-amber-700' : ''}
                                        ${hospital.status === 'Critical' ? 'bg-red-100 text-red-700' : ''}
                                    `}>
                                        {hospital.status}
                                    </span>
                                    <span className="text-slate-400 text-xs font-medium">{hospital.distance}</span>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-16 rounded-lg bg-slate-100 bg-cover bg-center shrink-0 flex items-center justify-center text-slate-300">
                                        <span className="material-symbols-outlined text-3xl">local_hospital</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-base leading-snug">{hospital.name}</h3>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">local_shipping</span> 5-15 min
                                            <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                                            {hospital.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-xs font-medium text-slate-600">Bed Availability</span>
                                        <span className="text-xs font-bold text-slate-900">{hospital.availability === 0 ? 'Full' : `${hospital.availability}%`}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${hospital.availability > 50 ? 'bg-medical-green' : hospital.availability > 10 ? 'bg-medical-amber' : 'bg-medical-red'}`}
                                            style={{ width: `${hospital.availability === 0 ? 100 : hospital.availability}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {hospital.features.map(feature => (
                                            <span key={feature} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                                                <span className="material-symbols-outlined text-[12px]">medical_services</span> {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* Hover Action */}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none border-2 border-primary/20"></div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Toggle Handle (Visible only on small screens) */}
                    <button
                        className="lg:hidden absolute -right-12 top-20 bg-white p-2 rounded-r-lg shadow-md border-y border-r border-slate-200"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span className="material-symbols-outlined">{isSidebarOpen ? 'close' : 'menu_open'}</span>
                    </button>
                </aside>

                {/* 2. Main Map Area */}
                <section className="flex-1 relative bg-slate-200 overflow-hidden">
                    <HospitalMap
                        center={center}
                        userLocation={userLocation}
                        hospitals={hospitals}
                        onHospitalSelect={setSelectedHospital}
                        selectedHospital={selectedHospital}
                    />

                    {/* Map UI Overlay Controls */}
                    <div className="absolute right-6 top-6 flex flex-col gap-2 z-[400]">
                        <button className="size-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors" title="Zoom In">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <button className="size-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors" title="Zoom Out">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <button className="size-10 bg-white rounded-lg shadow-md flex items-center justify-center text-primary mt-2 hover:bg-slate-50 transition-colors" title="Center on Me">
                            <span className="material-symbols-outlined">my_location</span>
                        </button>
                    </div>

                    {/* 4. Hospital Detail Sheet (Bottom Right Floating Card) */}
                    {selectedHospital && (
                        <div className="absolute bottom-6 right-6 w-full max-w-sm bg-white rounded-xl shadow-2xl border border-slate-200 p-5 z-[500] animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">{selectedHospital.name}</h2>
                                    <p className="text-sm text-slate-500">{selectedHospital.address}</p>
                                </div>
                                <button onClick={() => setSelectedHospital(null)} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="flex gap-4 mb-5">
                                <div className="flex-1 bg-green-50 rounded-lg p-2 text-center border border-green-100">
                                    <p className="text-xs text-green-700 font-medium uppercase">General</p>
                                    <p className="text-lg font-bold text-green-800">{selectedHospital.status}</p>
                                </div>
                                <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                                    <p className="text-xs text-slate-500 font-medium uppercase">ICU Beds</p>
                                    <p className="text-lg font-bold text-slate-700">Limited</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all">
                                    <span className="material-symbols-outlined">directions</span>
                                    Get Directions (5 min)
                                </button>
                                <button className="w-full bg-white border-2 border-primary text-primary hover:bg-blue-50 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                                    <span className="material-symbols-outlined">bed</span>
                                    Request Bed Booking
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-slate-400 mt-3 italic">Bed requests are verified by the hospital before confirmation.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
