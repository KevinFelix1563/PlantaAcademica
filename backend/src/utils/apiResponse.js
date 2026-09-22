class ApiResponse {
  static success(res, data = {}, statusCode = 200, meta = {}) {
    return res.status(statusCode).json({
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    });
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, details = null) {
    const payload = {
      success: false,
      error: {
        code: statusCode,
        message
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };

    if (details) {
      payload.error.details = details;
    }

    return res.status(statusCode).json(payload);
  }
}

module.exports = ApiResponse;
