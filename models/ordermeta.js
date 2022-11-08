const mongoose = require("mongoose");

const orderMetaSchema = mongoose.Schema({
  order_id: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: true,
  },

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

  payment_response: {
    type: Boolean,
    required: true,
  },

  credit_data: {
    type: Number,
    required: true,
  },

  reject_data: {
    type: Number,
    required: true,
  },
});

const OrderMeta = mongoose.model("OrderMeta", orderMetaSchema, "OrderMeta");

module.exports = OrderMeta;
