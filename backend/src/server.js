const app = require('./app');
const env = require('./config/env');
const { pool } = require('./config/db');

const server = app.listen(env.PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${env.PORT} en modo [${env.NODE_ENV}]`);
});

// Manejo de apagado elegante (Graceful Shutdown)
function gracefulShutdown(signal) {
  console.log(`\nRecibida señal ${signal}. Cerrando servidor HTTP y conexiones...`);
  server.close(async () => {
    console.log('Servidor HTTP cerrado.');
    try {
      await pool.end();
      console.log('Pool de MariaDB cerrado correctamente.');
      process.exit(0);
    } catch (err) {
      console.error('Error cerrando el pool de MariaDB:', err.message);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('Forzando salida por timeout de cierre.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
