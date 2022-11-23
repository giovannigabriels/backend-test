const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = `Internal server error`;

  if (error.name == "book not found") {
    code = 404;
    message = `book not found`;
  } else if (error.name == `invalid_credentials`) {
    code = 401;
    message = `invalid code or password`;
  } else if (
    error.name == `invalid token` ||
    error.name == `JsonWebTokenError`
  ) {
    code = 401;
    message = `invalid token`;
  } else if (error.name == `forbidden`) {
    code = 403;
    message = `You can't borrow when get penalty`;
  } else if (error.name == `out of stock`) {
    code = 404;
    message = `Out of stock`;
  } else if (error.name === "already") {
    code = 400;
    message = "Maximal borrow is 2 book";
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
