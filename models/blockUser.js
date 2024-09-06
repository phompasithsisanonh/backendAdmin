const mongoose = require("mongoose");

// โมเดลสำหรับการบล็อกผู้ใช้
const blockedUserSchema = new mongoose.Schema(
  {
    blocker: {
     type: mongoose.Schema.Types.ObjectId,
       ref: "User",
      required: true,
    },
    // blocked: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
); // การบันทึกวันที่และเวลาที่สร้างหรืออัปเดต

module.exports = mongoose.model("BlockedUser", blockedUserSchema);
