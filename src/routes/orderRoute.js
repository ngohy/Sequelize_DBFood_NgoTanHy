const express = require("express");
const { postOrder } = require("../controllers/orderController");

const orderRoute = express.Router();

orderRoute.post("/postOrder", postOrder);

module.exports = orderRoute;
