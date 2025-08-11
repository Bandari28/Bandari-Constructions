// src/hooks/useProperties.ts
import { useState, useEffect } from "react";
export interface Location {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface PropertyDetails {
    bedrooms: number;
    bathrooms: number;
    squareYards: number;
    parkingSpaces: string;
    direction: string;
    furnishingStatus: string;
    possessionStatus: string;
    yearBuilt: number;
}

export interface ImageData {
    data: string;
    contentType: string;
    filename: string;
    size?: number;
    alt?: string;
    isPrimary?: boolean;
    uploadDate?: string;
}

export interface ContactInfo {
    contactName: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface Property {
    _id: string;
    title: string;
    price: number;
    propertyType: string;
    location: Location;
    propertyDetails: PropertyDetails;
    images: ImageData[];
    contactInfo: ContactInfo;
}

export interface ApiResponse {
    properties: Property[];
    total: number;
    page: number;
    pages: number;
}
const useProperties = () => {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch("http://localhost:5000/properties");
                if (!res.ok) throw new Error("Failed to fetch properties");
                const data = await res.json();
                setProperties(data.properties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchProperties();
    }, []);

    return { properties, setProperties };
};

export default useProperties;
