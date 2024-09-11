const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const customerModel = require("../models/customer");
const { isAfter } = require('date-fns');

async function orderProducts(req, res) {
  try {
    const {
      category,
      customerID,
      status,
      productsName,
      tel,
      address,
      customerName,
      dated,
      price,
      pay,
      quantity,
    } = req.body;
    const userId = req.user._id;

    // 1. Find the product by name
    const product = await productModel.findOne({ productsName }); // Use findOne to get a single document
    const customerNameed = await customerModel.findOne({ customerName }); // Use findOne to get a single document
    console.log(product);
    if (!product || !customerNameed) {
      return res
        .status(404)
        .json({ error: "ຊື່ສິນຄ້າບໍ່ມີໃນລະບົບ ຫຼື ຊື່ລູກຄ້າບໍ່ມີໃນລະບົບ" });
    }

    // 2. Check if there's enough stock
    if (product.quantity < quantity) {
      return res.status(400).json({ error: "ຈຳນວນສິນຄ້າໝົດ" });
    }

    // 3. Decrement product quantity
    product.quantity -= quantity;
    const totalProducts = price * quantity;
    const now = new Date();
    let total = "";
    if (
      (product.discount > 0 &&
        (!product.discountExpiry || isAfter(product.discountExpiry, now))) ||
      totalProducts >= product.lowPrice 
    ) {
      let dic = (totalProducts * product.discount) / 100;
      let latdis = totalProducts - dic;
      
      total = latdis;
    } else {
      total = totalProducts;
    }

    await product.save(); // Save the updated product

    // 4. Create the order
    const newOrderData = {
      user: userId,
      order_id: product._id,
      productsName: productsName, // Store product ID in productsName
      quantity: parseInt(quantity),
      category: category,
      customerID: customerID,
      tel: tel,
      address: address,
      customerName: customerName,
      dated: dated,
      price: price,
      pay: pay,
      status: status,
      total,
    };

    const newOrder = await orderModel.create(newOrderData);

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error getting or creating order:", err);
    res.status(500).json({ error: "Server error" });
  }
}
const autocomplete = async (req, res, next) => {
  const { productsName, customerName } = req.query;
  try {
    const autocompletefindModel = await productModel.find(productsName);
    const productsCustomer = await customerModel.find(customerName);
    if (autocompletefindModel && productsCustomer) {
      res.status(200).json({ autocompletefindModel, productsCustomer });
    } else {
      res.status(404).json({
        message: "ຊື່ສິນຄ້າ ແລະ ລູກຄ້າບໍ່ມີໃນລະບົບ",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};
module.exports.orderProducts = orderProducts;
module.exports.autocomplete = autocomplete;
