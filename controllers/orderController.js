const Order = require('../models/Order');

// Create Order
exports.createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  const order = new Order({ userId, items, totalAmount });
  await order.save();
  res.status(201).send('Order created');
};

// Get Order Details
exports.getOrderDetails = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
  if (!orders) return res.status(404).send('Orders not found');
  res.json(orders);
};
