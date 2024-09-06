const fs = require('fs').promises;
const path = require('path');
const productModel = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    // Define the directory for uploads
    const uploadDir = path.join(__dirname, '../uploads');

    // Function to get file paths from the uploads directory
    const getFilePaths = async () => {
      try {
        const files = await fs.readdir(uploadDir);
        return files.map(file => `/uploads/${file}`);
      } catch (err) {
        console.error('Error reading files:', err);
        throw new Error('Error reading files');
      }
    };

    // Get pagination parameters
    const page = parseInt(req.query.page, 5) || 1;
    const limit = parseInt(req.query.limit, 5) || 5;
    const skip = (page - 1) * limit;

    // Get price filter if any
    const { price } = req.query;
    let priceQuery = {};
    if (price) {
      const [minPrice, maxPrice] = price.split('-').map(p => parseFloat(p));
      if (maxPrice) {
        priceQuery = { price: { $gte: minPrice, $lte: maxPrice } };
      } else {
        priceQuery = { price: { $gte: minPrice } };
      }
    }

    // Fetch products from database
    const productsPromise = productModel.find(priceQuery).skip(skip).limit(limit);
    const totalPromise = productModel.countDocuments(priceQuery);

    // Await the results of both operations
    const [products, total] = await Promise.all([productsPromise, totalPromise]);

    // Fetch file paths from uploads directory
    const filePaths = await getFilePaths();

    // Respond with both products and file paths
    res.json({ products, total, filePaths });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).send({
      success: false,
      message: 'Error in Products',
      error,
    });
  }
};

module.exports.getProducts = getProducts;
