/**
 * Global Error Handling Middleware
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'An unexpected server error occurred';

  console.error(`[Error] ${req.method} ${req.originalUrl} - Status: ${status}`);
  console.error(err.stack || err);

  return res.status(status).json({
    success: false,
    error: {
      message: message,
      status: status
    }
  });
}

export default errorHandler;
