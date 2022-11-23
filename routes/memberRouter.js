const express = require("express");
const Controller = require("../controllers/memberController");
const router = express.Router();

router.post("/login", Controller.login);
router.get("/", Controller.getAllMember);

module.exports = router;
