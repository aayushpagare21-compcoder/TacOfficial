const User = require("../models/user.js");
const Order = require("../models/order.js");

async function createOrder() {}

async function deleteOrder(id) {
  return await Order.deleteOne({ _id: id });
}

async function updateOrder(params, id) {
  return await Order.findByIdAndUpdate(id, params);
}

async function getOrders(id) {}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
};
