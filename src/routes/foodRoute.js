const express = require("express");
const { getFood } = require("../controllers/foodController");
const foodRoute = express.Router();

//GET
foodRoute.get("/getFood", getFood);

module.exports = foodRoute;
