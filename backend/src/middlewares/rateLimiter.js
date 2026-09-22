const rateLimit = require('express-rate-limit');
const ApiResponse = require('../utils/apiResponse');

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ApiResponse.error(res, 'Demasiadas peticiones. Intenta de nuevo más tarde.', 429);
  }
});

module.exports = globalLimiter;
