const { default: mongoose } = require("mongoose");
const Product = require("./models/product");
const Test = (req, res, next) => {
  const { price } = req.query;
  if (price) {
    const priceValue = parseFloat(price);
    let priceQuery;
    if (!isNaN(priceValue) && priceValue >= 0) {
      if (priceValue >= 0 && priceValue <= 50) {
        priceQuery = { $gte: 0, $lte: 50 };
      } else if (priceValue > 50 && priceValue <= 100) {
        priceQuery = { $gte: 50, $lte: 100 };
      } else {
        return res.status(400).json({ message: "ເກີດຄວາມຜິດຜາດ" });
      }
    }
    Product.find({
      price: priceQuery,
    })
      .then((products) => {
        res.status(200).json({ products });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "ເກີດຄວາມຜິດຜາດ" });
      });
  } else {
    res.status(200).json({ message: "fail" });
  }
};
// else if (company) {
//   Product.find({ company: company })
//     .then((products) => {
//       res.status(200).json({ products });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ message: "ເກີດຄວາມຜິດຜາດ" });
//     });
const updatePro = (req, res, next) => {
  const { name, price, company, changeCompony } = req.body;
  const { _id } = req.query;
  if (name === "" || price === "") {
    res.status(404).json({ message: "please write products" });
  } else if (_id) {
    Product.updateOne({ _id: _id }, { name: name, price: price }) // Corrected query condition
      .then((result) => {
        if (result.nModified === 0) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } else if ((company, name)) {
    Product.updateMany({ company: company }, { $set: { company: name } })
      .then((result) => {
        if (result && result.acknowledged) {
          res
            .status(200)
            .json({ result, message: "Product updated successfully" });
        } else {
          res.status(500).json({ message: "ot acknowledged" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  } else {
    res.status(400).json({ message: "Missing _id " });
  }
};
module.exports.updatePro = updatePro;
module.exports.Test = Test;
