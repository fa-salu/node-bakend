const express = require('express');
const { createOrder, getOrderDetails } = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createOrder);
router.get('/:userId', getOrderDetails);

module.exports = router;
