"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Next.js
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//     iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// Type definition for a Hospital
export interface Hospital {
    id: string;
    name: string;
    type: "Govt" | "Private";
    lat: number;
    lng: number;
    availability: number; // Percentage
    distance: string; // Pre-calculated for mockup
    address: string;
    features: string[]; // e.g., ["Cardiology", "Trauma"]
    status: "Available" | "Limited" | "Critical";
}

interface HospitalMapProps {
    center: [number, number];
    userLocation?: [number, number] | null;
    hospitals: Hospital[];
    onHospitalSelect: (hospital: Hospital) => void;
    selectedHospital: Hospital | null;
}

function MapController({ center, selectedHospital }: { center: [number, number], selectedHospital: Hospital | null }) {
    const map = useMap();

    useEffect(() => {
        if (selectedHospital) {
            map.flyTo([selectedHospital.lat, selectedHospital.lng], 14, {
                animate: true,
                duration: 1.5
            });
        }
    }, [selectedHospital, map]);

    // Fly to center if it changes (e.g. user location update)
    useEffect(() => {
        map.flyTo(center, map.getZoom());
    }, [center, map]);

    return null;
}

// User Location Marker Component (Pulsing Effect)
function UserLocationMarker({ position }: { position: [number, number] }) {
    const icon = L.divIcon({
        className: 'custom-user-marker',
        html: `
            <div class="relative flex items-center justify-center size-16 -ml-8 -mt-8">
                <div class="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                <div class="relative size-4 bg-primary rounded-full border-2 border-white shadow-lg z-10"></div>
            </div>
        `,
        iconSize: [0, 0], // Handled by CSS
    });

    return <Marker position={position} icon={icon} />;
}

// Custom Hospital Marker
function HospitalMarker({ hospital, isSelected, onClick }: { hospital: Hospital, isSelected: boolean, onClick: () => void }) {

    // Determine color based on hospital type/status or just hardcode for demo styles
    let colorClass = "bg-green-600";
    if (hospital.status === "Limited") colorClass = "bg-amber-600";
    if (hospital.status === "Critical") colorClass = "bg-red-600";

    // Inline style fallback
    const bgColor = hospital.status === "Limited" ? "#d97706" : hospital.status === "Critical" ? "#dc2626" : "#16a34a";

    const iconHtml = `
        <div class="flex flex-col items-center group transform transition-all duration-300 ${isSelected ? 'scale-125 z-50' : ''}">
            <div class="bg-white p-1 rounded-full shadow-lg">
                <div style="background-color: ${bgColor}" class="size-8 rounded-full flex items-center justify-center text-white border-2 border-white">
                    <span class="material-symbols-outlined text-sm font-bold" style="font-size: 14px; font-family: 'Material Symbols Outlined';">local_hospital</span>
                </div>
            </div>
            <div class="mt-1 bg-white px-2 py-0.5 rounded shadow-md border border-gray-100 opacity-90">
                <p class="text-[10px] font-bold text-gray-900 whitespace-nowrap">${hospital.name}</p>
            </div>
        </div>
    `;

    const icon = L.divIcon({
        className: 'custom-hospital-marker',
        html: iconHtml,
        iconSize: [40, 60],
        iconAnchor: [20, 60]
    });

    return (
        <Marker
            position={[hospital.lat, hospital.lng]}
            icon={icon}
            eventHandlers={{
                click: onClick
            }}
        />
    );
}


const HospitalMap = ({ center, userLocation, hospitals, onHospitalSelect, selectedHospital }: HospitalMapProps) => {

    // Fix icons only once on mount
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
    }, []);

    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            zoomControl={false}
        >
            {/* OpenStreetMap Tiles */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Map Controller for programmatic moves */}
            <MapController center={center} selectedHospital={selectedHospital} />

            {/* User Location */}
            {userLocation && <UserLocationMarker position={userLocation} />}

            {/* Hospital Markers */}
            {hospitals.map(hospital => (
                <HospitalMarker
                    key={hospital.id}
                    hospital={hospital}
                    isSelected={selectedHospital?.id === hospital.id}
                    onClick={() => onHospitalSelect(hospital)}
                />
            ))}

        </MapContainer>
    );
};

export default HospitalMap;
