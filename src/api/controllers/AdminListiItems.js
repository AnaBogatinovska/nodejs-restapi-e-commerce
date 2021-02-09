const mongoose = require("mongoose");

const Item = require("../models/ListItem");
const CartItem = require("../models/CartItem");

exports.get_all_list_items = async (req, res, next) => {
  try {
    const listItems = await Item.find({ UserId: req.userData.id })
      .select("Id UserId Name Price Qty ImageUrl")
      .exec();
    res.status(200).json(listItems);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.get_list_item = async (req, res, next) => {
  try {
    const item = await Item.findById({
      _id: req.params.id,
      UserId: req.userData.id,
    });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.post_list_item = async (req, res, next) => {
  console.log(req)
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    UserId: req.userData.id,
    Name: req.body.Name,
    Price: req.body.Price,
    Qty: req.body.Qty,
    ImageUrl: req.file.path
  });

  try {
    const result = await item.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.put_list_item = async (req, res, next) => {
  try {
    let setItemProps = {
      Name: req.body.Name,
      Price: req.body.Price,
    }

    if (req.file) {
      setItemProps.ImageUrl = req.file.path
    }

    const response = await Item.findByIdAndUpdate(req.params.id, {
      $set: setItemProps,
    }, 
    {new: true});

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.delete_list_item = async (req, res, next) => {
  try {
    const resultItem = await Item.remove({ _id: req.params.id });
    await CartItem.remove({ Item: req.params.id });
    res.status(200).json(resultItem);
  } catch (error) {
    console.log(error); 
    res.status(500).json(error);
  }
};
