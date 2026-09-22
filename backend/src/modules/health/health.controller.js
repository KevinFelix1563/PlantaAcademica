const healthService = require('./health.service');
const ApiResponse = require('../../utils/apiResponse');

async function getHealth(req, res, next) {
  try {
    const dbStatus = await healthService.checkDatabase();
    return ApiResponse.success(res, {
      uptime: process.uptime(),
      timestamp: Date.now(),
      checks: dbStatus
    }, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHealth
};
