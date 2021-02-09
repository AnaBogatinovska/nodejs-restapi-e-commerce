const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    Qty: { type: Number, default: 1 },
    Item: { type: mongoose.Schema.Types.ObjectId, ref: "Item"},
})

module.exports = mongoose.model("CartItem", cartItemSchema)