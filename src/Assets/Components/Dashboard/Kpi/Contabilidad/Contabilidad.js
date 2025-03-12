import { useEffect, useRef } from "react"
import { Card } from "primereact/card"
import Chart from "chart.js/auto"
import "./Contabilidad.css"

export default function Contabilidad() {
  const incomeExpenseChartRef = useRef(null)
  const chartInstances = useRef([])

  // Datos financieros de ejemplo
  const financialData = {
    ingresos: 125000,
    gastos: 98500,
    beneficio: 26500,
    margenBeneficio: 21.2,
    presupuestoAnual: 350000,
    presupuestoConsumido: 245000,
    ingresosPorCategoria: {
      ventas: 85000,
      servicios: 32000,
      otros: 8000,
    },
    gastosPorCategoria: {
      personal: 45000,
      operaciones: 28500,
      marketing: 15000,
      otros: 10000,
    },
  }

  useEffect(() => {
    // Limpiar gráficos anteriores
    chartInstances.current.forEach((chart) => chart?.destroy())
    chartInstances.current = []

    // Gráfico de Ingresos vs Gastos
    if (incomeExpenseChartRef.current) {
      const ctx = incomeExpenseChartRef.current.getContext("2d")
      const incomeExpenseChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Ingresos", "Gastos", "Beneficio"],
          datasets: [
            {
              data: [financialData.ingresos, financialData.gastos, financialData.beneficio],
              backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(75, 192, 192, 0.7)"],
              borderColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(75, 192, 192)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) =>
                  new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  }).format(context.raw),
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) =>
                  new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                    maximumSignificantDigits: 3,
                  }).format(value),
              },
            },
          },
        },
      })
      chartInstances.current.push(incomeExpenseChart)
    }

    return () => {
      chartInstances.current.forEach((chart) => chart?.destroy())
    }
  }, [])

  // Calcular porcentaje de presupuesto consumido
  const presupuestoConsumidoPorcentaje = (financialData.presupuestoConsumido / financialData.presupuestoAnual) * 100

  return (
    <div className="contabilidad-dashboard">
      <Card title="Panel de Contabilidad">
        <div className="contabilidad-content">
          {/* KPIs principales */}
          <div className="contabilidad-kpis">
            <div className="kpi-card">
              <div className="kpi-title">Ingresos</div>
              <div className="kpi-value">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(financialData.ingresos)}
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Gastos</div>
              <div className="kpi-value">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(financialData.gastos)}
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Beneficio</div>
              <div className="kpi-value">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(financialData.beneficio)}
              </div>
              <div className="kpi-subtitle">Margen: {financialData.margenBeneficio}%</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Presupuesto</div>
              <div className="kpi-value">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(financialData.presupuestoConsumido)}
                <span className="kpi-subtitle">
                  {" "}
                  /{" "}
                  {new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(financialData.presupuestoAnual)}
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${presupuestoConsumidoPorcentaje}%` }}></div>
              </div>
            </div>
          </div>

          {/* Gráfico principal */}
          <div className="chart-container">
            <h3 className="chart-title">Ingresos vs Gastos</h3>
            <div className="chart-wrapper">
              <canvas ref={incomeExpenseChartRef}></canvas>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

