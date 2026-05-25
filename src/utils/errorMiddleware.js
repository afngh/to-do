/**
 * Global Error Handling Middleware
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'An unexpected server error occurred';

  // Log error locally for maintenance and debugging
  console.error(`[Error] ${req.method} ${req.originalUrl} - Status: ${status}`);
  console.error(err.stack || err);

  // Return standardized structured JSON error response
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      status: status
    }
  });
}

module.exports = errorHandler;
