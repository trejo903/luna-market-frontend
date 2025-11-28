// app/(tienda)/categorias/[id]/page.tsx
import Image from "next/image";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3500/api";

type Categoria = {
  id: number;
  nombre: string;
  img?: string | null;
};

type ImagenProducto = {
  id: number;
  url: string;
  principal: boolean;
};

type Producto = {
  id: number;
  nombre: string;
  sku: string;
  cantidad: number;
  precio: number;
  categoria?: Categoria;
  imagenes?: ImagenProducto[];
};

type PageProps = {
  // 👇 En Next 16 params es una Promise
  params: Promise<{
    id: string;
  }>;
};

// 👉 server component (NO pongas "use client")
export default async function CategoriaPage({ params }: PageProps) {
  // Desempaquetar params:
  const { id } = await params; // ✅ aquí ya tienes el id = "9", "3", etc.

  if (!id) {
    throw new Error("No se recibió 'id' en los params de la ruta /categorias/[id]");
  }

  const [catRes, prodsRes] = await Promise.all([
    fetch(`${API_URL}/categorias/${id}`, { cache: "no-store" }),
    fetch(`${API_URL}/productos?categoriaId=${id}`, { cache: "no-store" }),
  ]);

  if (!catRes.ok) {
    throw new Error("Categoría no encontrada");
  }

  const categoria: Categoria = await catRes.json();
  const productos: Producto[] = prodsRes.ok ? await prodsRes.json() : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-8">
      {/* Banner de la categoría */}
      <section>
        <div className="relative overflow-hidden rounded-3xl shadow-sm">
          <div className="relative w-full aspect-[16/5] overflow-hidden">
            <Image
              src={categoria.img || "/banner2.png"}
              alt={categoria.nombre}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute left-6 bottom-6 text-white">
              <p className="text-xs uppercase tracking-wide opacity-80">
                Categoría
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {categoria.nombre}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="space-y-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 text-center">
          Productos
        </h2>

        {productos.length === 0 ? (
          <p className="text-xs text-gray-500 text-center">
            No hay productos en esta categoría todavía.
          </p>
        ) : (
          <div className="grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => {
              const thumb =
                p.imagenes?.find((img) => img.principal)?.url ??
                p.imagenes?.[0]?.url ??
                "";

              return (
                <article
                  key={p.id}
                  className="flex flex-col text-[11px] md:text-xs"
                >
                  <div className="mx-auto mb-4 h-64 w-full max-w-[260px] overflow-hidden rounded-[32px] bg-gray-200">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={p.nombre}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="mx-auto w-full max-w-[260px] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-gray-900">
                          {p.nombre}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {categoria.nombre}
                        </span>
                      </div>
                      <span className="text-[13px] font-medium text-gray-900">
                        $
                        {Number(p.precio).toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>Disponibles</span>
                      <span className="text-gray-800 text-[11px]">
                        {p.cantidad}
                      </span>
                    </div>

                    <div className="pt-1 flex justify-start">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-gray-800 px-5 py-1 text-[10px] font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
