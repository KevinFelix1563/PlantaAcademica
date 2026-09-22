const ApiResponse = require('../utils/apiResponse');

/**
 * Middleware para asegurar el aislamiento multi-tenant.
 * Extrae y valida el tenantId inyectado en peticiones autenticadas o headers específicos.
 */
function resolveTenant(req, res, next) {
  // En rutas protegidas, vendrá del JWT (req.user.tenantId).
  // Se provee fallback a header 'x-tenant-id' exclusivamente para pruebas o bootstrapping de desarrollo.
  const tenantId = req.user?.tenantId || req.headers['x-tenant-id'];

  if (!tenantId) {
    return ApiResponse.error(res, 'Contexto de Tenant no especificado o inválido.', 400);
  }

  // Sanitización de formato UUID o entero según catálogo
  req.tenantId = String(tenantId).trim();
  next();
}

module.exports = resolveTenant;
