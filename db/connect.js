const mongoose = require("mongoose");
require('dotenv').config(); // Ensure this is at the top of your file

// Options for MongoDB connection
const options = {
  serverSelectionTimeoutMS: 5000,  // Timeout for server selection
  autoIndex: false,                // Disable automatic index creation (useful for production)
  maxPoolSize: 10,                 // Maximum number of connections in the pool
  socketTimeoutMS: 45000,          // Socket timeout in milliseconds
  family: 4,                       // IPv4 only
};

const connectDB = (url) => {
  return mongoose
    .connect(url, options)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.error("DB connection error:", err));
};

module.exports = connectDB;
