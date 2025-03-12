import React, { useEffect, useRef } from 'react'; 
import { Card } from 'primereact/card';
import Chart from 'chart.js/auto';
import './Clientes.css';

export default function Cliente() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    
    useEffect(() => {
        if (chartRef.current) {
            // Configuración del gráfico
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Clientes activos', 'Campaña de Marketing', 'Clientes potenciales', 
                             'Clientes inactivos', 'Clientes perdidos', 'Clientes ganados'],
                    datasets: [{
                        data: [100, 10, 20, 5, 3, 10],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                        borderColor: 'white',
                        borderWidth: 2,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    const percentage = ((value / 150) * 100).toFixed(1);
                                    return `${context.label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);
    
    return (
        <div className="clientes-dashboard">
            <Card title="Total de Clientes">
                <div className="client-content">
                    <div className="client-total">
                        <div className="client-total-number">150</div>
                    </div>
                    <div className="client-chart">
                        <canvas ref={chartRef}></canvas>
                    </div>
                    <p className="m-0 client-data-list">
                        Clientes activos = 100
                        Campaña de Marketing = 10
                        Clientes potenciales = 20
                        Clientes inactivos = 5
                        Clientes perdidos = 3
                        Clientes ganados = 10
                        Clientes totales = 150
                    </p>
                </div>
            </Card>
        </div>
    );
}