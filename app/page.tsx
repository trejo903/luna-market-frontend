// app/page.tsx
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  User,
  Facebook,
  Instagram,
  Music2,
    Search, 
} from "lucide-react";

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
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* NAVBAR */}
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

          {/* FILA PRINCIPAL: 
              - en mobile: solo buscador (debajo de la fila anterior)
              - en desktop: logo | buscador | iconos */}
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
    <Search
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
    />
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

      {/* CONTENIDO */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-10">
       {/* BANNER PROMO */}
<section>
  <div className="relative overflow-hidden rounded-3xl shadow-sm">
    <div className="relative w-full aspect-[16/5] overflow-hidden">
      <Image
        src="/banner2.png"
        alt="15% de descuento en todos los productos"
        fill
        priority
        className="object-cover object-center transform scale-110" 
        // 👆 hacemos zoom para que desaparezca el marco blanco del PNG
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
        <div
          key={cat.id}
          className="flex flex-col items-center min-w-[140px]"
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
        </div>
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
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t bg-[#f0f0f0]">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Marca */}
            <div className="space-y-3 md:max-w-xs">
              <p className="text-base font-semibold text-gray-900">
                Luna-market
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Moda cómoda y accesible para tu día a día. Encuentra camisetas,
                tenis y más en un solo lugar.
              </p>
            </div>

            {/* Enlaces */}
            <div className="grid grid-cols-2 gap-8 text-xs md:text-sm text-gray-700">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Ayuda</p>
                <button className="block hover:text-gray-900">
                  Preguntas frecuentes
                </button>
                <button className="block hover:text-gray-900">
                  Cambios y devoluciones
                </button>
                <button className="block hover:text-gray-900">
                  Estado de mi pedido
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Contacto</p>
                <p className="text-gray-600">contacto@luna-market.com</p>
                <p className="text-gray-600">Durango, México</p>
                <button className="block hover:text-gray-900">
                  Formulario de contacto
                </button>
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <p className="font-semibold text-gray-900">Legal</p>
                <button className="block hover:text-gray-900">
                  Aviso de privacidad
                </button>
                <button className="block hover:text-gray-900">
                  Términos y condiciones
                </button>
              </div>
            </div>

            {/* Redes */}
            <div className="space-y-3">
              <p className="text-xs md:text-sm font-semibold text-gray-900">
                Síguenos
              </p>
              <div className="flex items-center gap-3 text-gray-800">
                <button
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  aria-label="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <Music2 className="h-4 w-4" />
                </button>
                <button
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <Instagram className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Línea inferior */}
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-gray-300 pt-4 text-[11px] text-gray-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} Luna-market. Todos los derechos
              reservados.
            </p>
            <p className="text-[10px]">
              Diseñado por Luna-market · Hecho en México 🇲🇽
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
