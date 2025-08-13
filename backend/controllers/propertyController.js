const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    // Validate files were uploaded
    if (!req.files || (!req.files['homeImage'] && !req.files['images'])) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Initialize variables
    let homeImage = null;
    let images = [];

    // Handle home image
    if (req.files['homeImage'] && req.files['homeImage'][0]) {
      const homeImageFile = req.files['homeImage'][0];
      homeImage = {
        data: homeImageFile.buffer.toString('base64'),
        contentType: homeImageFile.mimetype,
        filename: homeImageFile.originalname,
        size: homeImageFile.size,
        alt: req.body.alt || 'Property main image',
        uploadDate: new Date(),
        isPrimary: true // Set as primary by default
      };
    }

    // Process other images
    if (req.files['images']) {
      images = req.files['images'].map((file, index) => ({
        data: file.buffer.toString('base64'),
        contentType: file.mimetype,
        filename: file.originalname,
        size: file.size,
        alt: req.body.alt || `Property image ${index + 1}`,
        isPrimary: !homeImage && index === 0 // First image is primary only if no homeImage
      }));
    }

    // Create property with all data
    const property = new Property({
      ...req.body,
      homeImage,
      images
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: {
        _id: property._id,
        title: property.title,
        homeImage: property.homeImage ? {
          filename: property.homeImage.filename
        } : null,
        images: property.images.map(img => ({
          _id: img._id,
          isPrimary: img.isPrimary,
          filename: img.filename
        }))
      }
    });

  } catch (error) {
    console.error('Error creating property:', error.stack);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create property'
    });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    // Filtering
    const filter = {};
    if (req.query.propertyType) filter.propertyType = req.query.propertyType;
    if (req.query["location.city"]) filter["location.city"] = req.query["location.city"];

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(filter);

    // Return only schema-defined fields
    const reordered = properties.map(p => ({
      _id: p._id,
      title: p.title,
      price: p.price,
      propertyType: p.propertyType,
      googleMap: p.googleMap,
      location: p.location,
      propertyDetails: p.propertyDetails,
      homeImage: p.homeImage, // includes base64, metadata
      images: p.images, // includes base64, metadata
      contactInfo: p.contactInfo,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));

    res.json({
      properties: reordered,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error: error.message });
  }
};



exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const updateData = { ...req.body };

    // Handle home image update
    if (req.files['homeImage'] && req.files['homeImage'][0]) {
      const homeImageFile = req.files['homeImage'][0];
      updateData.homeImage = {
        data: homeImageFile.buffer.toString('base64'),
        contentType: homeImageFile.mimetype,
        filename: homeImageFile.originalname,
        size: homeImageFile.size,
        alt: req.body.alt || 'Home Image',
        uploadDate: new Date()
      };
    } else if (req.body.existingHomeImage) {
      updateData.homeImage = existingProperty.homeImage;
    }

    // Handle additional images
    if (req.files['images']) {
      const newImages = req.files['images'].map(file => ({
        data: file.buffer.toString('base64'),
        contentType: file.mimetype,
        filename: file.originalname,
        size: file.size,
        alt: req.body.alt || 'Property image',
        isPrimary: false
      }));

      if (req.body.replaceImages === 'true') {
        updateData.images = newImages;
      } else {
        updateData.images = [...existingProperty.images, ...newImages];
      }
    } else if (req.body.existingImages) {
      updateData.images = existingProperty.images.filter(img =>
        req.body.existingImages.includes(img._id.toString())
      );
    }

    // Parse nested fields from FormData
    updateData.location = req.body.location || existingProperty.location;
    updateData.propertyDetails = req.body.propertyDetails || existingProperty.propertyDetails;
    updateData.contactInfo = req.body.contactInfo || existingProperty.contactInfo;

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Property updated successfully',
      property: updatedProperty
    });
  } catch (error) {
    console.error('Error updating property:', error.stack);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update property'
    });
  }
};
exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting property'
    });
  }
};