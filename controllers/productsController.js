const slugify = require("slugify");
const productModel = require("../models/productModel");
const multer = require('multer');
const path = require('path');

const createProductController = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      productsName,
      nameAdmin,
      price,
      category,
      quantity,
      date,
      size,
      status,
      codeProducts,
    } = req.body;

    // Validate required fields
    if (!productsName || !price || !category || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Set image path if file is uploaded
    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Adjust this path as needed
    }

    // Create new product
    const products = new productModel({
      productsName,
      nameAdmin,
      price,
      category,
      quantity,
      date,
      size,
      status,
      threshold: 10,
      codeProducts,
      slug: slugify(productsName, { lower: true }), // Generate slug from product name
      image: imagePath // Save the image path in the product model
    });

    // Save the product to the database
    await products.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

module.exports.createProductController = createProductController;
