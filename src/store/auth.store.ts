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

/**
 * Store de autenticación utilizando Zustand.
 * 
 * Gestiona el estado global de autenticación de la aplicación, incluyendo
 * información del usuario, rol y estado de autenticación.
 * 
 * @returns {AuthState} Objeto con el estado y acciones de autenticación
 * 
 * @example
 * ```typescript
 * const { user, isAuthenticated, setUser, logout } = useAuthStore();
 * ```
 * 
 * @property {User | null} user - Usuario autenticado o null si no está autenticado
 * @property {string} role - Rol del usuario actual (por defecto: 'user')
 * @property {boolean} isAuthenticated - Indicador de si el usuario está autenticado
 * 
 * @method setUser Establece el usuario y marca como autenticado
 * @param {User} user - Datos del usuario a establecer
 * 
 * @method setRole Establece el rol del usuario
 * @param {string} role - Nuevo rol del usuario
 * 
 * @method logout Limpia el estado, cerrando la sesión del usuario
 */

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