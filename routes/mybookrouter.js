const express = require("express");
const Controller = require("../controllers/myBookController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/:BookId", authentication, Controller.borrowBook);
router.delete("/:BookId", authentication, Controller.returnBook);

module.exports = router;
