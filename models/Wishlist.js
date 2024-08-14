const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
