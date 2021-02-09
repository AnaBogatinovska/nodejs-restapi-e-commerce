const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    UserId: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Qty: { type: Number, required: true },
    ImageUrl: { type: String, required: true }
})

module.exports = mongoose.model("Item", itemSchema)