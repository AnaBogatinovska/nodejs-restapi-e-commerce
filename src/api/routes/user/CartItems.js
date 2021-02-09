const express = require("express");
const router = express.Router();

const checkAuth = require("../../middleware/check-auth");
const userCartItemsController = require('../../controllers/UserCartItems')

router.get("/", checkAuth, userCartItemsController.get_all_cart_items);

router.post("/", checkAuth, userCartItemsController.post_cart_item);

router.put("/:cartItemId", checkAuth, userCartItemsController.put_cart_item);

router.delete("/:cartItemId", checkAuth, userCartItemsController.delete_cart_item);

module.exports = router;
