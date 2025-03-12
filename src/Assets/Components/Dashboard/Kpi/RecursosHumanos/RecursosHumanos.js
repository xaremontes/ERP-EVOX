import { useEffect, useRef } from "react"
import { Card } from "primereact/card"
import Chart from "chart.js/auto"
import "./RecursosHumanos.css"

export default function RecursosHumanos() {
  const employeeChartRef = useRef(null)
  const chartInstances = useRef([])

  // Datos de RRHH de ejemplo
  const hrData = {
    totalEmpleados: 128,
    nuevasContrataciones: 12,
    bajas: 5,
    tasaRetencion: 94,
    departamentos: [
      { nombre: "Ventas", empleados: 32 },
      { nombre: "Desarrollo", empleados: 45 },
      { nombre: "Marketing", empleados: 18 },
      { nombre: "Finanzas", empleados: 15 },
      { nombre: "RRHH", empleados: 8 },
      { nombre: "Soporte", empleados: 10 },
    ],
    genero: {
      masculino: 72,
      femenino: 56,
    },
    tipoContrato: {
      tiempoCompleto: 98,
      mediaTiempo: 22,
      temporal: 8,
    },
  }

  useEffect(() => {
    // Limpiar gráficos anteriores
    chartInstances.current.forEach((chart) => chart?.destroy())
    chartInstances.current = []

    // Gráfico de distribución de empleados por departamento
    if (employeeChartRef.current) {
      const ctx = employeeChartRef.current.getContext("2d")
      const employeeChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: hrData.departamentos.map((dept) => dept.nombre),
          datasets: [
            {
              data: hrData.departamentos.map((dept) => dept.empleados),
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 12,
                padding: 15,
                font: {
                  size: 11,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${context.label}: ${value} (${percentage}%)`
                },
              },
            },
          },
        },
      })
      chartInstances.current.push(employeeChart)
    }

    return () => {
      chartInstances.current.forEach((chart) => chart?.destroy())
    }
  }, [])

  // Calcular tasa de rotación
  const tasaRotacion = Math.round((hrData.bajas / hrData.totalEmpleados) * 100)

  return (
    <div className="recursoshumanos-dashboard">
      <Card title="Panel de Recursos Humanos">
        <div className="rh-content">
          {/* KPIs principales */}
          <div className="rh-kpis">
            <div className="kpi-card">
              <div className="kpi-title">Total Empleados</div>
              <div className="kpi-value">{hrData.totalEmpleados}</div>
              <div className="kpi-subtitle">
                <span className="kpi-trend positive">+{hrData.nuevasContrataciones} este mes</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Retención</div>
              <div className="kpi-value">{hrData.tasaRetencion}%</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${hrData.tasaRetencion}%` }}></div>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Rotación</div>
              <div className="kpi-value">{tasaRotacion}%</div>
              <div className="kpi-subtitle">
                <span className={tasaRotacion < 10 ? "kpi-trend positive" : "kpi-trend negative"}>
                  {tasaRotacion < 10 ? "Saludable" : "Alta"}
                </span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Diversidad</div>
              <div className="kpi-value">{Math.round((hrData.genero.femenino / hrData.totalEmpleados) * 100)}%</div>
              <div className="kpi-subtitle">Mujeres en la empresa</div>
            </div>
          </div>

          {/* Distribución de empleados */}
          <div className="employee-distribution">
            <div className="distribution-header">
              <h3>Distribución por Departamento</h3>
            </div>
            <div className="chart-wrapper">
              <canvas ref={employeeChartRef}></canvas>
            </div>
          </div>

          {/* Estadísticas adicionales */}
          <div className="rh-stats">
            <div className="stats-card">
              <h4>Tipo de Contrato</h4>
              <div className="stats-item">
                <div className="stats-label">Tiempo Completo</div>
                <div className="stats-bar">
                  <div
                    className="stats-fill"
                    style={{ width: `${(hrData.tipoContrato.tiempoCompleto / hrData.totalEmpleados) * 100}%` }}
                  ></div>
                </div>
                <div className="stats-value">{hrData.tipoContrato.tiempoCompleto}</div>
              </div>
              <div className="stats-item">
                <div className="stats-label">Media Jornada</div>
                <div className="stats-bar">
                  <div
                    className="stats-fill"
                    style={{ width: `${(hrData.tipoContrato.mediaTiempo / hrData.totalEmpleados) * 100}%` }}
                  ></div>
                </div>
                <div className="stats-value">{hrData.tipoContrato.mediaTiempo}</div>
              </div>
              <div className="stats-item">
                <div className="stats-label">Temporal</div>
                <div className="stats-bar">
                  <div
                    className="stats-fill"
                    style={{ width: `${(hrData.tipoContrato.temporal / hrData.totalEmpleados) * 100}%` }}
                  ></div>
                </div>
                <div className="stats-value">{hrData.tipoContrato.temporal}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}


  