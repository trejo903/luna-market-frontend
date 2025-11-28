// app/components/Header.tsx
import { ShoppingCart, Heart, User, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:py-4">
        {/* FILA SUPERIOR MOBILE: logo + iconos */}
        <div className="flex items-center justify-between md:hidden">
          <span className="text-lg font-semibold text-gray-900">
            Luna-market
          </span>
          <div className="flex items-center gap-3 text-gray-700">
            <button
              aria-label="Carrito"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              aria-label="Favoritos"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              aria-label="Cuenta"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* FILA PRINCIPAL */}
        <div className="mt-2 flex items-center gap-3 md:mt-0 md:gap-4">
          {/* logo desktop */}
          <span className="hidden text-lg md:block md:text-xl font-semibold text-gray-900">
            Luna-market
          </span>

          {/* buscador */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos"
                className="w-full rounded-full bg-gray-100 px-4 py-2 text-xs md:text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* iconos desktop */}
          <div className="hidden md:flex items-center gap-3 text-gray-700">
            <button
              aria-label="Carrito"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              aria-label="Favoritos"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              aria-label="Cuenta"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
