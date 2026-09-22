const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const globalLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const healthRoutes = require('./modules/health/health.routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(globalLimiter);

// Rutas base
app.use('/api/health', healthRoutes);

// Manejador centralizado de errores
app.use(errorHandler);

module.exports = app;
