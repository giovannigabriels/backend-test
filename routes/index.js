const express = require("express");
const router = express.Router();
const memberRouter = require("./memberRouter");
const booksRouter = require("./bookRouter");
const myBookRouter = require("./mybookrouter");
const authentication = require("../middlewares/authentication");

router.use("/member", memberRouter);

router.use("/books", booksRouter);
router.use("/mybooks", myBookRouter);

module.exports = router;
