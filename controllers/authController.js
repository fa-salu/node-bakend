const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send('User already exists');

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid email or password');

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
