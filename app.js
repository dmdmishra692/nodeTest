const express = require("express");
const app = express();

const productRoute = require("./api/routes/product");
const cartRoute= require("./api/routes/cart");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes after /
app.use("/product", productRoute);
app.use("/cart",cartRoute);

// 23TWtiKoEtBXeM0G
mongoose.connect(
  "put the mongodb connection url herree",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("error", (_err) => {
  console.log("connection failed");
});
mongoose.connection.on("connected", (_connected) => {
  console.log("connected with mongoDb ....");
});

// bad url req error
app.use(async (req, res, next) => {
  res.status(404).json({
    message: "wrong url",
  });
});
module.exports = app;
