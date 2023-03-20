var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/products", require("./routes/products_route"))
app.use('/users', require('./routes/usersRoute'));

module.exports = app;
