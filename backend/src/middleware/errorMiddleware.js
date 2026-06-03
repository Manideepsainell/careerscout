const errorHandler = (err, req, res, next) => {
    if (err.name === "CastError") {
  err.statusCode = 400;
  err.message = "Invalid ID";
}
if (err.name === "ValidationError") {
  err.statusCode = 400;
  err.message = Object.values(err.errors)[0].message;
}
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

export default errorHandler;