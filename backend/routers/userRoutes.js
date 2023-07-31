const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
} = require("../controller/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.put("/:id", updateUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;

