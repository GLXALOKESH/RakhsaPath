"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    ),
});

export default function EmergencyIntake() {
    const router = useRouter();
    const [address, setAddress] = useState<string>("Detecting location...");
    // Using [lat, lng] tuple to match MapComponent's expected prop type
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const [isLocating, setIsLocating] = useState(true);

    // Modal State
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [tempCoordinates, setTempCoordinates] = useState<[number, number]>([28.6139, 77.2090]); // Default Delhi

    // Helper to reverse geocode
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            if (data && data.display_name) {
                setAddress(data.display_name);
            } else {
                setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            }
        } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates([latitude, longitude]);
                    setTempCoordinates([latitude, longitude]); // Init temp coords too
                    await reverseGeocode(latitude, longitude);
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error detecting location:", error);
                    setAddress("Location access denied. Please adjust pin manually.");
                    // Fallback to default or user's IP location if possible, but for now just stop loading
                    setCoordinates([28.6139, 77.2090]); // Default fallback
                    setIsLocating(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setAddress("Geolocation not supported.");
            setIsLocating(false);
        }
    }, []);

    const handleOpenMap = () => {
        if (coordinates) {
            setTempCoordinates(coordinates);
        }
        setIsMapModalOpen(true);
    };

    const handleConfirmLocation = async () => {
        setCoordinates(tempCoordinates);
        setAddress("Updating address...");
        await reverseGeocode(tempCoordinates[0], tempCoordinates[1]);
        setIsMapModalOpen(false);
    };

    const handleDetectLocationInModal = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setTempCoordinates([latitude, longitude]);
                },
                (error) => {
                    alert("Could not detect location: " + error.message);
                }
            );
        }
    };

    return (
        <div className="bg-background-light font-display antialiased min-h-screen flex flex-col items-center">
            {/* Main Container */}
            <div className="w-full max-w-[640px] flex flex-col min-h-screen px-4 py-6 md:py-10">
                {/* Header Section */}
                <header className="flex items-center justify-between w-full mb-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h1 className="text-[#111318] text-2xl font-bold tracking-tight">RakshaPath</h1>
                    </div>
                    <div className="flex items-center gap-1.5 text-emergency bg-red-50 px-3 py-1.5 rounded-full border border-red-100 shadow-sm">
                        <span className="material-symbols-outlined text-lg leading-none">emergency</span>
                        <span className="text-sm font-bold uppercase tracking-wide">Emergency Assistance</span>
                    </div>
                </header>

                {/* Main Content Card */}
                <main className="w-full bg-white rounded-2xl shadow-sm border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col">
                    {/* Instruction Banner */}
                    <div className="bg-blue-50/50 p-5 text-center border-b border-blue-100 flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-primary text-3xl">medical_information</span>
                        <p className="text-[#111318] text-base font-medium leading-normal">
                            Please provide basic details so we can help you faster.
                        </p>
                    </div>

                    {/* Form Body */}
                    <div className="p-5 md:p-8 flex flex-col gap-8 flex-1">
                        {/* Identity Section */}
                        <div className="space-y-5">
                            {/* Full Name */}
                            <label className="flex flex-col w-full gap-2">
                                <span className="text-[#111318] text-base font-semibold">Full Name</span>
                                <input
                                    className="w-full rounded-xl text-[#111318] border border-[#dbdfe6] focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-lg placeholder:text-[#9ca3af] transition-all"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </label>
                            {/* Phone Number */}
                            <label className="flex flex-col w-full gap-2">
                                <span className="text-[#111318] text-base font-semibold">Phone Number</span>
                                <div className="relative">
                                    <input
                                        className="w-full rounded-xl text-[#111318] border border-[#dbdfe6] focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-lg placeholder:text-[#9ca3af] transition-all"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-green-600">check_circle</span>
                                </div>
                                <p className="text-[#616f89] text-xs md:text-sm">This number will be used only for emergency coordination.</p>
                            </label>
                        </div>

                        {/* Medical Context Section */}
                        <div className="space-y-2">
                            <label className="flex flex-col w-full gap-2">
                                <span className="text-[#111318] text-base font-semibold">What happened?</span>
                                <input
                                    className="w-full rounded-xl text-[#111318] border border-[#dbdfe6] focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-lg placeholder:text-[#9ca3af] transition-all"
                                    placeholder="e.g. chest pain, road accident, severe bleeding"
                                    type="text"
                                />
                            </label>
                            <div className="flex items-start gap-2 bg-yellow-50 p-2 rounded-lg mt-1">
                                <span className="material-symbols-outlined text-yellow-600 text-sm mt-[2px]">info</span>
                                <p className="text-yellow-800 text-xs font-medium leading-tight">This is not a medical diagnosis. Used only to route you to the right care.</p>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="bg-background-light border border-[#e5e7eb] rounded-xl p-3 flex gap-4 items-center relative overflow-hidden group">
                            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                {/* Static Map Preview or just a placeholder image */}
                                <img
                                    alt="Map preview"
                                    className="w-full h-full object-cover opacity-80"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8g2_h86hIrzYJ2LGWjqXA0be3mvICErAht2qjQ2du7yAd6DfAbbVItow8HVFCU4KOOSNyaNmIwoo4rTWid1xCwlqKSqLWkX71bTS0wQ9nr9ZH5xs3VKRb1GS9eVcoLw6sfZj2zMg3H8EE35HRcUT4hFXjHzRFQMnhslGuQpy2lc2bmtDAGNQRHwq6ZfhWdjn_FAd6IUXtZDI9Y7nI1Spb9qkI3spVBktujPCa_eaJ42nSwldCJE-ym2-E2AlC2wnATsSQfwzbX1M"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                                    <span className="material-symbols-outlined text-primary drop-shadow-md text-2xl">location_on</span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">
                                        {isLocating ? "Locating..." : "Location Detected"}
                                    </p>
                                    <span className="flex h-2 w-2 relative">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLocating ? "bg-yellow-400" : "bg-green-400"} opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isLocating ? "bg-yellow-500" : "bg-green-500"}`}></span>
                                    </span>
                                </div>
                                <p className="text-[#111318] text-sm font-medium truncate" title={address}>
                                    {address}
                                </p>
                            </div>
                            <button
                                onClick={handleOpenMap}
                                className="text-primary hover:text-primary-hover text-sm font-semibold whitespace-nowrap px-2 py-1 hover:bg-primary/10 rounded-md transition-colors mr-1"
                            >
                                Adjust Pin
                            </button>
                        </div>

                        {/* Primary Action Buttons */}
                        <div className="flex flex-col gap-4 pt-2 mt-auto">
                            <button
                                onClick={() => router.push('/map')}
                                className="group w-full h-16 bg-emergency hover:bg-emergency-hover active:scale-[0.99] text-white rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-red-200 transition-all duration-200"
                            >
                                <div className="bg-white/20 rounded-full p-1.5">
                                    <span className="material-symbols-outlined text-2xl">ambulance</span>
                                </div>
                                <span className="text-xl font-bold tracking-wide">Call an Ambulance</span>
                            </button>
                            <button
                                onClick={() => router.push('/map')}
                                className="w-full h-14 bg-white border-2 border-primary text-primary hover:bg-blue-50 active:scale-[0.99] rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                            >
                                <span className="material-symbols-outlined text-2xl">local_hospital</span>
                                <span className="text-lg font-bold">View Nearby Hospitals</span>
                            </button>
                        </div>
                    </div>
                </main>

                {/* Safety Footer */}
                <footer className="mt-8 text-center px-6">
                    <div className="flex items-center justify-center gap-2 mb-2 opacity-60">
                        <span className="material-symbols-outlined text-sm">verified_user</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#616f89]">Secure & Private</span>
                    </div>
                    <p className="text-xs text-[#9aa2b1] font-medium leading-relaxed max-w-[400px] mx-auto">
                        RakshaPath helps coordinate emergency care but does not replace medical professionals. In case of critical failure, dial 911 directly.
                    </p>
                </footer>
            </div>

            {/* Map Modal */}
            {isMapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-[#111318]">Adjust Location</h3>
                            <button
                                onClick={() => setIsMapModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="relative w-full h-[400px]">
                            <MapComponent position={tempCoordinates} setPosition={setTempCoordinates} />
                            {/* Detect Location Button Overlay */}
                            <div className="absolute top-4 right-4 z-[1000]">
                                <button
                                    onClick={handleDetectLocationInModal}
                                    className="bg-white text-primary hover:bg-blue-50 p-2 rounded-lg shadow-md border border-gray-200 flex items-center justify-center"
                                    title="Detect My Location"
                                >
                                    <span className="material-symbols-outlined">my_location</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setIsMapModalOpen(false)}
                                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmLocation}
                                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-blue-200 transition-colors"
                            >
                                Confirm Location
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
