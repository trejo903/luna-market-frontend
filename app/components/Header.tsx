// app/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, User, Search } from "lucide-react";

export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const toggleUserMenu = () => setOpenUserMenu((prev) => !prev);
  const closeUserMenu = () => setOpenUserMenu(false);

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:py-4">
        {/* FILA SUPERIOR MOBILE: logo + iconos */}
        <div className="flex items-center justify-between md:hidden">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Luna-market
          </Link>

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

            {/* USER MENU MOBILE */}
            <div className="relative">
              <button
                type="button"
                aria-label="Cuenta"
                onClick={toggleUserMenu}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
              </button>

              {openUserMenu && (
                <div className="absolute right-0 mt-2 z-30 w-52 max-w-[230px] rounded-lg border bg-white shadow-lg text-sm text-gray-700">
                  <Link
                    href="/perfil"
                    onClick={closeUserMenu}
                    className="block px-4 py-2.5 hover:bg-gray-100"
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href="/pedidos"
                    onClick={closeUserMenu}
                    className="block px-4 py-2.5 hover:bg-gray-100"
                  >
                    Mis pedidos
                  </Link>
                  <button
                    type="button"
                    onClick={closeUserMenu}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 text-red-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FILA PRINCIPAL */}
        <div className="mt-2 flex items-center gap-3 md:mt-0 md:gap-4">
          {/* logo desktop */}
          <Link
            href="/"
            className="hidden md:block text-lg md:text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Luna-market
          </Link>

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

            {/* USER MENU DESKTOP */}
            <div className="relative">
              <button
                type="button"
                aria-label="Cuenta"
                onClick={toggleUserMenu}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
              </button>

              {openUserMenu && (
                <div className="absolute right-0 mt-2 z-30 w-44 rounded-lg border bg-white shadow-lg text-sm text-gray-700">
                  <div className="px-3 py-2 border-b text-xs text-gray-400">
                    Cuenta
                  </div>
                  <Link
                    href="/perfil"
                    onClick={closeUserMenu}
                    className="block px-3 py-2 hover:bg-gray-100"
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href="/pedidos"
                    onClick={closeUserMenu}
                    className="block px-3 py-2 hover:bg-gray-100"
                  >
                    Mis pedidos
                  </Link>
                  <button
                    type="button"
                    onClick={closeUserMenu}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
