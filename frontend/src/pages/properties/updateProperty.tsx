import { Edit, Home, MapPin, Info, Star, Phone, Camera } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Property {
    _id: string;
    title: string;
    price: number;
    propertyType: string;
    location: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    googleMap: string;
    propertyDetails: {
        bedrooms: number;
        bathrooms: number;
        squareYards: number;
        parkingSpaces: string;
        direction: string;
        yearBuilt: string;
        furnishingStatus: string;
        possessionStatus: string;
    };
    images: {
        data: string;
        contentType: string;
        filename: string;
        size: number;
        alt: string;
        isPrimary: boolean;
        _id: string;
    }[];
    contactInfo: {
        contactName: string;
        phoneNumber: string;
        emailAddress: string;
    };
}

interface ImageFile extends File {
    preview?: string;
    _id?: string;
    data?: string;
    contentType?: string;
}

export default function UpdateProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState<Property | null>(null);
    const [existingImages, setExistingImages] = useState<any[]>([]);
    const [newImages, setNewImages] = useState<ImageFile[]>([]);

    // Fetch property data when component mounts
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`https://bandari-constructions.onrender.com/properties/${id}`);
                if (!res.ok) throw new Error("Failed to fetch property");
                const data = await res.json();
                setProperty(data);
                setExistingImages(data.images || []);
            } catch (error) {
                console.error(error);
                alert("Failed to load property data");
            }
        };
        fetchProperty();
    }, [id]);

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            // Validate files
            const validFiles = files.filter(file => {
                const isImage = file.type.startsWith('image/');
                const isSizeValid = file.size <= 10 * 1024 * 1024; // 10MB

                if (!isImage) {
                    alert(`${file.name} is not an image file`);
                    return false;
                }
                if (!isSizeValid) {
                    alert(`${file.name} is too large (max 10MB)`);
                    return false;
                }
                return true;
            });

            // Create previews and add to new images
            const filesWithPreview = validFiles.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
            });

            setNewImages(prev => [...prev, ...filesWithPreview].slice(0, 10));
        }
    };

    const removeImage = (index: number, isNew: boolean) => {
        if (isNew) {
            setNewImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        }
    };

    type PropertySections = 'location' | 'propertyDetails' | 'contactInfo';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (!property) return;
        
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [section, field] = name.split('.') as [PropertySections, string];
            setProperty(prev => ({
                ...prev!,
                [section]: {
                    ...prev![section],
                    [field]: value
                }
            }));
        } else {
            setProperty(prev => ({ ...prev!, [name]: value }));
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!property) return;

        const formData = new FormData();

        // Add property fields
        formData.append('title', property.title);
        formData.append('price', property.price.toString());
        formData.append('propertyType', property.propertyType);

        // Add nested location fields
        Object.entries(property.location).forEach(([key, value]) => {
            formData.append(`location[${key}]`, value);
        });

        // Add nested propertyDetails fields
        Object.entries(property.propertyDetails).forEach(([key, value]) => {
            formData.append(`propertyDetails[${key}]`, value.toString());
        });

        // Add contactInfo fields
        Object.entries(property.contactInfo).forEach(([key, value]) => {
            formData.append(`contactInfo[${key}]`, value);
        });

        // Add new images
        newImages.forEach((file) => {
            formData.append('images', file);
        });

        // Add existing image IDs to keep
        existingImages.forEach((image) => {
            formData.append('existingImages', image._id);
        });

        formData.append('googleMap', property.googleMap);

        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`https://bandari-constructions.onrender.com/properties/${property._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update property");

            alert("Property updated successfully!");
            navigate('/'); // Redirect to properties list
        } catch (error) {
            console.error(error);
            alert("Failed to update property");
        }
    };

    if (!property) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl">Loading property data...</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white p-4 sm:p-6 lg:p-8 font-inter">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-10 lg:p-14">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
                            <Home size={32} className="text-purple-600" /> Edit Property
                        </h1>

                        {/* Basic Information Section */}
                        <SectionHeader icon={<Info size={22} className="text-blue-500" />} title="Basic Information" />
                        <div className="grid grid-cols-1 gap-6 mb-10">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Property Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={property.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Price ($) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={property.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                                        Property Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="propertyType"
                                        name="propertyType"
                                        value={property.propertyType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-white appearance-none transition-colors duration-200"
                                    >
                                        <option value="House">House</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Land">Land</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <SectionDivider />

                        {/* Location Section */}
                        <SectionHeader icon={<MapPin size={22} className="text-green-500" />} title="Location" />
                        <div className="grid grid-cols-1 gap-6 mb-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="location.street"
                                        value={property.location.street}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="location.city"
                                        value={property.location.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="location.state"
                                        value={property.location.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="location.country"
                                        value={property.location.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        ZIP Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="location.zipCode"
                                        value={property.location.zipCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="googleMap" className="block text-sm font-medium text-gray-700 mb-1">
                                        Google Map Link <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="googleMap"
                                        name="googleMap"
                                        value={property.googleMap}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                    />
                                    {property.googleMap && (
                                        <a
                                            href={property.googleMap}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-block text-blue-600 hover:underline"
                                        >
                                            Open in Google Maps
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <SectionDivider />

                        {/* Property Details Section */}
                        <SectionHeader icon={<Star size={22} className="text-yellow-500" />} title="Property Details" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                            <div>
                                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                                    Bedrooms <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="bedrooms"
                                    name="propertyDetails.bedrooms"
                                    value={property.propertyDetails.bedrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                                    Bathrooms <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="bathrooms"
                                    name="propertyDetails.bathrooms"
                                    value={property.propertyDetails.bathrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="squareYards" className="block text-sm font-medium text-gray-700 mb-1">
                                    Square Yards <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="squareYards"
                                    name="propertyDetails.squareYards"
                                    value={property.propertyDetails.squareYards}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="parkingSpaces" className="block text-sm font-medium text-gray-700 mb-1">
                                    Parking Spaces
                                </label>
                                <input
                                    type="text"
                                    id="parkingSpaces"
                                    name="propertyDetails.parkingSpaces"
                                    value={property.propertyDetails.parkingSpaces}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="direction" className="block text-sm font-medium text-gray-700 mb-1">
                                    Direction
                                </label>
                                <input
                                    type="text"
                                    id="direction"
                                    name="propertyDetails.direction"
                                    value={property.propertyDetails.direction}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">
                                    Year Built
                                </label>
                                <input
                                    type="number"
                                    id="yearBuilt"
                                    name="propertyDetails.yearBuilt"
                                    value={property.propertyDetails.yearBuilt}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                        </div>
                        <SectionDivider />

                        {/* Furnishing & Possession Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <div>
                                <SectionHeader icon={<Edit size={22} className="text-purple-500" />} title="Furnishing Status" />
                                <label htmlFor="furnishingStatus" className="block text-sm font-medium text-gray-700 mb-1">
                                    Furnishing Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="furnishingStatus"
                                    name="propertyDetails.furnishingStatus"
                                    value={property.propertyDetails.furnishingStatus}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-white appearance-none transition-colors duration-200"
                                >
                                    <option value="Furnished">Furnished</option>
                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                    <option value="Unfurnished">Unfurnished</option>
                                </select>
                            </div>
                            <div>
                                <SectionHeader icon={<Edit size={22} className="text-purple-500" />} title="Possession Status" />
                                <label htmlFor="possessionStatus" className="block text-sm font-medium text-gray-700 mb-1">
                                    Possession Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="possessionStatus"
                                    name="propertyDetails.possessionStatus"
                                    value={property.propertyDetails.possessionStatus}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-white appearance-none transition-colors duration-200"
                                >
                                    <option value="Ready to Move">Ready to Move</option>
                                    <option value="Under Construction">Under Construction</option>
                                </select>
                            </div>
                        </div>
                        <SectionDivider />

                        {/* Property Images Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                                <Camera className="w-5 h-5 mr-2" />
                                Property Images
                            </h2>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Upload new property images</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Interior, Exterior, Floor Plan, 360° View (Max 10MB per image)
                                </p>
                                <input
                                    type="file"
                                    name="images"
                                    multiple
                                    accept="image/*"
                                    className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    onChange={handleImages}
                                />
                            </div>

                            {/* Display existing and new images */}
                            {(existingImages.length > 0 || newImages.length > 0) && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                                        Current Images ({existingImages.length + newImages.length}/10)
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {/* Existing images from database */}
                                        {existingImages.map((image, index) => (
                                            <div key={image._id} className="relative group border rounded-md p-2">
                                                <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                                    <img
                                                        src={`data:${image.contentType};base64,${image.data}`}
                                                        alt={image.alt}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index, false)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove ${image.filename}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-gray-700 truncate">{image.filename}</p>
                                                    <p className="text-xs text-gray-500">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Newly uploaded images */}
                                        {newImages.map((file, index) => (
                                            <div key={index} className="relative group border rounded-md p-2">
                                                <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                                    <img
                                                        src={file.preview}
                                                        alt={file.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index, true)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove ${file.name}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Information Section */}
                        <SectionHeader icon={<Phone size={22} className="text-emerald-500" />} title="Contact Information" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="contactInfo.contactName"
                                    value={property.contactInfo.contactName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="contactInfo.phoneNumber"
                                    value={property.contactInfo.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    name="contactInfo.emailAddress"
                                    value={property.contactInfo.emailAddress}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors duration-200"
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Update Property
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Section header with icon and title
function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-2 mb-4 mt-8">
            {icon}
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        </div>
    )
}

// Divider between sections
function SectionDivider() {
    return <hr className="my-6 border-t border-gray-200" />
}