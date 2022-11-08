const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  buyer_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  seller_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },  
  
  order_type: {
    type: String,
    required: true,
  },

  order_number: {
    type: Number,
    required: true,
  },

  payment_method: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema, "Orders");

module.exports = Order;
