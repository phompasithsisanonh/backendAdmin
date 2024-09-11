const slugify = require("slugify");
const productModel = require("../models/productModel");
const multer = require("multer");
const path = require("path");
const {
  differenceInSeconds,
  formatDuration,
  intervalToDuration,
} = require("date-fns");
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
      discount,
      lowPrice,
      discountExpiry
    } = req.body;

    // Validate required fields
    if (!productsName || !price || !category || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

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
      discount,
      lowPrice,
      discountExpiry,
      slug: slugify(productsName, { lower: true }), // Generate slug from product name
      // image: imagePath // Save the image path in the product model
    });

    // Save the product to the database
    await products.save();
    res.status(200).json({
      success: true,
      message: `succefully`,
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
// // let imagePath = '';
// // if (req.file) {
// //   imagePath = `/uploads/${req.file.filename}`; // Adjust this path as needed
// // }
