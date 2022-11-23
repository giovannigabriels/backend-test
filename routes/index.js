const express = require("express");
const router = express.Router();
const memberRouter = require("./memberRouter");
const booksRouter = require("./bookRouter");
const authentication = require("../middlewares/authentication");

router.use("/member", memberRouter);

router.use("/books", booksRouter);

module.exports = router;
