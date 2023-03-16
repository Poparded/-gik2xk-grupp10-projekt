var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use("/products", require("./routes/products_route"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
