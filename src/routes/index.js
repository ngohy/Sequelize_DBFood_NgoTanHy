const express = require("express");
const rootRoute = express.Router();

const likeRoute = require("./likeRoute");
rootRoute.use("/like", likeRoute);

const foodRoute = require("./foodRoute");
rootRoute.use("/food", foodRoute);

const rateRoute = require("./rateRoute");
rootRoute.use("/rate", rateRoute);

const orderRoute = require("./orderRoute");
rootRoute.use("/order", orderRoute);

module.exports = rootRoute;
