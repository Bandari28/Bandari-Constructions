const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, }, // Property Title
  price: { type: Number, required: true }, // Property Price
  propertyType: { type: String, required: true }, // Type of Property (e.g., Apartment, House)
  googleMap:{type: String, required: true}, // Google Map Link
  location: {
    street: { type: String, required: true }, // Street Address
    city: { type: String, required: true }, // City
    state: { type: String, required: true }, // State
    country: { type: String, required: true },// Country
    zipCode: { type: String, required: true }// Zip Code


  }, // Property Location

  propertyDetails: {
    bedrooms: { type: Number, required: true }, // Number of Bedrooms
    bathrooms: { type: Number, required: true }, // Number of Bathrooms
    squareYards: { type: Number, required: true }, // Area in Square Yards
    parkingSpaces: { type: String, required: true }, // Number of Parking Spaces
    direction: { type: String, required: true }, // Directions to the Property
    furnishingStatus: { type: String, required: true }, // Furnishing Status (e.g., Furnished, Semi-Furnished, Unfurnished)
    possessionStatus: { type: String, required: true }, // Possession Status (e.g., Ready to Move, Under Construction)
    yearBuilt: { type: Number, required: true }, // Year Built

  },

  images: [{
    data: { type: String, required: true }, // Base64 encoded image data
    contentType: { type: String, required: true }, // MIME type (image/jpeg, image/png, etc.)
    filename: { type: String, required: true }, // Original filename
    size: { type: Number }, // File size in bytes
    alt: { type: String }, // Alternative text
    isPrimary: { type: Boolean, default: false }, // Mark as primary image
    uploadDate: { type: Date, default: Date.now }
  }],
  contactInfo: {
    contactName: { type: String, required: true }, // Contact Name
    phoneNumber: { type: String, required: true }, // Contact Phone Number
    emailAddress: { type: String, required: true }, // Contact Email Address 
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
