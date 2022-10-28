const express = require("express");
const {
  getLikeByUser,
  getLikeByRes,
  postLike,
  deleteLike,
} = require("../controllers/likeController");
const likeRoute = express.Router();

//get like by user_id
likeRoute.get("/getLikeByUser/:id", getLikeByUser);

//get like by res_id
likeRoute.get("/getLikeByRes/:id", getLikeByRes);

//add like
likeRoute.post("/postLike", postLike);

//delete like
likeRoute.delete("/deleteLike", deleteLike);
module.exports = likeRoute;
