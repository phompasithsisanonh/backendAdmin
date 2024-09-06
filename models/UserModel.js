const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "admin",
      enum: ["admin", "user", "rider"],
    },
    passwordID: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
userSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("customer", {
  ref: "Customer",
  localField: "_id",
  foreignField: "user",
});
module.exports = model("Users", userSchema);
