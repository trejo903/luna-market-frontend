// app/categorias/CategoriasClient.tsx
"use client";

import { useState } from "react";

type Categoria = {
  id: number;
  nombre: string;
  img: string | null;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3500/api";

type Props = {
  initialCategorias: Categoria[];
};

export default function CategoriasClient({ initialCategorias }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
  const [nombre, setNombre] = useState("");
  const [activa, setActiva] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetForm = () => {
    setNombre("");
    setActiva(true);
    setFile(null);
    setEditingId(null);
    setErrorMsg(null);
  };

  const closeModal = () => {
    if (loading) return;
    resetForm();
    setIsModalOpen(false);
  };

  const reloadCategorias = async () => {
    const res = await fetch(`${API_URL}/categorias`, { cache: "no-store" });
    if (res.ok) {
      const data: Categoria[] = await res.json();
      setCategorias(data);
    }
  };

  const openForCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openForEdit = (cat: Categoria) => {
    setEditingId(cat.id);
    setNombre(cat.nombre);
    setActiva(cat.activa);
    setFile(null);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  // Crear / actualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("activa", String(activa));
      if (file) {
        formData.append("img", file);
      }

      const isEdit = editingId !== null;

      const res = await fetch(
        isEdit ? `${API_URL}/categorias/${editingId}` : `${API_URL}/categorias`,
        {
          method: isEdit ? "PATCH" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al guardar la categoría");
      }

      await reloadCategorias();
      closeModal();
    } catch (err: any) {
      setErrorMsg(err.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_URL}/categorias/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al eliminar la categoría");
      }

      setCategorias((prev) => prev.filter((c) => c.id !== id));
      if (editingId === id) {
        closeModal();
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra superior con botón */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">
          Listado de categorías
        </h2>
        <button
          type="button"
          onClick={openForCreate}
          className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-black"
        >
          + Nueva categoría
        </button>
      </div>

      {/* TABLA DE CATEGORÍAS */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Imagen</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Creada</th>
              <th className="px-4 py-3 text-left">Actualizada</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                {/* Imagen */}
                <td className="px-4 py-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {cat.img ? (
                      <img
                        src={cat.img}
                        alt={cat.nombre}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </td>

                {/* Nombre */}
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 text-sm">
                    {cat.nombre}
                  </p>
                </td>

                {/* Estado */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      cat.activa
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {cat.activa ? "Activa" : "Inactiva"}
                  </span>
                </td>

                {/* Fechas */}
                <td className="px-4 py-3 text-gray-500">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(cat.updatedAt).toLocaleDateString()}
                </td>

                {/* Acciones */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openForEdit(cat)}
                      className="rounded-full border px-3 py-1 text-[11px] text-gray-700 hover:bg-gray-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.id)}
                      className="rounded-full border border-red-200 px-3 py-1 text-[11px] text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {categorias.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-xs text-gray-500"
                >
                  Aún no hay categorías creadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()} // para que no cierre al hacer click dentro
          >
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {editingId ? "Editar categoría" : "Nueva categoría"}
            </h3>

            {errorMsg && (
              <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {errorMsg}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Estado
                </label>
                <select
                  value={activa ? "true" : "false"}
                  onChange={(e) => setActiva(e.target.value === "true")}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="true">Activa</option>
                  <option value="false">Inactiva</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Imagen (opcional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-xs text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-800 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-gray-900"
                />
                <p className="text-[11px] text-gray-400">
                  Máx. 5MB. Si estás editando y no eliges archivo, se conserva la
                  imagen actual.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-black disabled:opacity-60"
                >
                  {editingId
                    ? loading
                      ? "Guardando..."
                      : "Guardar cambios"
                    : loading
                    ? "Creando..."
                    : "Crear categoría"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
