// app/categorias/page.tsx

type Categoria = {
  id: number;
  nombre: string;
  img: string;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
};

// idealmente pon esto en un .env:
// NEXT_PUBLIC_API_URL=http://localhost:3500/api
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3500/api";

export default async function CategoriasPage() {
  // petición al backend
  const res = await fetch(`${API_URL}/categorias`, {
    // si quieres que siempre esté fresco en el frontend:
    cache: "no-store",
  });

  if (!res.ok) {
    // aquí puedes redirigir a error page o mostrar un mensaje bonito
    throw new Error("No se pudieron cargar las categorías");
  }

  const categorias: Categoria[] = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Categorías
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explora las categorías disponibles en Luna-market.
        </p>
      </div>

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <article
            key={cat.id}
            className="rounded-xl border bg-white shadow-sm overflow-hidden flex flex-col"
          >
            <div className="aspect-4/3 overflow-hidden bg-gray-100">
              {/* eslint desactivado si no usas next/image, o cambia por <Image /> */}
              <img
                src={cat.img}
                alt={cat.nombre}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                  {cat.nombre}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  ID: {cat.id} ·{" "}
                  {cat.activa ? "Categoría activa" : "Categoría inactiva"}
                </p>
              </div>

              <p className="mt-2 text-[11px] text-gray-400">
                Creada: {new Date(cat.createdAt).toLocaleDateString()} ·
                &nbsp;Actualizada:{" "}
                {new Date(cat.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
