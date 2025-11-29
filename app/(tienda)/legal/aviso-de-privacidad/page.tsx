// app/legal/aviso-de-privacidad/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Luna-market",
};

export default function AvisoPrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Aviso de privacidad
      </h1>

      <p className="text-sm text-gray-600">
        Este documento es un ejemplo general y no constituye asesoría legal.
        Ajusta el contenido con un abogado para que cumpla con la normativa
        aplicable.
      </p>

      <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          En <span className="font-medium">Luna-market</span>, con domicilio en
          Durango, México, somos responsables del tratamiento de tus datos
          personales.
        </p>

        <p>
          Los datos que podemos recopilar incluyen, de manera enunciativa más no
          limitativa: nombre completo, correo electrónico, teléfono, domicilio
          de entrega y datos de pago. Estos datos se utilizarán para:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Procesar y enviar tus pedidos.</li>
          <li>Gestionar tu cuenta de usuario.</li>
          <li>Atender dudas, quejas o aclaraciones.</li>
          <li>Enviarte comunicaciones relacionadas con tus compras.</li>
        </ul>

        <p>
          No compartiremos tus datos con terceros, salvo que sea necesario para
          procesar pagos, realizar envíos o por requerimiento de autoridad
          competente.
        </p>

        <p>
          Tienes derecho a acceder, rectificar o cancelar tus datos personales,
          así como a oponerte a su uso (derechos ARCO). Para ejercer estos
          derechos, puedes escribirnos a{" "}
          <span className="font-medium">contacto@luna-market.com</span>.
        </p>

        <p>
          Cualquier cambio a este aviso de privacidad será publicado en este
          mismo sitio web.
        </p>
      </section>
    </main>
  );
}
