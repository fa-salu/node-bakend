const Wishlist = require('../models/Wishlist');

// Add Product to Wishlist
exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, items: [{ productId }] });
  } else {
    if (!wishlist.items.some(item => item.productId.equals(productId))) {
      wishlist.items.push({ productId });
    }
  }

  await wishlist.save();
  res.send('Product added to wishlist');
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('items.productId');
  if (!wishlist) return res.status(404).send('Wishlist not found');
  res.json(wishlist);
};
