import * as React from 'react'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-zinc-50">
            <div className="mx-auto flex min-h-screen items-center justify-center px-4">
                <React.Suspense fallback={null}>
                    <LoginForm />
                </React.Suspense>
            </div>
        </main>
    )
}