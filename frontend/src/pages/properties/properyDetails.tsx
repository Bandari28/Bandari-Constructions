import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, MapPin, Home, Bed, Bath, Car,
  Calendar, Compass, Package, User, Phone, Mail, ExternalLink
} from 'lucide-react';

interface PropertyData {
  title: string;
  price: number;
  propertyType: string;
  location: { street: string; city: string; state: string; zipCode: string; country: string; };
  googleMap: string;
  propertyDetails: { bedrooms: number; bathrooms: number; squareYards: number; parkingSpaces: string; direction: string; yearBuilt: string | number; furnishingStatus: string; possessionStatus: string; };
  images: { data: string; contentType: string; filename: string; size: number; alt: string; isPrimary: boolean; _id: { $oid: string }; uploadDate: { $date: string }; }[];
  contactInfo: { contactName: string; phoneNumber: string; emailAddress: string; };
}

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p className="text-center text-gray-700 text-xl mt-10">Loading...</p>;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  const goToImage = (index: number) => setCurrentImageIndex(index);

  const formatPrice = (price: number) => {
    const validPrice = price < 0 ? 0 : price;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(validPrice);
  };

  const getImageSrc = (image: PropertyData['images'][0]) =>
    image.data.startsWith('data:') ? image.data : `data:${image.contentType};base64,${image.data}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6  border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
          <h1 className="text-4xl font-bold text-gray-900">{property.title || 'Property Title'}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            <span>{property.location.street}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 items-center">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(property.price)}</span>
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-medium">{property.propertyType}</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Property Details */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6   shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2 text-yellow-500" /> Property Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Bed className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-gray-900">{property.propertyDetails.bedrooms ?? 'N/A'}</div>
                <div className="text-gray-500 text-sm">Bedrooms</div>
              </div>
              <div>
                <Bath className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-gray-900">{property.propertyDetails.bathrooms ?? 'N/A'}</div>
                <div className="text-gray-500 text-sm">Bathrooms</div>
              </div>
              <div className="col-span-2">
                <div className="text-2xl font-bold text-gray-900">{property.propertyDetails.squareYards || 'N/A'}</div>
                <div className="text-gray-500 text-sm">Square Yards</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100   shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-3">
              {[{ icon: Car, label: 'Parking', value: property.propertyDetails.parkingSpaces },
              { icon: Compass, label: 'Direction', value: property.propertyDetails.direction },
              { icon: Calendar, label: 'Built', value: property.propertyDetails.yearBuilt },
              { icon: Package, label: 'Furnishing', value: property.propertyDetails.furnishingStatus },
              { icon: Home, label: 'Status', value: property.propertyDetails.possessionStatus }
              ].map((item, i) => (
                <div key={i} className="flex items-center text-gray-700">
                  <item.icon className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="text-sm">{item.label}: {item.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100  shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-500" /> Contact Information
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="font-medium">{property.contactInfo.contactName || 'N/A'}</div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <a href={`tel:${property.contactInfo.phoneNumber}`} className="hover:underline">{property.contactInfo.phoneNumber || 'N/A'}</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <a href={`mailto:${property.contactInfo.emailAddress}`} className="hover:underline">{property.contactInfo.emailAddress || 'N/A'}</a>
              </div>
              <div className="pt-2">
                <a href={property.googleMap || '#'} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition">
                  <MapPin className="w-4 h-4 mr-2" /> View on Map
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Image Slideshow */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
              <img src={getImageSrc(property.images[currentImageIndex])} alt={property.images[currentImageIndex].alt}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out" />
            </div>
            {property.images.length > 1 && (
              <>
                <button onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <div className="absolute top-4 right-4 bg-gray-800/80 text-white px-3 py-1 rounded-full text-sm shadow-md">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
          {property.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto justify-center">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => goToImage(i)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-transform transform hover:scale-105 ${i === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`}>
                  <img src={getImageSrc(img)} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
