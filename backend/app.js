// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
 
// Initialize app AFTER imports
const app = express();

// Load environment variables
dotenv.config();

// Apply middleware
app.use(cors());                // Enable CORS
app.use(express.json());       // Parse incoming JSON

// Import and use routes
const adminRoutes = require('./routes/admin');
const propertyRoutes = require('./routes/propertyRoutes');

app.use('/', adminRoutes);           // Admin routes (e.g., /admin/login)
app.use('/', propertyRoutes);   // Property routes (e.g., /api/properties/add)

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('\x1b[36m%s\x1b[0m', `🚀 Server running at http://localhost:${PORT}`);
    });
    console.log('\x1b[32m%s\x1b[0m', '✅ Connected to MongoDB');
  })
  .catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '✘ DB connection failed:', err.message);
  });
