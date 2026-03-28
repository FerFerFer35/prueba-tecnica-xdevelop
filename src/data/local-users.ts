export type LocalRole = 'admin' | 'user'

/**
 * Array de usuarios locales predefinidos para propósitos de demostración y prueba.
 * 
 * Contiene credenciales de inicio de sesión con diferentes roles de acceso:
 * - **admin@demo.com**: Cuenta administrador con permisos completos
 * - **user@demo.com**: Cuenta de usuario estándar con permisos limitados
 * 
 * @remarks
 * Este array es utilizado para autenticación local en el entorno de desarrollo.
 * No debe utilizarse en producción.
 * 
 * @type {Array<{ email: string; password: string; role: LocalRole }>}
 * 
 * @example
 * ```typescript
 * const adminUser = LOCAL_USERS.find(u => u.email === 'admin@demo.com');
 * console.log(adminUser.role); // 'admin'
 * ```
 */

export const LOCAL_USERS: Array<{ email: string; password: string; role: LocalRole }> = [
    { email: 'admin@demo.com', password: 'admin123', role: 'admin' },
    { email: 'user@demo.com', password: 'user123', role: 'user' },
]