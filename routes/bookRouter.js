const express = require("express");
const Controller = require("../controllers/bookController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", Controller.getAllBook);
router.put("/:BookId", authentication, Controller.borrowBook);

module.exports = router;
