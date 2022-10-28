const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

//MIDDLEWARE
app.use(express.json());

app.listen(8080, () => {
  console.log("App is listening at port 8080");
});

const rootRoute = require("./routes/index");
app.use("/api", rootRoute);
//=> localhost:8080/api/food/getFood
