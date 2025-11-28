"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    // 👉 ocupa toda la pantalla y evita que el body sea el que haga scroll
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* HEADER SUPERIOR (queda fijo porque lo de abajo es lo que scrolla) */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Luna-market</span>
          <span className="text-xs text-gray-500 border px-2 py-0.5 rounded-full">
            Panel admin
          </span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {/* Botón para móvil */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>

          {/* Avatar / usuario */}
          <span className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
            DT
          </span>
        </div>
      </header>

      {/* OVERLAY para móvil */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* SIDEBAR MÓVIL (drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r px-4 py-6 md:hidden transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onLinkClick={closeMenu} />
      </aside>

      {/* 👉 zona central: sidebar + contenido, con scroll interno */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR DESKTOP (scroll propio si es necesario) */}
        <aside className="hidden md:flex md:w-64 flex-col border-r bg-white px-4 py-6 overflow-y-auto">
          <SidebarContent />
        </aside>

        {/* CONTENIDO (scroll principal) */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* FOOTER fijo abajo, fuera del scroll del main */}
      <footer className="border-t bg-white h-12 flex items-center justify-center text-xs text-gray-500">
        © {new Date().getFullYear()} Luna-market
      </footer>
    </div>
  );
}

/* ───────── Sidebar ───────── */

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void } = {}) {
  return (
    <nav className="space-y-1 text-sm">
      {/* GENERAL */}
      <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
        General
      </p>
      <SidebarLink href="/admin" onClick={onLinkClick}>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/admin/productos" onClick={onLinkClick}>
        Productos
      </SidebarLink>
      <SidebarLink href="/admin/categorias" onClick={onLinkClick}>
        Categorías
      </SidebarLink>
      <SidebarLink href="/admin/pedidos" onClick={onLinkClick}>
        Pedidos
      </SidebarLink>

      {/* FINANZAS */}
      <p className="mt-4 mb-2 text-xs font-semibold uppercase text-gray-400">
        Finanzas
      </p>
      <SidebarLink href="/admin/finanzas" onClick={onLinkClick}>
        Resumen financiero
      </SidebarLink>
      <SidebarLink href="/admin/impuestos" onClick={onLinkClick}>
        Impuestos
      </SidebarLink>
      <SidebarLink href="/admin/nomina" onClick={onLinkClick}>
        Nómina
      </SidebarLink>
      <SidebarLink href="/admin/imss-infonavit" onClick={onLinkClick}>
        IMSS e Infonavit
      </SidebarLink>
      <SidebarLink href="/admin/reportes" onClick={onLinkClick}>
        Reportes
      </SidebarLink>

      {/* CONFIGURACIÓN */}
      <p className="mt-4 mb-2 text-xs font-semibold uppercase text-gray-400">
        Configuración
      </p>
      <SidebarLink href="/admin/usuarios" onClick={onLinkClick}>
        Usuarios
      </SidebarLink>
      <SidebarLink href="/admin/ajustes" onClick={onLinkClick}>
        Ajustes
      </SidebarLink>
    </nav>
  );
}

type SidebarLinkProps = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

function SidebarLink({ href, children, onClick }: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/admin"
      ? pathname === "/admin" // solo exacto para el dashboard
      : pathname === href || pathname.startsWith(href + "/");

  const base =
    "flex items-center rounded-md px-2 py-2 text-sm transition-colors";
  const inactive = "text-gray-700 hover:bg-gray-100";
  const active = "bg-gray-900 text-white";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${isActive ? active : inactive}`}
    >
      {children}
    </Link>
  );
}
