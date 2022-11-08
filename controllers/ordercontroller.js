const express = require("express");
const router = express.Router();

const orderservice = require("../services/orderservice.js");
const protect = require("../helpers/protect.js");


router.post("/order/:bid/:sid", protect, createOrder);
router.get("/order/:id", protect, getOrders);
router.patch("/order/:id", protect, updateOrder);
router.delete("/order/:id", protect, deleteOrder);

function createOrder(req, res, next) {
  orderservice
    .createOrder(params, req.params.bid, req.params.sid)
    .then((order) => {
      if (order) {
        return res.status(201).json(order);
      }
    })
    .catch((err) => {
      return next(err);
    });
}

function getOrders(req, res, next) {
  orderservice
    .getOrders(req.params.id)
    .then((orders) => {
      if (orders) return res.status(200).json(orders);
    })
    .catch((err) => {
      return next(err);
    });
}

function updateOrder(req, res, next) {
  orderservice
    .updateOrder(req.params.id)
    .then((order) => {
      if (order) {
        return res.status(301).json(order);
      }
    })
    .catch((err) => {
      return next(err);
    });

  function deleteOrder(req, res, next) {
    orderservice
      .deleteOrder(req.params.id)
      .then((order) => {
        if (order) {
          return res.status(401).json(order);
        }
      })
      .catch((err) => {
        return next(err);
      });
  }
}
