const mariadb = require('mariadb');
const env = require('./env');

const pool = mariadb.createPool({
  host: env.DB.host,
  port: env.DB.port,
  user: env.DB.user,
  password: env.DB.password,
  database: env.DB.database,
  connectionLimit: env.DB.connectionLimit,
  acquireTimeout: env.DB.acquireTimeout,
  idleTimeout: env.DB.idleTimeout,
  charset: 'utf8mb4'
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('SELECT 1 as test');
    return true;
  } catch (error) {
    console.error('Error al conectar a MariaDB:', error.message);
    throw error;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  pool,
  testConnection
};
