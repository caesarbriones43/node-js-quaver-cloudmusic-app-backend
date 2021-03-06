const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err.name);

  if (err.name === "CastError") {
    const message = `User not found whit id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicated field value entered`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    status: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
