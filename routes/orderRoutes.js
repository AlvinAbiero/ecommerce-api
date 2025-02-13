const express = require("express");
const router = express.Router();
const { createOrder, getOrder } = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/", auth, createOrder);
router.get("/", auth, getOrder);

module.exports = router;
