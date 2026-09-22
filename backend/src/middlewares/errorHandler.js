const ApiResponse = require('../utils/apiResponse');
const env = require('../config/env');

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  const details = env.NODE_ENV === 'development' ? err.stack : undefined;

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  return ApiResponse.error(res, message, statusCode, details);
}

module.exports = errorHandler;
