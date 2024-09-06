const LINE_NOTIFY_TOKEN = "vI8ihTdgrLzbaaxjbNYW9PuVHNcNHT6nggxmUAVszm4";
const axios = require("axios");
const MessageStatus = require("../models/messageStatus"); // สร้างไฟล์ schema สำหรับเก็บข้อมูลสถานะ
const { formatISO } = require('date-fns');
const Product = require("../models/productModel");
const sendLineNotification = async (message) => {
  try {
    const today = formatISO(new Date(), { representation: 'date' });
    
    // ค้นหาหมายเลขข้อความในวันนี้
    let status = await MessageStatus.findOne({ date: today });
    
    if (!status) {
      status = new MessageStatus({ date: today, count: 0 });
    }

    if (status.count >= 10) {
      console.log("Message limit for the day reached.");
      return;
    }
    // ส่งการแจ้งเตือน
    await axios.post(
      "https://notify-api.line.me/api/notify",
      new URLSearchParams({ message }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
        },
      }
    );
    
    // อัปเดตการนับข้อความ
    status.count += 1;
    await status.save();

    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const notifyLineQueality = async (req, res, next) => {
  try {
    const products = await Product.find();
    const alerts = products.filter(
      (product) => product.quantity <= product.threshold
    );

    if (alerts.length > 0) {
      const alertMessages = alerts
        .map(
          (product) =>
            `${product.productsName} - ຈຳນວນສິນຄ້າຄົງເຫຼືອ: ${product.quantity}`
        )
        .join("\n");
      await sendLineNotification(`สินค้าของคุณใกล้หมด:\n${alertMessages}`);
    }

    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

module.exports.notifyLineQueality = notifyLineQueality;


// const LINE_NOTIFY_TOKEN = "vI8ihTdgrLzbaaxjbNYW9PuVHNcNHT6nggxmUAVszm4";
// const axios = require("axios");
// const Product = require("../models/productModel");
// const sendLineNotification = async (message) => {
//   try {
//     let messageCount = 0;
//     const MAX_MESSAGES_PER_DAY = 10;
//     const MESSAGE_RESET_TIME = 24 * 60 * 60 * 1000; // 24 ชั่วโมง
//     let firstMessageTime = Date.now();
//     let currentTime = Date.now();
//     if (currentTime - firstMessageTime > MESSAGE_RESET_TIME) {
//       messageCount = 0;
//       firstMessageTime = currentTime;
//     }

//     if (messageCount >= MAX_MESSAGES_PER_DAY) {
//       console.log("Message limit for the day reached.");
//       return;
//     } else {
//       await axios.post(
//         "https://notify-api.line.me/api/notify",
//         new URLSearchParams({ message }),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
//           },
//         }
//       );
//       messageCount++;
//       console.log("Notification sent successfully");
//     }
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };
// const notifyLineQueality = async (req, res, next) => {
//   const products = await Product.find();
//   const alerts = products.filter(
//     (product) => product.quantity <= product.threshold
//   );

//   if (alerts.length > 0) {
//     const alertMessages = alerts
//       .map(
//         (product) =>
//           `${product.productsName} - ຈຳນວນສິນຄ້າຄົງເຫຼືອ: ${product.quantity}`
//       )
//       .join("\n");
//     await sendLineNotification(`สินค้าของคุณใกล้หมด:\n${alertMessages}`);
//   }

//   res.json(alerts);
// };
// module.exports.notifyLineQueality = notifyLineQueality;
