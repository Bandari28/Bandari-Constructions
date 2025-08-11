const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    // Validate files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Process all uploaded files
    const images = req.files.map((file, index) => ({
      data: file.buffer.toString('base64'),
      contentType: file.mimetype,
      filename: file.originalname,
      size: file.size,
      alt: req.body.alt || `Property image ${index + 1}`,
      isPrimary: index === 0 // Mark first image as primary by default
    }));

    // Create property with all data
    const property = new Property({
      ...req.body,
      images: images
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: {
        _id: property._id,
        title: property.title,
        images: property.images.map(img => ({
          _id: img._id,
          isPrimary: img.isPrimary,
          filename: img.filename
        }))
      }
    });

  } catch (error) {
    console.error('Error creating property:', error);
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

    // Check if property exists
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Prepare update data
    const updateData = { ...req.body };

    // Handle image updates if new files were uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        data: file.buffer.toString('base64'),
        contentType: file.mimetype,
        filename: file.originalname,
        size: file.size,
        alt: req.body.alt || `Property image ${index + 1}`,
        isPrimary: index === 0 // Mark first new image as primary
      }));

      // Handle image replacement strategy
      if (req.body.replaceImages === 'true') {
        // Replace all existing images with new ones
        updateData.images = newImages;
      } else {
        // Append new images to existing ones
        updateData.images = [...existingProperty.images, ...newImages];

        // If there were no existing images, make first new image primary
        if (existingProperty.images.length === 0) {
          updateData.images[0].isPrimary = true;
        }
      }
    }

    // Handle primary image update if specified
    if (req.body.primaryImageId && updateData.images) {
      updateData.images = updateData.images.map(img => ({
        ...img,
        isPrimary: img._id ? img._id.toString() === req.body.primaryImageId : false
      }));
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    );

    res.json({
      success: true,
      message: 'Property updated successfully',
      property: {
        _id: updatedProperty._id,
        title: updatedProperty.title,
        price: updatedProperty.price,
        propertyType: updatedProperty.propertyType,
        googleMap: updatedProperty.googleMap,
        location: updatedProperty.location,
        propertyDetails: updatedProperty.propertyDetails,
        images: updatedProperty.images.map(img => ({
          _id: img._id,
          isPrimary: img.isPrimary,
          filename: img.filename,
          size: img.size,
          contentType: img.contentType
        })),
        contactInfo: updatedProperty.contactInfo,
        createdAt: updatedProperty.createdAt,
        updatedAt: updatedProperty.updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating property:', error);
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