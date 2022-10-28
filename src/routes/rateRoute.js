const express = require("express");

const {
  postRate,
  getRateByUser,
  getRateByRes,
} = require("../controllers/rateController");

const rateRoute = express.Router();

rateRoute.post("/postRate", postRate);
rateRoute.get("/getRateByUser/:id", getRateByUser);
rateRoute.get("/getRateByRes/:id", getRateByRes);

module.exports = rateRoute;
