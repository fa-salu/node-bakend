const Cart = require('../models/Cart');

// Add Product to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.send('Product added to cart');
};

// Get Cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
  if (!cart) return res.status(404).send('Cart not found');
  res.json(cart);
};
