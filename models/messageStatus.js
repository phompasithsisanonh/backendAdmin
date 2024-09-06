const mongoose = require('mongoose');

const messageStatusSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, unique: true },
  count: { type: Number, default: 0 }
});

const MessageStatus = mongoose.model('MessageStatus', messageStatusSchema);

module.exports = MessageStatus;
