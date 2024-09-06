const { Schema, model } = require("mongoose");
const { StringDecoder } = require("string_decoder");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    customerName: {
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
    status: {
      type: String,
      default: "customer",
      enum:['customer',"creditors","debtors"]
    },
  },
  { timestamps: true }
);
module.exports = model("Customer", orderSchema);
