type Role = 'admin' | 'user';

type Session = {
    user: { email: string; role: Role };
    refreshToken: string;
    refreshExpiresAt: number; // epoch ms
};

const sessionsByRefreshToken = new Map<string, Session>();

/**
 * Crea una nueva sesión de refresco para un usuario.
 * 
 * @param user - El objeto de usuario para el cual se creará la sesión de refresco.
 * @returns {Session} La sesión creada con el token de refresco y la fecha de expiración.
 * 
 * @example
 * ```typescript
 * const session = createRefreshSession(user);
 * ```
 * 
 * @remarks
 * - Genera un UUID aleatorio como token de refresco.
 * - La sesión expira después de 7 días (604,800,000 milisegundos).
 * - La sesión se almacena internamente en el mapa `sessionsByRefreshToken` para consultas posteriores.
 */

export function createRefreshSession(user: Session['user']) {
    const refreshToken = crypto.randomUUID();
    const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const session: Session = { user, refreshToken, refreshExpiresAt };
    sessionsByRefreshToken.set(refreshToken, session);
    return session;
}

export function getSessionByRefreshToken(refreshToken: string) {
    const session = sessionsByRefreshToken.get(refreshToken);
    if (!session) return null;
    if (Date.now() > session.refreshExpiresAt) {
        sessionsByRefreshToken.delete(refreshToken);
        return null;
    }
    return session;
}

export function revokeRefreshToken(refreshToken: string) {
    sessionsByRefreshToken.delete(refreshToken);
}