const customerModel = require("../models/customer");

//ລະບົບສະໝັກ
const customer = async (req, res) => {
  try {
    const { customerName, customerID, tel, address, status } = req.body;
    const exisitingUser = await customerModel.findOne({ customerID });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already customerID please new",
      });
    }

    const custonerNew = await customerModel.create({
      user: req.user._id,
      customerName,
      customerID,
      tel,
      address,
      status,
    });
    res.status(201).send({
      success: true,
      message: "customer job",
      custonerNew,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

const getCustomerAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await  customerModel.find().skip(skip).limit(limit);
    const total = await  customerModel.countDocuments();
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

module.exports.customer = customer;
module.exports.getCustomerAll = getCustomerAll;
