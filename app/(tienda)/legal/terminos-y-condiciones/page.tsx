// app/legal/terminos-y-condiciones/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones | Luna-market",
};

export default function TerminosCondicionesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Términos y condiciones
      </h1>

      <p className="text-sm text-gray-600">
        Estos términos son un ejemplo general. Personalízalos y valídalos con un
        profesional legal para que se ajusten a tu negocio.
      </p>

      <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-base font-semibold text-gray-900">
          1. Uso del sitio
        </h2>
        <p>
          Al acceder y utilizar <span className="font-medium">Luna-market</span>
          , aceptas estos términos y condiciones. Si no estás de acuerdo, te
          pedimos no utilizar el sitio.
        </p>

        <h2 className="text-base font-semibold text-gray-900">
          2. Precios y pagos
        </h2>
        <p>
          Todos los precios están expresados en pesos mexicanos (MXN) e incluyen
          los impuestos aplicables salvo que se indique lo contrario. Nos
          reservamos el derecho de actualizar precios en cualquier momento.
        </p>

        <h2 className="text-base font-semibold text-gray-900">
          3. Envíos y entregas
        </h2>
        <p>
          Los tiempos de entrega son estimados y pueden variar por causas
          ajenas a Luna-market. Haremos nuestro mejor esfuerzo para que recibas
          tus productos en el plazo informado al momento de la compra.
        </p>

        <h2 className="text-base font-semibold text-gray-900">
          4. Cambios y devoluciones
        </h2>
        <p>
          Para solicitar un cambio o devolución, deberás contactarnos dentro del
          plazo indicado en la sección de ayuda del sitio, proporcionando tu
          número de pedido y evidencia del estado del producto.
        </p>

        <h2 className="text-base font-semibold text-gray-900">
          5. Cuenta de usuario
        </h2>
        <p>
          Eres responsable de mantener la confidencialidad de tu cuenta y
          contraseña, así como de todas las actividades realizadas desde tu
          cuenta.
        </p>

        <h2 className="text-base font-semibold text-gray-900">
          6. Modificaciones a los términos
        </h2>
        <p>
          Luna-market puede modificar estos términos en cualquier momento. Las
          versiones actualizadas se publicarán en este sitio y entrarán en
          vigor desde su publicación.
        </p>
      </section>
    </main>
  );
}
