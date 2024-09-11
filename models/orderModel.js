const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },

    order_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    productsName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pay: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    customerID: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    dated: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
       total: {
       type: String,
       required: true,
     },
    status: {
      type: String,
      required: true,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "cancel"],
    },
    total:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
module.exports = model("Order", orderSchema);
