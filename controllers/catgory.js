const productModel = require("../models/productModel");
const slugify = require("slugify");
const createCategoryController = async (req, res) => {
  try {
    const {   category } = req.body;
    
    const existingCategory = await productModel.find({  category });
    if (existingCategory) {
      return res.status(200).json({
        existingCategory
      });
    }else{
      return res.status(400).json({
        essage: "error",
      });
    }
    
    // const category = await new categoryModel({
    //   name,
    //   slug: slugify(name),
    // }).save();
    // res.status(201).send({
    //   success: true,
    //   message: "new category created",
    //   category,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};
module.exports.createCategoryController = createCategoryController;
