const productsModel = require("../models/customer");
const ProductsModel = require("../models/productModel");
const historyCustomer = async (req, res, next) => {
  try {
    const latestHistory = await productsModel.find();
    if(!latestHistory ){
        return res.status(404).json({ message: 'No history found' });
    }
    res.status(200).json({latestHistory})
  } catch (err) {
    console.log(err);
  }
};
const historyProducts = async (req, res, next) => {
  try {
    const latestHistoryProducts = await ProductsModel.find();
    if(!latestHistoryProducts ){
        return res.status(404).json({ message: 'No history found' });
    }
    res.status(200).json({latestHistoryProducts })
  } catch (err) {
    console.log(err);
  }
};
module.exports.historyCustomer = historyCustomer;
module.exports.historyProducts = historyProducts;
