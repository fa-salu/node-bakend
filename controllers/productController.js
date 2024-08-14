const Product = require('../models/Product');

// Get Products by Category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
};

// Get Specific Product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
};
