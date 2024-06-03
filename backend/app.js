const express = require("express");
const app = express();

const products = require("./router/product")
app.use(express.json());
app.use('/api',products)  
app.use(express.json());
module.exports = app;