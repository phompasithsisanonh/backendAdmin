const blockUser1 = require("../models/blockUser");
// ສ້າງຫ້ອງໃນການບ໋ອກ
const User = require("../models/UserModel");
const blockUser = async (req, res, next) => {
  try {
    const blocker = await User.findById(req.params.id);
    const existingBlock = await blockUser1.findOne({ blocker });
    console.log(existingBlock)
    if (existingBlock) {
      return res.status(400).json({ message: "User already blocked" });
    }
    const blockedUser2 = blockUser1.create({
      blocker: existingBlock,
    });
    res.status(200).json({ blockedUser2, message: "User blocked" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// ກວດສະຖານະການບ໋ອກ

// ຍົກການບໍອກ
module.exports.blockUser = blockUser;
