export type LocalRole = 'admin' | 'user'

export const LOCAL_USERS: Array<{ email: string; password: string; role: LocalRole }> = [
    { email: 'admin@demo.com', password: 'admin123', role: 'admin' },
    { email: 'user@demo.com', password: 'user123', role: 'user' },
]