// app/not-found.tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg font-semibold mt-2">
          Esta página no pudo ser encontrada
        </p>
        <p className="text-sm text-gray-300">
          Puede que el enlace esté roto o que la página haya sido movida.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-200 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
