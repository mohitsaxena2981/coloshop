const express = require("express");
const router = express.Router();
const uploads = require("../management/multer");
const {
  getAllItem,
  getOneItem,
  addNewItem,
  updateItem,
  deleteItem,
} = require("../controller/itemController");

router.get("/", getAllItem);
router.get("/:id", getOneItem);
router.post("/", uploads.single("image"), addNewItem);
router.put("/:id", uploads.single("image"), updateItem);
router.delete("/:id", deleteItem);

module.exports = router;