const express = require("express");
const {
  addShopping,
  getAllShopping,
  findShoppingById,
  updateShoppingById,
  deleteShoppingById,
} = require("../handlers/shopping");
const { authenticationCheck } = require("../middlewares/authentication");
const router = express.Router();

router.post("/shopping", authenticationCheck, addShopping);
router.get("/shopping", authenticationCheck, getAllShopping);
router.get("/shopping/:id", authenticationCheck, findShoppingById);
router.put("/shopping/:id", authenticationCheck, updateShoppingById);
router.delete("/shopping/:id", authenticationCheck, deleteShoppingById);

module.exports = router;
