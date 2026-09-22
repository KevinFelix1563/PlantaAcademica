const express = require('express');
const router = express.Router();
const healthController = require('./health.controller');

// GET /api/health
router.get('/', healthController.checkApiStatus);

// GET /api/health/db
router.get('/db', healthController.checkDbConnection);

module.exports = router;
