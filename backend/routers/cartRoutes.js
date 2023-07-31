const express = require("express");
const router = express.Router();
const {
  getCartList,
  getCartById,
  getAdminOrders,
  getPreviousOrdersByUserId,
  createCart,
} = require("../controller/cartController");

router.get("/", getCartList);
router.get("/:id", getCartById);
router.get("/admin/orders", getAdminOrders);
router.get("/previous-orders/:userId", getPreviousOrdersByUserId);
router.post("/", createCart);

module.exports = router;
