const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Errorsp";

  res.status(err.statusCode).json({
    status: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
