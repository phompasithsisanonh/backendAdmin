const Order = require("../models/orderModel");
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const {  id } = req.params;
    if (!status) {
      return res.status(400).json({ message: "ສະຖານະເກີດຂໍ້ຜິດພາດ" });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "ຄຳສັ່ງຊື້ບໍ່ມີໃນລະບົບ" });
    }
    // if(order.status === 'Processing'){
    //   return res.status(404).json({ message: "ບໍ່ສາມາດປ່ຽນແປງຂໍ້ມູນ" });
    // }
    console.log(order)
    // Update the status of the product
    order.status = status;
    await order.save();
    
    res.status(200).json({ data: order });
  } catch (error) {
    console.error("Error while updating order:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating order",
      error: error.message,
    });
  }
};
module.exports.updateStatus = updateStatus;
