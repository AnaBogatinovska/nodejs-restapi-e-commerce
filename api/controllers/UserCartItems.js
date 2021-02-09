const CartItem = require("../models/CartItem");

exports.get_all_cart_items = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find({ UserId: req.userData.id })
      .populate("Item")
      .select("Qty Item UserId")
      .exec();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.post_cart_item = async (req, res, next) => {
  try {
    const item = await CartItem.findOne({
      UserId: req.userData.id,
      Item: req.body.Item,
    })
      .populate("Item")
      .exec();
    if (item) {
      item.Qty = item.Qty + req.body.Qty;
      const result = await item.save();
      res.status(200).json(result);
    } else {
      const cartItem = new CartItem({
        UserId: req.userData.id,
        Qty: req.body.Qty,
        Item: req.body.Item,
      });
      let result = await cartItem.save();
      result.populate("Item", function (err) {
        res.status(201).json(result);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.put_cart_item = async (req, res, next) => {
  try {
    if (req.body.Qty > 0) {
      const result = await CartItem.findByIdAndUpdate(
        req.params.cartItemId,
        {
          $set: {
            Qty: req.body.Qty,
          },
        },
        {
          new: true,
        }
      ).exec();
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.delete_cart_item = async (req, res, next) => {
  try {
    const result = await CartItem.remove({
      _id: req.params.cartItemId,
    }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
