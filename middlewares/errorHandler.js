const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = `Internal server error`;

  if (error.name == "data not found") {
    code = 404;
    message = `data not found`;
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
    message = `Forbidden`;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
