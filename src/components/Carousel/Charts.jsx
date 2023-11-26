import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartComponent = () => {
  // Define los datos para el gráfico de asistencia vs tiempo
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Asistencia',
        data: [80, 90, 75, 95, 70], // Datos de asistencia
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configuración del gráfico de barras
  const options = {
    scales: {
      x: {
        type: 'category', // Usa 'category' para las etiquetas del eje x en un gráfico de barras
      },
      y: {
        beginAtZero: true,
        max: 100, // Establece un valor máximo para el eje y si es necesario
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
