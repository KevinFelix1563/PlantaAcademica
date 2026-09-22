const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function initializeDatabase() {
    try {
        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');
        
        // Separar las consultas por punto y coma
        const queries = sql.split(';').filter(q => q.trim().length > 0);
        
        const connection = await pool.getConnection();
        console.log('Conexión establecida. Ejecutando schema.sql...');
        
        for (const query of queries) {
            await connection.query(query);
        }
        
        connection.release();
        console.log('✅ Esquema base desplegado exitosamente.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        process.exit(1);
    }
}

initializeDatabase();
