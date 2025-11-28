"use client";

import { FormEvent, useEffect, useState } from "react";

/* ───── Tipos ───── */

type Categoria = {
  id: number;
  nombre: string;
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
  precio: string | number;
  categoria?: Categoria;
  imagenes?: ImagenProducto[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3500/api";

/* ───── Página principal ───── */

export default function ProductosAdminPage() {
  /* CATEGORÍAS */
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [catError, setCatError] = useState<string | null>(null);

  /* LISTA DE PRODUCTOS */
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [productosError, setProductosError] = useState<string | null>(null);

  /* MODALES */
  const [modalAbierto, setModalAbierto] = useState(false);           // formulario
  const [modalResumenAbierto, setModalResumenAbierto] = useState(false); // resumen SKU

  /* FORMULARIO */
  const [nombre, setNombre] = useState("");
  const [sku, setSku] = useState(""); // aquí guardamos el SKU generado para mostrar en el resumen
  const [cantidad, setCantidad] = useState<number | "">("");
  const [precio, setPrecio] = useState<string>("");
  const [categoriaId, setCategoriaId] = useState("");

  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* PRODUCTO CREADO PARA RESUMEN */
  const [productoCreado, setProductoCreado] = useState<Producto | null>(null);

  /* ───── Helpers ───── */

  // cargar productos
  async function loadProductos() {
    try {
      setLoadingProductos(true);
      setProductosError(null);
      const res = await fetch(`${API_URL}/productos`, { cache: "no-store" });
      if (!res.ok) throw new Error("Error al cargar productos");
      const data: Producto[] = await res.json();
      setProductos(data);
    } catch (err: any) {
      setProductosError(
        err.message ?? "No se pudieron cargar los productos",
      );
    } finally {
      setLoadingProductos(false);
    }
  }

  // cargar categorías
  async function loadCategorias() {
    try {
      setLoadingCats(true);
      const res = await fetch(`${API_URL}/categorias`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Error al cargar categorías");
      const data: Categoria[] = await res.json();
      setCategorias(data);
      if (data.length > 0) setCategoriaId(String(data[0].id));
    } catch (err: any) {
      setCatError(err.message ?? "No se pudieron cargar las categorías");
    } finally {
      setLoadingCats(false);
    }
  }

  // resetear formulario (NO tocamos el SKU porque lo usamos en el resumen)
  const resetForm = () => {
    setNombre("");
    setCantidad("");
    setPrecio("");
    if (categorias.length > 0) setCategoriaId(String(categorias[0].id));
    setImagenes(null);
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const abrirModal = () => {
    // empezamos con formulario limpio y sin SKU
    setSku("");
    resetForm();
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    resetForm();
    setSku("");
    setModalAbierto(false);
  };

  const cerrarModalResumen = () => {
    setModalResumenAbierto(false);
    setProductoCreado(null);
    setSku("");
  };

  /* ───── Effects iniciales ───── */

  useEffect(() => {
    loadCategorias();
    loadProductos();
  }, []);

  /* ───── MANEJO DE IMÁGENES ───── */
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImagenes(files);

    // limpiar previews anteriores
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewUrls(urls);
    } else {
      setPreviewUrls([]);
    }
  };

  /* ───── SUBMIT DEL FORM ───── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validaciones básicas
    if (!nombre.trim()) {
      setErrorMsg("El nombre es obligatorio.");
      return;
    }
    if (
      cantidad === "" ||
      Number.isNaN(Number(cantidad)) ||
      Number(cantidad) < 0
    ) {
      setErrorMsg("La cantidad debe ser un número mayor o igual a 0.");
      return;
    }
    if (!precio || Number(precio) <= 0) {
      setErrorMsg("El precio debe ser mayor a 0.");
      return;
    }
    if (!categoriaId) {
      setErrorMsg("Selecciona una categoría.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("nombre", nombre.trim());
      // NO se envía sku, lo crea el backend
      formData.append("cantidad", String(cantidad || 0));
      formData.append("precio", String(precio));
      formData.append("categoriaId", categoriaId);

      if (imagenes) {
        Array.from(imagenes).forEach((file) =>
          formData.append("imagenes", file),
        );
      }

      const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = "Error al crear el producto.";
        try {
          const data = await res.json();
          if (data?.message) {
            msg = Array.isArray(data.message)
              ? data.message.join(", ")
              : data.message;
          }
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      // 👉 esperamos { msg, sku, producto }
      const data = await res.json();

      const skuGenerado =
        data.sku ?? data.producto?.sku ?? "";

      if (skuGenerado) {
        setSku(skuGenerado);
      }

      setProductoCreado(data.producto ?? null);

      // recargar lista para ver el nuevo producto
      await loadProductos();

      // cerrar modal de creación y abrir modal de resumen
      resetForm();         // limpia inputs
      setModalAbierto(false);
      setModalResumenAbierto(true);
    } catch (err: any) {
      setErrorMsg(err.message ?? "Ocurrió un error al crear el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ───── UI ───── */

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Encabezado + botón nuevo producto */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Productos
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Administra el catálogo de productos de Luna-market.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirModal}
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          + Nuevo producto
        </button>
      </div>

      {/* Lista de productos */}
      <div className="rounded-xl border bg-white shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Catálogo actual
        </h2>

        {loadingProductos && (
          <p className="text-xs text-gray-500">Cargando productos…</p>
        )}

        {productosError && (
          <p className="text-xs text-red-600">{productosError}</p>
        )}

        {!loadingProductos && !productosError && productos.length === 0 && (
          <p className="text-xs text-gray-500">
            Aún no tienes productos. Crea el primero con el botón
            &quot;Nuevo producto&quot;.
          </p>
        )}

        {!loadingProductos && !productosError && productos.length > 0 && (
          <div className="overflow-x-auto text-xs md:text-sm">
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-[11px] md:text-xs text-gray-500 uppercase">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Producto</th>
                  <th className="px-3 py-2">SKU</th>
                  <th className="px-3 py-2">Categoría</th>
                  <th className="px-3 py-2">Cantidad</th>
                  <th className="px-3 py-2">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {productos.map((p) => {
                  const thumb = p.imagenes?.[0]?.url;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-[11px] md:text-xs font-mono text-gray-600">
                        {p.id}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 overflow-hidden shrink-0">
                            {thumb ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={thumb}
                                alt={p.nombre}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[9px] text-gray-400">
                                Sin imagen
                              </div>
                            )}
                          </div>
                          <span className="text-gray-800">{p.nombre}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-mono text-gray-700">
                        {p.sku}
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {p.categoria?.nombre ?? "—"}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {p.cantidad}
                      </td>
                      <td className="px-3 py-2 text-gray-800 font-medium">
                        $
                        {Number(p.precio).toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL CREACIÓN */}
      {modalAbierto && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm md:text-base font-semibold text-gray-800">
                Crear producto
              </h2>
              <button
                type="button"
                onClick={cerrarModal}
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                Cerrar
              </button>
            </div>

            {/* Mensajes dentro del modal */}
            {errorMsg && (
              <div className="mb-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-800">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Nombre */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  maxLength={150}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/60"
                  placeholder="Camiseta básica blanca"
                />
                <p className="text-[11px] text-gray-400">
                  Máx. 150 caracteres.
                </p>
              </div>

              {/* Cantidad */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Cantidad inicial
                </label>
                <input
                  type="number"
                  min={0}
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value),
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/60"
                  placeholder="0"
                />
                <p className="text-[11px] text-gray-400">
                  Si lo dejas en blanco se tomará como 0.
                </p>
              </div>

              {/* Precio y Categoría */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Precio
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/60"
                    placeholder="299.90"
                  />
                  <p className="text-[11px] text-gray-400">
                    Se guarda con hasta 2 decimales.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Categoría
                  </label>
                  <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/60 bg-white"
                    disabled={loadingCats || !!catError}
                  >
                    {loadingCats && (
                      <option>Cargando categorías…</option>
                    )}
                    {catError && <option>{catError}</option>}
                    {!loadingCats &&
                      !catError &&
                      categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                  </select>
                  <p className="text-[11px] text-gray-400">
                    Debe existir previamente en tu backend.
                  </p>
                </div>
              </div>

              {/* Imágenes */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Imágenes (opcional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="block w-full text-xs text-gray-500 file:mr-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-50"
                />
                <p className="text-[11px] text-gray-400">
                  Máximo 5 imágenes, 5 MB cada una. La primera se marcará como
                  principal.
                </p>

                {previewUrls.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {previewUrls.map((url, idx) => (
                      <div
                        key={url}
                        className="h-20 w-20 overflow-hidden rounded-md border border-gray-200 bg-gray-50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`preview-${idx}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Guardando..." : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RESUMEN SKU */}
      {modalResumenAbierto && productoCreado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold text-gray-800">
                Producto creado
              </h2>
              <button
                type="button"
                onClick={cerrarModalResumen}
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                Cerrar
              </button>
            </div>

            <div className="text-center space-y-1">
              <p className="text-[11px] uppercase tracking-wide text-gray-500">
                SKU asignado
              </p>
              <p className="text-2xl md:text-3xl font-mono font-semibold text-gray-900">
                {sku || productoCreado.sku}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium text-gray-700">Nombre: </span>
                <span className="text-gray-800">{productoCreado.nombre}</span>
              </p>
            
              <p>
                <span className="font-medium text-gray-700">Precio: </span>
                <span className="text-gray-800">
                  $
                  {Number(productoCreado.precio).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Cantidad: </span>
                <span className="text-gray-800">
                  {productoCreado.cantidad}
                </span>
              </p>
            </div>

            {productoCreado.imagenes?.[0]?.url && (
              <div className="pt-2">
                <p className="text-[11px] text-gray-500 mb-1">
                  Imagen principal:
                </p>
                <div className="h-32 w-full rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productoCreado.imagenes[0].url}
                    alt={productoCreado.nombre}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={cerrarModalResumen}
                className="rounded-md bg-gray-900 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-black"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
