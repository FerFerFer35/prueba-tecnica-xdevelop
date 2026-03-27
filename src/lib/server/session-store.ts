type Role = 'admin' | 'user';

type Session = {
    user: { email: string; role: Role };
    refreshToken: string;
    refreshExpiresAt: number; // epoch ms
};

const sessionsByRefreshToken = new Map<string, Session>();

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