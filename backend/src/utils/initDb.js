const fs = require('fs');
const path = require('path');
const mariadb = require('mariadb');
const env = require('../config/env');

async function initializeDatabase() {
    let connection;
    try {
        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');
        
        // Separar las consultas por punto y coma
        const queries = sql.split(';').filter(q => q.trim().length > 0);
        
        // Conectar sin especificar la base de datos
        connection = await mariadb.createConnection({
            host: env.DB.host,
            port: env.DB.port,
            user: env.DB.user,
            password: env.DB.password
        });
        
        console.log('Conexión establecida. Ejecutando schema.sql...');
        
        for (const query of queries) {
            await connection.query(query);
        }
        
        console.log('✅ Esquema base desplegado exitosamente.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        process.exit(1);
    } finally {
        if (connection) connection.end();
    }
}

initializeDatabase();
