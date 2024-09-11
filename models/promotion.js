// const { Schema, model } = require("mongoose");
// const promotionSchema = new Schema(
//   {
//     productsName: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     nameAdmin: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: String, // Corrected line
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     threshold: {
//       type: Number,
//       required: true,
//     },
//     size: {
//       type: String, // Corrected line
//       required: true,
//       default: "M",
//       enum: ["S", "M", "L", "XL", "XXL"],
//     },
//     status: {
//       type: String, // Corrected line
//       required: true,
//       default: "sale",
//       enum: ["sale"],
//     },
//     // image: { type: String },
//     codeProducts: {
//       type: String,
//       required: true,
//     },
//     startDate: { type: String, required: true },
//     endDate: { type: String, required: true },
//     discount: { type: Number, required: true },
//   },
//   { timestamps: true }
// );
// productSchema.virtual("order", {
//   ref: "Order",
//   localField: "_id",
//   foreignField: "product",
// });
// module.exports = model("Promotion", productSchema);
