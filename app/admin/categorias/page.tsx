// app/categorias/page.tsx

import CategoriasClient from "./CategoriasClient";

type Categoria = {
  id: number;
  nombre: string;
  img: string | null;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3500/api";

export default async function CategoriasPage() {
  const res = await fetch(`${API_URL}/categorias`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las categorías");
  }

  const categorias: Categoria[] = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Categorías</h1>
        <p className="text-sm text-gray-500 mt-1">
          Administra las categorías de Luna-market: crea, edita y elimina.
        </p>
      </div>

      <CategoriasClient initialCategorias={categorias} />
    </div>
  );
}
