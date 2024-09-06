const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId, // Corrected line
    ref: "Products",
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("Category", categorySchema)
