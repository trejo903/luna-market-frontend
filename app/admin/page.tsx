// app/admin/page.tsx

export default function Admin() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Resumen general
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Estadísticas principales de tu tienda Luna-market.
        </p>
      </div>

      {/* MÉTRICAS PRINCIPALES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          label="Ventas de hoy"
          value="$ 3,250.00"
          helper="+18% vs ayer"
        />
        <StatCard
          label="Ventas del mes"
          value="$ 82,430.00"
          helper="+12% vs mes pasado"
        />
        <StatCard
          label="Pedidos (mes)"
          value="214"
          helper="Ticket promedio $385.70"
        />
        <StatCard
          label="Clientes (mes)"
          value="167"
          helper="+23 clientes nuevos"
        />
        <StatCard
          label="Tasa de conversión"
          value="2.9%"
          helper="De 7,300 visitas"
        />
        <StatCard
          label="Carritos abandonados"
          value="46"
          helper="En las últimas 24h"
        />
        <StatCard
          label="Productos activos"
          value="132"
          helper="8 con stock bajo"
        />
        <StatCard
          label="Visitas (mes)"
          value="7,320"
          helper="Fuente principal: redes"
        />
      </section>

      {/* ───────── RESUMEN FISCAL ───────── */}
      <section className="space-y-3 md:space-y-4">
        <div>
          <h2 className="text-sm md:text-base font-semibold text-gray-800">
            Resumen fiscal (estimado)
          </h2>
          <p className="text-[11px] md:text-xs text-gray-500 mt-1">
            Cifras aproximadas con base en las ventas del mes. Los montos reales
            dependen de tu régimen fiscal y deducciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            label="Ingresos gravables (mes)"
            value="$ 82,430.00"
            helper="Ventas sujetas a impuestos"
          />
          <StatCard
            label="IVA estimado a pagar"
            value="$ 13,189.00"
            helper="16% sobre ingresos gravables"
          />
          <StatCard
            label="ISR estimado (mes)"
            value="$ 6,500.00"
            helper="Según coeficiente / régimen"
          />
          <StatCard
            label="% reservado para impuestos"
            value="24%"
            helper="Suma de IVA + ISR estimados"
          />
        </div>

        <div className="rounded-xl border bg-amber-50 px-3 py-2 sm:px-4 sm:py-3 text-[11px] md:text-xs text-amber-800">
          Esta sección es solo informativa. Para cálculos finales de impuestos,
          considera tu contabilidad completa (gastos, deducciones, régimen,
          retenciones, etc.) o consulta con tu contador.
        </div>
      </section>

      {/* ───────── OBLIGACIONES LABORALES ───────── */}
      <section className="space-y-3 md:space-y-4">
        <div>
          <h2 className="text-sm md:text-base font-semibold text-gray-800">
            Obligaciones laborales (estimado)
          </h2>
          <p className="text-[11px] md:text-xs text-gray-500 mt-1">
            Estimados de nómina y cargas sociales del mes (IMSS, Infonavit,
            otros). Los montos reales dependen del salario de cada empleado y
            las tablas vigentes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            label="Nómina bruta (mes)"
            value="$ 35,000.00"
            helper="Sueldos + compensaciones"
          />
          <StatCard
            label="Cuotas IMSS patronales"
            value="$ 9,800.00"
            helper="Seguridad social empleados"
          />
          <StatCard
            label="Aportaciones Infonavit"
            value="$ 3,200.00"
            helper="Créditos de vivienda"
          />
          <StatCard
            label="Costo laboral vs ventas"
            value="18%"
            helper="Nómina total / ventas del mes"
          />
        </div>

        <div className="rounded-xl border bg-blue-50 px-3 py-2 sm:px-4 sm:py-3 text-[11px] md:text-xs text-blue-800">
          Aquí puedes conectar tu nómina real para ver cuánto representan tus
          empleados frente a las ventas del mes.
        </div>
      </section>

      {/* ───────── RENTABILIDAD DEL NEGOCIO ───────── */}
      <section className="space-y-3 md:space-y-4">
        <div>
          <h2 className="text-sm md:text-base font-semibold text-gray-800">
            Rentabilidad del negocio (estimado)
          </h2>
          <p className="text-[11px] md:text-xs text-gray-500 mt-1">
            Relación entre ventas, costos, gastos y utilidad neta del mes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            label="Ingresos totales (mes)"
            value="$ 82,430.00"
            helper="Ventas brutas"
          />
          <StatCard
            label="Costo de productos vendidos"
            value="$ 41,200.00"
            helper="Compras / costo de mercancía"
          />
          <StatCard
            label="Margen bruto"
            value="$ 41,230.00"
            helper="≈ 50% sobre ventas"
          />
          <StatCard
            label="Utilidad neta estimada"
            value="$ 18,500.00"
            helper="Después de gastos e impuestos"
          />
        </div>
      </section>

      {/* ───────── SALUD DE CAJA Y COMPROMISOS ───────── */}
      <section className="space-y-3 md:space-y-4">
        <div>
          <h2 className="text-sm md:text-base font-semibold text-gray-800">
            Salud de caja y compromisos
          </h2>
          <p className="text-[11px] md:text-xs text-gray-500 mt-1">
            Indicadores rápidos de liquidez y obligaciones próximas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <StatCard
            label="Saldo en bancos"
            value="$ 25,300.00"
            helper="Disponible para operar"
          />
          <StatCard
            label="Cuentas por cobrar"
            value="$ 4,800.00"
            helper="Clientes que aún no pagan"
          />
          <StatCard
            label="Cuentas por pagar (15 días)"
            value="$ 7,600.00"
            helper="Proveedores e impuestos próximos"
          />
        </div>
      </section>

      {/* GRILLA INFERIOR: pedidos + productos + alertas */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Pedidos recientes */}
        <div className="xl:col-span-2 rounded-xl bg-white shadow-sm border">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">
              Pedidos recientes
            </h2>
            <span className="text-[11px] md:text-xs text-gray-500">
              Últimas 10 órdenes
            </span>
          </div>

          <div className="overflow-x-auto text-xs md:text-sm">
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-[10px] md:text-xs text-gray-500 uppercase">
                  <th className="px-4 py-2 whitespace-nowrap"># Orden</th>
                  <th className="px-4 py-2 whitespace-nowrap">Cliente</th>
                  <th className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                    Fecha
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap">Total</th>
                  <th className="px-4 py-2 whitespace-nowrap">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <OrderRow
                  id="LM-1024"
                  cliente="Juan Pérez"
                  fecha="27 feb 2025"
                  total="$ 749.00"
                  estado="Pagado"
                />
                <OrderRow
                  id="LM-1023"
                  cliente="Ana López"
                  fecha="27 feb 2025"
                  total="$ 1,299.00"
                  estado="Enviado"
                />
                <OrderRow
                  id="LM-1022"
                  cliente="Carlos Gómez"
                  fecha="26 feb 2025"
                  total="$ 399.00"
                  estado="Pendiente"
                />
                <OrderRow
                  id="LM-1021"
                  cliente="María Díaz"
                  fecha="26 feb 2025"
                  total="$ 1,899.00"
                  estado="Cancelado"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna derecha: productos + alertas */}
        <div className="space-y-4">
          {/* Productos más vendidos */}
          <div className="rounded-xl bg-white shadow-sm border flex flex-col">
            <div className="px-4 py-3 border-b">
              <h2 className="text-sm font-semibold text-gray-800">
                Productos más vendidos
              </h2>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                Últimos 30 días
              </p>
            </div>

            <div className="flex-1 px-4 py-3 space-y-3 text-xs md:text-sm">
              <TopProduct
                nombre="Camiseta básica blanca"
                vendidos={82}
                ingresos="$ 24,600"
              />
              <TopProduct
                nombre="Sudadera Luna-market"
                vendidos={54}
                ingresos="$ 32,400"
              />
              <TopProduct
                nombre="Camiseta negra deportiva"
                vendidos={39}
                ingresos="$ 11,700"
              />
              <TopProduct
                nombre="Pants deportivos"
                vendidos={21}
                ingresos="$ 9,450"
              />
            </div>
          </div>

          {/* Alertas y pendientes */}
          <div className="rounded-xl bg-white shadow-sm border flex flex-col">
            <div className="px-4 py-3 border-b">
              <h2 className="text-sm font-semibold text-gray-800">
                Alertas y pendientes
              </h2>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                Recordatorios importantes para este mes.
              </p>
            </div>

            <div className="px-4 py-3 space-y-2 text-xs md:text-sm">
              <AlertItem
                type="warning"
                title="Declaración mensual SAT"
                detail="Límite de presentación el día 17. Revisa IVA e ISR estimados."
              />
              <AlertItem
                type="info"
                title="IMSS / Infonavit"
                detail="Pago de cuotas patronales antes del día 17."
              />
              <AlertItem
                type="danger"
                title="Stock crítico"
                detail="3 productos con menos de 5 unidades. Revisa inventario."
              />
              <AlertItem
                type="info"
                title="Conciliación pasarelas de pago"
                detail="Compara depósitos de Stripe / Mercado Pago vs ventas del sistema."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────── COMPONENTES AUXILIARES ───────────────── */

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
};

