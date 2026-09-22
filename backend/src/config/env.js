const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  DB: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gestor_academico',
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 20,
    acquireTimeout: 10000,
    idleTimeout: 30000
  },
  JWT: {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  },
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};
