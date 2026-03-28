export type Role = 'admin' | 'user'

/**
 * Representa un usuario en el sistema de autenticación.
 * 
 * @typedef {Object} User
 * @property {number} [id] - Identificador único del usuario (opcional)
 * @property {string} [email] - Dirección de correo electrónico del usuario (opcional)
 */

export type User = {
    id?: number
    email?: string
}