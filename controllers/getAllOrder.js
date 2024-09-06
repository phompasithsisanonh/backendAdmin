const orderModel= require("../models/orderModel");
const getAllOrder = async (req, res) => {
    try {
      const page = parseInt(req.query.page,5) || 1;
      const limit = parseInt(req.query.limit) || 5
      const skip = (page - 1) * limit;
      const products = await  orderModel.find().skip(skip).limit(limit);
      const total = await  orderModel.countDocuments();
      res.json({ products, total });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  };
  module.exports.getAllOrder= getAllOrder;