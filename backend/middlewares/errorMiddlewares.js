// Error handler for not dound routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}.`);
  res.status(404);
  next(error);
};

// General error handler
const errorHandler = (err, req, res, next) => {
  // Setup the status code and the message
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found.';
  }
  // Send the response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
