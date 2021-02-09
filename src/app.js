const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const adminRoutes = require('./api/routes/admin/AdminListItems')
const userRoutes = require('./api/routes/user/UserListItems')
const cartItemsRoutes = require('./api/routes/user/CartItems')
const authRoutes = require('./api/routes/auth/Auth')


mongoose.connect(
    "mongodb+srv://dbAnaB:" +
      process.env.MONGO_ATLAS_PW +
      "@node-rest-shop.inld1.mongodb.net/ShoppingList?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  app.use(morgan("dev"));
  app.use('/uploads', express.static("uploads"))
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());


  //routes middlewares
  app.use('/api/admin/item', adminRoutes)
  app.use('/api/item', userRoutes)
  app.use('/api/CartItem', cartItemsRoutes)
  app.use('/api/auth', authRoutes)

//if there are no routes matched there is Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//If there is operation error
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});
module.exports = app