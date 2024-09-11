const userModel = require("../models/UserModel");
const customer1 = require("../models/customer");
const productsModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const deleteController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const customer = await customer1.findOneAndDelete(id);
    const user = await userModel.findOneAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteCustomerController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const customer = await customer1.findOneAndDelete(id);

    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }
    res.status(200).json({ message: "customer  deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteProductsController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productsModel1 = await productsModel.findOneAndDelete(id);

    if (!productsModel1) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json({ message: "products  deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteOrderController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productsModel1 = await orderModel.findOneAndDelete(id);

    if (!productsModel1) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ message: "order  deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteDiscount = async (req, res, next) => {
  try {
    const result = await productsModel.deleteMany({
      expirationDate: {
        $lt: new Date(),
      },
      discount: 0,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "fail ",
    });
  }
};
module.exports.deleteController = deleteController;
module.exports.deleteCustomerController = deleteCustomerController;
module.exports.deleteProductsController = deleteProductsController;
module.exports.deleteOrderController = deleteOrderController;
module.exports.deleteDiscount = deleteDiscount;
