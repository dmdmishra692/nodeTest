const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/", productController.addproducts);
router.get("/", productController.listOfProduct);
router.put("/",productController.updateProduct)
router.post("/",productController.uploadImg)

module.exports = router;
