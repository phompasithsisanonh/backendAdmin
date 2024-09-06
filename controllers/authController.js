const userModel = require("../models/UserModel");
const orderModel = require("../models/orderModel");
const Products = require("../models/productModel");
const JWT = require("jsonwebtoken");
const { compare1, hashPassword } = require("../helper/hashPassword");
//ລະບົບສະໝັກ
const registerController = async (req, res) => {
  try {
    const { firstName, email, password, passwordID,status,tel } = req.body;
    if (!firstName) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      firstName,
      email,
      password: hashedPassword,
      passwordID,
      status,
      tel
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
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
//ລະບົບລົງທະບຽນ
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await compare1(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, "ab231", {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        passwordID:user.passwordID,
        status:user.status,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "err in login",
      err,
    });
  }
};
//ຄົ້ນຫາໄອດີຂອງຍູເຊີສະເພາະ1ຄົນສັ່ງ
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({user: req.user._id })
      .populate("product")
      .populate("user");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//ຄົ້ນຫາທັ້ງໝົດທີ່ສັ່ງ
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user").populate("product");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//ຄຳສັ່ງອໍເດີ
const orderStatusController = async (req, res) => {
  try {
    console.log(req.user._id);
    const findProducts = await Products.findById(req.params.id);
    if (findProducts) {
      const productData = {
        name: findProducts.name,
        price: findProducts.price,
        description: findProducts.description,
        category: findProducts.category,
      };
      const newOrder = await orderModel.create({
        user: req.user._id,
        product: findProducts,
        productData,
      });

      res.json({
        data: newOrder,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
//ອັບເດດສະຖານະການສັ່ງ
// const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const orders = await orderModel.findByIdAndUpdate(
//       req.params.id,
//       { status: status },
//       { new: true }
//     );
//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error While Updateing Order",
//       error,
//     });
//   }
// };
const updateController = async (req, res, next) => {
  const { email, firstName, passwordID, status,tel } = req.body;

  try {
    const findEmail = await userModel.findOne({ email });
    
    if (!findEmail) {
      return res.status(404).json({ message: "User not found" });
    }

    findEmail.email = email;
    findEmail.firstName = firstName;
    findEmail.passwordID = passwordID;
    findEmail.status = status;
    findEmail.tel = tel;

    await findEmail.save();

    res.status(200).json({ message: "User updated successfully", user: findEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateController = updateController;
module.exports.registerController = registerController;
module.exports.loginController = loginController;
module.exports.getAllOrdersController = getAllOrdersController;
module.exports.getOrdersController = getOrdersController;
module.exports.orderStatusController = orderStatusController;
// module.exports.updateStatus = updateStatus;
