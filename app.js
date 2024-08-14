const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./config/db");
// const authRoutes = require('./routes/authRoutes')
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const wishlistRoutes = require('./routes/wishlistRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config()
connectDB();

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());


// app.use('/auth', authRoutes)
// app.use('/products', productRoutes);
// app.use('/cart', cartRoutes);
// app.use('/wishlist', wishlistRoutes);
// app.use('/orders', orderRoutes);
app.use('/users', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/carts', require('./routes/cartRoutes'));
app.use('/wishlists', require('./routes/wishlistRoutes'));
app.use('/orders', require('./routes/orderRoutes'));

// app.use(errorMiddleware);
app.use(errorHandler);


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
