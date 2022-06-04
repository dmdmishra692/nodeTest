const express = require("express");
const router = express.Router();
const cart = require("../controller/cartController");

router.post("/", cart.addItemToCart);
router.get("/", cart.getCart);


module.exports = router;
