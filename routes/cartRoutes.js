const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const auth = require("../middlewares/auth");

router.get("/", auth, getCart);
router.post("/add", addToCart);
router.delete("/remove/:productId", auth, removeFromCart);

module.exports = router;
