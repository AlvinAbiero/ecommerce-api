const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController"); // Ensure these are correctly defined
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

console.log(typeof getAllProducts); // Should log 'function'
console.log(typeof createProduct); // Should log 'function'
console.log(typeof updateProduct); // Should log 'function'
console.log(typeof deleteProduct); //

router.get("/", getAllProducts);
router.post("/", admin, createProduct); // This line is likely causing the issue
router.put("/:id", admin, updateProduct);
router.delete("/:id", admin, deleteProduct);

module.exports = router;
