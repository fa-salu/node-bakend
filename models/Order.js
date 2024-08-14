const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
