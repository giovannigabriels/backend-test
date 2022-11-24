const express = require("express");
const Controller = require("../controllers/bookController");

const router = express.Router();

router.get("/", Controller.getAllBook);

module.exports = router;
