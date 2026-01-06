"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    ),
});

export default function HospitalRegistration() {
    const router = useRouter();
    const [position, setPosition] = useState<[number, number]>([28.6139, 77.2090]);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        contactEmail: "",
        address: "",
        totalBeds: "",
        emergencyBeds: "",
        availableBeds: "",
        password: "",
        confirmPassword: "",
    });

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const availableServices = [
        "Emergency / Trauma",
        "Cardiology",
        "Orthopedics",
        "Neurology",
        "Pediatrics",
        "General Medicine",
    ];

    const criticalFacilities = ["ICU", "Ambulance", "Operation Theatre", "Ventilator"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { type, name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleServiceToggle = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const handleFacilityToggle = (facility: string) => {
        setSelectedFacilities((prev) =>
            prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
        );
    };

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                (error) => {
                    console.error("Error detecting location:", error);
                    alert("Unable to retrieve your location. Please ensure location services are enabled.");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const BASE_URL = "http://192.168.0.102:8090/api/v1/rakshapath";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("Please accept the Terms of Service and Emergency Protocols.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        const payload = {
            name: formData.name,
            contactNumber: formData.contactNumber,
            contactEmail: formData.contactEmail,
            address: formData.address,
            location: {
                latitude: position[0],
                longitude: position[1],
            },
            service: {
                services: selectedServices,
                facilities: selectedFacilities,
                emergencyBeds: Number(formData.emergencyBeds) || 0,
                totalBeds: Number(formData.totalBeds) || 0,
                availableBeds: Number(formData.availableBeds) || 0,
            },
            hospitalUser: {
                email: formData.contactEmail,
                password: formData.password,
            },
        };

        try {
            console.log("Submitting Payload:", JSON.stringify(payload, null, 2));

            const response = await axios.post(`${BASE_URL}/hospital/`, payload);
            console.log("Response:", response.data);

            if (response.data.status && response.data.data?.data) {
                const { accessToken, refreshToken } = response.data.data.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                alert("Hospital Registration Successful!");
                router.push("/hospital/login");
            } else {
                alert(response.data.message || "Registration Successful");
                router.push("/hospital/login");
            }
            // Reset form logic can be added here
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please check your network or try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light font-display text-[#111318] min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-primary p-1.5 bg-blue-50 rounded-lg">
                            <span className="material-symbols-outlined text-3xl">local_hospital</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-[#111318] leading-none">
                                RakshaPath
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">Emergency Coordination Network</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
                        <span className="hidden sm:flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            Secure Registration
                        </span>
                        <a className="text-primary hover:text-primary-hover" href="#">
                            Help Center
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow py-10 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Page Header */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-[#111318] tracking-tight mb-2">
                                Hospital Registration
                            </h2>
                            <p className="text-gray-500 text-lg max-w-2xl">
                                Register your facility to join the national emergency network. Accurate data ensures
                                faster ambulance routing and better patient outcomes.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-4xl">add_business</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Section 1: General Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4 flex items-center gap-3">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    1
                                </span>
                                <h3 className="text-lg font-bold text-[#111318]">
                                    Hospital Information
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Official Hospital Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                        placeholder="e.g. City General Hospital"
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the registered name as it appears on government licenses.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Contact Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px]">
                                            call
                                        </span>
                                        <input
                                            className="w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary h-12 pl-12 pr-4 shadow-sm"
                                            placeholder="+91 00000 00000"
                                            required
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Official Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px]">
                                            mail
                                        </span>
                                        <input
                                            className="w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary h-12 pl-12 pr-4 shadow-sm"
                                            placeholder="admin@hospital.com"
                                            required
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary px-4 py-3 shadow-sm resize-none"
                                        placeholder="Street Address, Area, City, State, ZIP Code"
                                        required
                                        rows={3}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Location & Mapping */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4 flex items-center gap-3">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    2
                                </span>
                                <h3 className="text-lg font-bold text-[#111318]">
                                    Location Details
                                </h3>
                            </div>
                            <div className="p-8">
                                <div className="mb-6 flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                            Latitude
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 text-gray-500 h-10 px-3 text-sm cursor-not-allowed font-mono"
                                            readOnly
                                            type="text"
                                            value={position[0].toFixed(6)}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                            Longitude
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 text-gray-500 h-10 px-3 text-sm cursor-not-allowed font-mono"
                                            readOnly
                                            type="text"
                                            value={position[1].toFixed(6)}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            className="h-10 px-4 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                                            type="button"
                                            onClick={handleDetectLocation}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">my_location</span>
                                            Detect My Location
                                        </button>
                                    </div>
                                </div>
                                {/* Map Component */}
                                <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 z-0">
                                    <MapComponent position={position} setPosition={setPosition} />
                                </div>
                                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                                    Confirm your hospital's exact entrance for ambulance routing.
                                </p>
                            </div>
                        </div>

                        {/* Section 3: Facilities & Capacity */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4 flex items-center gap-3">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    3
                                </span>
                                <h3 className="text-lg font-bold text-[#111318]">
                                    Medical Services & Capacity
                                </h3>
                            </div>
                            <div className="p-8 space-y-8">
                                {/* Services Checkboxes */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                                        Available Medical Services
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {availableServices.map((service) => (
                                            <label
                                                key={service}
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedServices.includes(service)
                                                    ? "border-primary bg-blue-50/50"
                                                    : "border-gray-200 hover:border-primary hover:bg-blue-50/50"
                                                    }`}
                                            >
                                                <input
                                                    className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                                                    type="checkbox"
                                                    onChange={() => handleServiceToggle(service)}
                                                    checked={selectedServices.includes(service)}
                                                />
                                                <span className="text-sm font-medium">{service}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <hr className="border-gray-100" />
                                {/* Facilities Checkboxes */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                                        Critical Facilities
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {criticalFacilities.map((facility) => (
                                            <label key={facility} className="flex items-center gap-2">
                                                <input
                                                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                                    type="checkbox"
                                                    onChange={() => handleFacilityToggle(facility)}
                                                    checked={selectedFacilities.includes(facility)}
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {facility}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <hr className="border-gray-100" />
                                {/* Bed Capacity */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                                        Bed Capacity Details
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Total Beds
                                            </label>
                                            <input
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                                min="0"
                                                placeholder="0"
                                                type="number"
                                                name="totalBeds"
                                                value={formData.totalBeds}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Emergency Beds
                                            </label>
                                            <input
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                                min="0"
                                                placeholder="0"
                                                type="number"
                                                name="emergencyBeds"
                                                value={formData.emergencyBeds}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Currently Available
                                            </label>
                                            <input
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                                min="0"
                                                placeholder="0"
                                                type="number"
                                                name="availableBeds"
                                                value={formData.availableBeds}
                                                onChange={handleInputChange}
                                            />
                                            <p className="text-xs text-red-500 mt-1 hidden">Cannot exceed Total Beds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Admin Account */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4 flex items-center gap-3">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    4
                                </span>
                                <h3 className="text-lg font-bold text-[#111318]">
                                    Admin Account Setup
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1 md:col-span-2">
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-800 mb-2">
                                        <span className="material-symbols-outlined text-blue-600">
                                            admin_panel_settings
                                        </span>
                                        <div>
                                            <p className="font-semibold">Administrator Access</p>
                                            <p className="opacity-90">
                                                This account will be the primary administrator for managing hospital data
                                                and requests.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                        placeholder="••••••••"
                                        required
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Use 8+ chars with upper, lower, numbers & symbols.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                        placeholder="••••••••"
                                        required
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submission Actions */}
                        <div className="pt-6 pb-12">
                            <div className="flex flex-col items-center gap-4">
                                <label className="flex items-start gap-3 max-w-lg cursor-pointer">
                                    <input
                                        className="mt-1 w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                    />
                                    <span className="text-sm text-gray-600">
                                        I hereby declare that the information provided is true to the best of my
                                        knowledge and I agree to the{" "}
                                        <a className="text-primary hover:underline" href="#">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a className="text-primary hover:underline" href="#">
                                            Emergency Protocols
                                        </a>
                                        .
                                    </span>
                                </label>
                                <button
                                    className={`w-full md:w-auto min-w-[280px] bg-primary hover:bg-primary-hover text-white text-lg font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${isLoading ? "opacity-75 cursor-wait" : ""
                                        }`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span>Registering...</span>
                                    ) : (
                                        <>
                                            <span>Register Hospital</span>
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">lock</span>
                                    Your data is encrypted and securely processed.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-500">
                        © 2023 RakshaPath Emergency Network. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        A government-approved emergency response initiative.
                    </p>
                </div>
            </footer>
        </div>
    );
}
