import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12">
        <div className="w-full">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Prueba técnica • Next.js App Router
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Users, Posts & Auth
              </h1>

              <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
                Proyecto con autenticación por cookies, API interna en <span className="font-mono text-xs">/api</span>,{' '}
                Users (ReqRes) y Posts/Comments (JSONPlaceholder).
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Ir al Dashboard
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Login
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Auth
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-900">
                    Login / Logout / Me
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    Sesión via cookies y rutas protegidas.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Users
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-900">
                    ReqRes + tabla
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    Paginación real, filtros y acciones simuladas.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Posts
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-900">
                    JSONPlaceholder
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    Listado paginado (simulado) + comments por post.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-zinc-50 p-6">
              <div className="text-sm font-semibold text-zinc-900">Rutas rápidas</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/users"
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
                >
                  /users
                </Link>
                <Link
                  href="/posts"
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
                >
                  /posts
                </Link>
                <Link
                  href="/posts/1"
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
                >
                  /posts/1
                </Link>
                <Link
                  href="/api/posts?page=1&limit=10"
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
                >
                  /api/posts?page=1&limit=10
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-500">
            Hecho con Next.js • TanStack Query • TailwindCSS
          </p>
        </div>
      </div>
    </main>
  )
}