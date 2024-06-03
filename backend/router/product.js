const express = require("express");
const { getProducts, newProduct, getSingleProduct, updateproduct, deleteProduct } = require("../controller/productController");
const router = express.Router();

router.route("/products").get(getProducts)
router.route("/product/new").post(newProduct)
router.route("/product/:id")
                            .get(getSingleProduct)
                            .put(updateproduct)
                            .delete(deleteProduct)
module.exports= router;