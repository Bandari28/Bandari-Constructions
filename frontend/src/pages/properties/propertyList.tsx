import { Link } from "react-router-dom";
import type { Property } from "./properties";
interface PropertiesProps {
    properties: Property[];
    setProperties?: React.Dispatch<React.SetStateAction<Property[]>>; // optional if you want to manage updates here
}

export default function PropertyList({ properties }: PropertiesProps) {

    return (
        <>
            <div className="grid grid-cols-1 mb-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8">
                {properties.map((property) => (
                    <Link
                        to={`/property/${property._id}`}
                        key={property._id}
                        className="max-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        {
                            property.homeImage ? (
                                <img
                                    src={`data:${property.homeImage.contentType};base64,${property.homeImage.data}`}
                                    alt={property.homeImage.alt || property.title}
                                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                                    onError={(e) => (e.currentTarget.src = '/path/to/placeholder.jpg')}
                                />
                            ) : property.images ? (
                                <img
                                    src={`data:${property.images[0].contentType};base64,${property.images[0].data}`}
                                    alt={property.images[0].alt || property.title}
                                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                                    onError={(e) => (e.currentTarget.src = '/path/to/placeholder.jpg')}
                                />
                            ) : (
                                <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No Image Available</span>
                                </div>
                            )
                        }
                        {/* Display first image if available */}
                        
                        <div className="p-3 sm:p-4 md:p-5">
                            <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate">{property.title}</h2>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                {property.location.street}, {property.location.city}
                            </p>
                            <p className="text-base sm:text-lg font-bold text-purple-600">
                                ${property.price.toLocaleString()}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-700">
                                {property.propertyDetails.squareYards} Sq Yards
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

        </>
    );
}
