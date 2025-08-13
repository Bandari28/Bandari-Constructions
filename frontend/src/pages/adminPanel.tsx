import { Edit2, Trash2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "./properties/addProperty";

interface PropertyManagementProps {
    properties: Property[];
    setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

export default function PropertyManagement({
    properties,
    setProperties,
}: PropertyManagementProps) {
    // Handle delete
    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this property?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            const res = await fetch(`http://localhost:5000/properties/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to delete property');
            }

            // Update local state to remove the deleted property
            setProperties(prev => prev.filter(p => p._id !== id));
            alert('Property deleted successfully!');
        } catch (error) {
            console.error('Delete error:', error);

            // Type-safe error handling
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Property Listings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 p-6 border-b border-gray-100">
                        <div>
                            <h1 className="text-4xl font-bold text-purple-600 mb-2">
                                Property Management
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Manage your luxury property listings and view comprehensive
                                analytics
                            </p>
                        </div>
                    </div>

                    <div className="pb-6 px-6">
                        <div className="flex items-center gap-2">
                            <Settings className="text-gray-600" size={20} />
                            <h2 className="text-xl font-semibold text-gray-900">
                                Property Listings ({properties.length})
                            </h2>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {properties.map((property) => (
                            <div key={property._id} className="p-4 sm:p-6">
                                {/* Mobile Layout (visible only on mobile) */}
                                <div className="block sm:hidden space-y-4">
                                    {/* Image and Title Row */}
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            {property.images?.length > 0 ? (
                                                <img
                                                    src={`data:${property.images[0].contentType};base64,${property.images[0].data}`}
                                                    alt={property.images[0].alt || property.title}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                                                {property.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                {property.location.street}, {property.location.city}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-lg font-bold text-blue-600">
                                                    ${property.price.toLocaleString()}
                                                </p>
                                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            {property.propertyDetails.bedrooms} beds
                                        </span>
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            {property.propertyDetails.bathrooms} baths
                                        </span>
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            {property.propertyDetails.squareYards} sq yards
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Link to={`/updateproperty/${property._id}`} className="flex-1">
                                            <button className="w-full px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center gap-2 border border-gray-200 hover:border-purple-200">
                                                <Edit2 size={14} />
                                                <span className="text-sm font-medium">Edit Property</span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(property._id)}
                                            className="px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                                            title="Delete Property"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop/Tablet Layout (hidden on mobile) */}
                                <div className="hidden sm:flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        {property.images?.length > 0 ? (
                                            <img
                                                src={`data:${property.images[0].contentType};base64,${property.images[0].data}`}
                                                alt={property.images[0].alt || property.title}
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {property.title}
                                        </h3>
                                        <p className="text-gray-600 mb-2">
                                            {property.location.street}, {property.location.city}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>{property.propertyDetails.bedrooms} beds</span>
                                            <span>{property.propertyDetails.bathrooms} baths</span>
                                            <span>{property.propertyDetails.squareYards} sq yards</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600 mb-2">
                                                ${property.price.toLocaleString()}
                                            </p>
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Available
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 ml-4">
                                            {/* Edit Button */}
                                            <Link to={`/updateproperty/${property._id}`}>
                                                <button className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2 border border-gray-200 hover:border-purple-200">
                                                    <Edit2 size={16} />
                                                    <span className="text-sm font-medium">Edit</span>
                                                </button>
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(property._id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
