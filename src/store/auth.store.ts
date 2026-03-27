import { create } from "zustand";

type Role = 'admin' | 'user'

type AuthState = {
    user: any | null
    role: Role
    isAuthenticated: boolean

    setUser: (user: any) => void
    setRole: (role: Role) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    role: 'user',
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    setRole: (role) => set({ role }),
    logout: () =>
        set({
            user: null,
            role: 'user',
            isAuthenticated: false,
        }),
}))