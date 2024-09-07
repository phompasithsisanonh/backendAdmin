const express = require("express");
const router = express.Router();
const Users = require("../models/UserModel");
const { Test, updatePro } = require("../ban");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userModel = require("../models/UserModel");
const orderModel = require("../models/orderModel");
const Products = require("../models/productModel");
const JWT = require("jsonwebtoken");
const { compare1, hashPassword } = require("../helper/hashPassword");
const {
  registerController,
  loginController,
  orderStatusController,
  // updateStatus,
  getOrdersController,
  getAllOrdersController,
} = require("../controllers/authController");
const { createCategoryController } = require("../controllers/catgory");
const {
  createProductController,
} = require("../controllers/productsController");
const { customer, getCustomerAll } = require("../controllers/customer");
const { getProducts } = require("../controllers/getProducts");
const { getAllAdmin } = require("../controllers/getAllAdmin");
const { updateController } = require("../controllers/authController");
const {
  deleteController,
  deleteCustomerController,
  deleteProductsController,
  deleteOrderController,
} = require("../controllers/deleteController");
const { orderProducts, autocomplete } = require("../controllers/Inder");
const { getAllOrder } = require("../controllers/getAllOrder");
const { updateStatus } = require("../controllers/updateStatus");
const { notifyLineQueality } = require("../controllers/notifyLineQueality");
const {
  historyCustomer,
  historyProducts,
} = require("../controllers/historyCustomer");
const { blockUser } = require("../controllers/ิblockUser");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to ensure unique filenames
  },
});

const upload = multer({ storage: storage });

const AuthTicat = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    const currentUser = await Users.findById(decoded._id);
    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
router.put("/updateCollectionName", updatePro);
router.get("/sortCollectionPriceCompany", Test);
router.get("/createCategoryController", createCategoryController);
//ອັດເດດປະເພດສິນຄ້າ
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/customer", AuthTicat, customer);
router.post("/orderStatusController/:id", AuthTicat, orderStatusController);
router.post("/updateController", AuthTicat, updateController);
router.post(
  "/createProductController",
  upload.single("image"),
  AuthTicat,
  createProductController
);
router.post("/order", AuthTicat, orderProducts);
router.post("/blockUser/:id", blockUser);

router.get("/getOrdersController/:id", AuthTicat, getOrdersController);
router.get("/getAllOrdersController", AuthTicat, getAllOrdersController);
router.get("/getCustomer", getCustomerAll);
router.get("/getProducts", getProducts);
router.get("/getAllorder", getAllOrder);
router.get("/getAllAdmin", getAllAdmin);
router.get("/autocomplete", autocomplete);
router.get("/alerts", notifyLineQueality);
router.get("/historyCustomer", historyCustomer);
router.get("/historyProducts", historyProducts);

router.delete("/delete/:id", deleteController);
router.delete("/deleteCustomer/:id", deleteCustomerController);
router.delete("/deleteProductsController/:id", deleteProductsController);
router.delete("/deleteOrderController/:id", deleteOrderController);

router.patch("/updateStatus/:id", updateStatus);
module.exports = router;
