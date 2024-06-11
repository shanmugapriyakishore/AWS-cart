const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error")

const products = require("./router/product")
app.use(express.json());
app.use('/api',products)  

app.use(express.json());
app.use(errorMiddleware)

module.exports = app;