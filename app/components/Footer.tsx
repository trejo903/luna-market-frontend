// app/components/Footer.tsx
import { Facebook, Instagram, Music2 } from "lucide-react";

export default function Footer() {
  return (
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
  );
}
