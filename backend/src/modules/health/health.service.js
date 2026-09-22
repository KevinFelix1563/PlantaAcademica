const { testConnection } = require('../../config/db');

async function checkDatabase() {
  await testConnection();
  return { status: 'UP', database: 'MariaDB Connected' };
}

module.exports = {
  checkDatabase
};
