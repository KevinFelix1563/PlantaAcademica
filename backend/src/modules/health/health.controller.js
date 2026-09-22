const { pool } = require('../../config/db');

// Health check básico de la API
const checkApiStatus = (req, res) => {
    res.status(200).json({ status: 'success', message: 'API funcionando correctamente' });
};

// Health check de la base de datos (Endpoint de prueba)
const checkDbConnection = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        
        // Ejecutar consultas de prueba
        // Se corrige la desestructuración, ya que el driver mariadb devuelve un array de filas directamente.
        const versionRows = await connection.query('SELECT VERSION() AS version');
        const tenantRows = await connection.query('SELECT COUNT(*) AS total_tenants FROM Tenants');
        
        connection.release();

        res.status(200).json({
            status: 'success',
            message: 'Conexión a MariaDB exitosa',
            data: {
                db_version: versionRows[0].version,
                total_tenants: Number(tenantRows[0].total_tenants)
            }
        });
    } catch (error) {
        console.error('❌ Error en el health check de BD:', error);
        res.status(503).json({
            status: 'error',
            message: 'Servicio de base de datos no disponible',
            error: error.message
        });
    }
};

module.exports = {
    checkApiStatus,
    checkDbConnection
};