function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white px-3 py-2 sm:px-4 sm:py-3 shadow-sm flex flex-col justify-between min-h-[86px]">
      <p className="text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <div>
        <p className="text-lg md:text-xl font-semibold text-gray-900">
          {value}
        </p>
        {helper && (
          <p className="mt-1 text-[11px] md:text-xs text-gray-500">
            {helper}
          </p>
        )}
      </div>
    </div>
  );
}

type OrderRowProps = {
  id: string;
  cliente: string;
  fecha: string;
  total: string;
  estado: "Pagado" | "Enviado" | "Pendiente" | "Cancelado";
};

function OrderRow({ id, cliente, fecha, total, estado }: OrderRowProps) {
  const statusColor: Record<OrderRowProps["estado"], string> = {
    Pagado: "bg-emerald-100 text-emerald-700",
    Enviado: "bg-blue-100 text-blue-700",
    Pendiente: "bg-amber-100 text-amber-700",
    Cancelado: "bg-red-100 text-red-700",
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 whitespace-nowrap text-[11px] md:text-xs font-mono text-gray-700">
        {id}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-gray-700">
        {cliente}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-[11px] md:text-xs hidden sm:table-cell">
        {fecha}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-gray-800 font-medium">
        {total}
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] md:text-[11px] font-medium ${statusColor[estado]}`}
        >
          {estado}
        </span>
      </td>
    </tr>
  );
}

type TopProductProps = {
  nombre: string;
  vendidos: number;
  ingresos: string;
};

function TopProduct({ nombre, vendidos, ingresos }: TopProductProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-800">{nombre}</p>
        <p className="text-[11px] md:text-xs text-gray-500">
          {vendidos} unidades · {ingresos}
        </p>
      </div>
    </div>
  );
}

type AlertItemProps = {
  type: "info" | "warning" | "danger";
  title: string;
  detail: string;
};

function AlertItem({ type, title, detail }: AlertItemProps) {
  const styles: Record<AlertItemProps["type"], string> = {
    info: "bg-blue-50 text-blue-800 border-blue-100",
    warning: "bg-amber-50 text-amber-800 border-amber-100",
    danger: "bg-red-50 text-red-800 border-red-100",
  };

  return (
    <div
      className={`border rounded-lg px-3 py-2 text-[11px] md:text-xs ${styles[type]}`}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-0.5">{detail}</p>
    </div>
  );
}
