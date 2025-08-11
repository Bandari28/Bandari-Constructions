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


router.post('/addproperties', auth, upload.array('images'), createProperty);

router.put('/properties/:id', auth, upload.array('images'), updateProperty);

router.delete('/properties/:id', auth, deleteProperty);


module.exports = router;
