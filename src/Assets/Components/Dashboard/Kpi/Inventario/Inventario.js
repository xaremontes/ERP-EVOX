import { useEffect, useRef } from "react"
import { Card } from "primereact/card"
import Chart from "chart.js/auto"
import "./Inventario.css"

export default function Kpi4() {
  const categoryChartRef = useRef(null)
  const chartInstances = useRef([])

  // Datos de inventario de ejemplo
  const inventoryData = {
    totalProductos: 1248,
    valorInventario: 285750,
    productosAgotados: 18,
    productosEscasos: 42,
    rotacionInventario: 4.2,
    categorias: [
      { nombre: "Electrónicos", cantidad: 320, valor: 98500 },
      { nombre: "Ropa", cantidad: 450, valor: 67200 },
      { nombre: "Hogar", cantidad: 215, valor: 43000 },
      { nombre: "Deportes", cantidad: 180, valor: 36800 },
      { nombre: "Juguetes", cantidad: 83, valor: 12250 },
    ],
    productosPopulares: [
      { nombre: "Smartphone XYZ", stock: 45, demanda: "Alta" },
      { nombre: "Laptop ABC", stock: 12, demanda: "Alta" },
      { nombre: "Auriculares Bluetooth", stock: 28, demanda: "Media" },
      { nombre: "Zapatillas Running", stock: 8, demanda: "Alta" },
    ],
  }

  useEffect(() => {
    // Limpiar gráficos anteriores
    chartInstances.current.forEach((chart) => chart?.destroy())
    chartInstances.current = []

    // Gráfico de categorías
    if (categoryChartRef.current) {
      const ctx = categoryChartRef.current.getContext("2d")
      const categoryChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: inventoryData.categorias.map((cat) => cat.nombre),
          datasets: [
            {
              label: "Cantidad",
              data: inventoryData.categorias.map((cat) => cat.cantidad),
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgb(54, 162, 235)",
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
                label: (context) => {
                  const value = context.raw
                  const total = inventoryData.totalProductos
                  const percentage = Math.round((value / total) * 100)
                  return `Cantidad: ${value} (${percentage}%)`
                },
                afterLabel: (context) => {
                  const index = context.dataIndex
                  const valor = inventoryData.categorias[index].valor
                  return `Valor: ${new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  }).format(valor)}`
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Cantidad de productos",
              },
            },
          },
        },
      })
      chartInstances.current.push(categoryChart)
    }

    return () => {
      chartInstances.current.forEach((chart) => chart?.destroy())
    }
  }, [])

  // Calcular porcentaje de productos escasos
  const porcentajeEscasos = Math.round(
    ((inventoryData.productosEscasos + inventoryData.productosAgotados) / inventoryData.totalProductos) * 100,
  )

  return (
    <div className="inventario-dashboard">
      <Card title="Panel de Inventario">
        <div className="inventario-content">
          {/* KPIs principales */}
          <div className="inventario-kpis">
            <div className="kpi-card">
              <div className="kpi-title">Total Productos</div>
              <div className="kpi-value">{inventoryData.totalProductos}</div>
              <div className="kpi-subtitle">En {inventoryData.categorias.length} categorías</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Valor de Inventario</div>
              <div className="kpi-value">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(inventoryData.valorInventario)}
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">Rotación Anual</div>
              <div className="kpi-value">{inventoryData.rotacionInventario}x</div>
              <div className="kpi-subtitle">Veces por año</div>
            </div>
            <div className="kpi-card alert-card">
              <div className="kpi-title">Alertas de Stock</div>
              <div className="kpi-value">{inventoryData.productosAgotados + inventoryData.productosEscasos}</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${porcentajeEscasos}%` }}></div>
              </div>
              <div className="kpi-subtitle">
                {inventoryData.productosAgotados} agotados, {inventoryData.productosEscasos} escasos
              </div>
            </div>
          </div>

          {/* Gráfico de categorías */}
          <div className="chart-container">
            <h3 className="chart-title">Productos por Categoría</h3>
            <div className="chart-wrapper">
              <canvas ref={categoryChartRef}></canvas>
            </div>
          </div>

          {/* Tabla de productos populares */}
          <div className="popular-products">
            <h3 className="section-title">Productos Populares</h3>
            <div className="products-table">
              <div className="table-header">
                <div className="header-cell">Producto</div>
                <div className="header-cell">Stock</div>
                <div className="header-cell">Demanda</div>
              </div>
              {inventoryData.productosPopulares.map((producto, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell">{producto.nombre}</div>
                  <div className="table-cell">
                    <span className={producto.stock < 10 ? "stock-low" : "stock-ok"}>{producto.stock}</span>
                  </div>
                  <div className="table-cell">
                    <span className={`demand-badge ${producto.demanda.toLowerCase()}`}>{producto.demanda}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

