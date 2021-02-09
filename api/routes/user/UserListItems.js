const express = require("express");
const router = express.Router();

const Item = require("../../models/ListItem");
const checkAuth = require("../../middleware/check-auth");

router.get("/", checkAuth, async (req, res, next) => {
  try {
    const ListItems = await Item.find().select("Id UserId Name Price Qty ImageUrl").exec();
    res.status(200).json(ListItems);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/:id", checkAuth, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
    res.status(200).json({
        _id: item._id,
        Name: item.Name,
        Price: item.Price,
        Qty: item.Qty,
        ImageUrl: item.ImageUrl
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;