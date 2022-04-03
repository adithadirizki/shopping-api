const express = require("express");
const { signup, signin, getAllUsers } = require("../handlers/user");
const { authenticationCheck } = require("../middlewares/authentication");
const router = express.Router();

router.post("/users/signup", signup);
router.post("/users/signin", signin);
router.get("/users", authenticationCheck, getAllUsers);

module.exports = router;
