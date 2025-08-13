const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const storage = multer.memoryStorage(); // Store in memory to get buffer
const upload = multer({ storage: storage });

router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);


router.post('/addproperties',
  auth,
  upload.fields([
    { name: 'images', maxCount: 10 },    // For multiple images
    { name: 'homeImage', maxCount: 1 }   // For single home image
  ]),
  createProperty
);
router.put(
  '/properties/:id',
  auth, upload.fields([
    { name: 'images', maxCount: 10 },    // For multiple images
    { name: 'homeImage', maxCount: 1 }   // For single home image
  ]),
  updateProperty);

router.delete('/properties/:id', auth, deleteProperty);


module.exports = router;
