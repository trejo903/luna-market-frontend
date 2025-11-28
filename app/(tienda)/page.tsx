// app/page.tsx   (o app/(tienda)/page.tsx si usas route group)
import Image from "next/image";
import Link from "next/link";


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

// 👉 server component
export default async function Home() {
  let categorias: Categoria[] = [];
  let productos: Producto[] = [];

  try {
    const [catsRes, prodsRes] = await Promise.all([
      fetch(`${API_URL}/categorias`, { cache: "no-store" }),
      fetch(`${API_URL}/productos`, { cache: "no-store" }),
    ]);

    if (catsRes.ok) categorias = await catsRes.json();
    if (prodsRes.ok) productos = await prodsRes.json();
  } catch {
    // arrays vacíos si falla algo
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-10">
      {/* BANNER PROMO */}
      <section>
        <div className="relative overflow-hidden rounded-3xl shadow-sm">
          <div className="relative w-full aspect-16/5 overflow-hidden">
            <Image
              src="/banner2.png"
              alt="15% de descuento en todos los productos"
              fill
              priority
              className="object-cover object-center transform scale-110"
            />
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
<section className="space-y-4">
  <h3 className="text-center text-base md:text-lg font-semibold text-gray-900">
    Categorías
  </h3>

  {categorias.length === 0 ? (
    <p className="text-center text-xs text-gray-500">
      Aún no hay categorías disponibles.
    </p>
  ) : (
    <div className="flex gap-10 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent justify-center">
      {categorias.map((cat) => (
        <Link
          key={cat.id}
          href={`/categorias/${cat.id}`}        // 👈 ruta dinámica
          className="flex flex-col items-center min-w-[140px] hover:scale-105 transition-transform"
        >
          <div className="h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm">
            {cat.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cat.img}
                alt={cat.nombre}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                Sin imagen
              </div>
            )}
          </div>
          <span className="mt-3 text-sm md:text-base font-medium text-gray-700">
            {cat.nombre}
          </span>
        </Link>
      ))}
    </div>
  )}
</section>


      {/* PRODUCTOS */}
      <section className="space-y-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          Productos
        </h3>

        {productos.length === 0 ? (
          <p className="text-xs text-gray-500">
            Todavía no hay productos cargados.
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
                  {/* tarjeta imagen */}
                  <div className="mx-auto mb-4 h-64 w-full max-w-[260px] overflow-hidden rounded-4xl bg-gray-200">
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

                  {/* info */}
                  <div className="mx-auto w-full max-w-[260px] space-y-2">
                    {/* nombre + precio */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-gray-900">
                          {p.nombre}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {p.categoria?.nombre ?? ""}
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

                    {/* disponibles + cantidad */}
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>Disponibles</span>
                      <span className="text-gray-800 text-[11px]">
                        {p.cantidad}
                      </span>
                    </div>

                    {/* botón */}
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
