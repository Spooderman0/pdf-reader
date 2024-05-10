import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

const dataForLineChart = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Primer Dataset',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      backgroundColor: 'rgb(75,192,192)',
      borderColor: 'rgba(75,192,192,0.2)',
    },
    {
      label: 'Segundo Dataset',
      data: [28, 48, 40, 19, 86, 27],
      fill: false,
      backgroundColor: 'rgb(255,99,132)',
      borderColor: 'rgba(255,99,132,0.2)',
    },
  ],
};

const optionsForLineChart = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const SeccionFiguras = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100"  style={{height: "70dvh"}}>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Algoritmos: análisis, diseño e implementación
        </h2>
        <div className="flex flex-col lg:flex-row">
          {/* Section for the charts */}
          <div className="lg:w-2/3">
            <Line data={dataForLineChart} options={optionsForLineChart} />
            {/* You can add Bar and Doughnut charts similarly */}
          </div>
          {/* Section for the text */}
          <div className="lg:w-1/3 p-4 bg-gray-200 rounded-lg shadow-inner">
            <p>
              La gráfica representa la evolución de cierta variable a lo largo del tiempo, y se
              caracteriza por sus marcados picos y valles. Estos altos y bajos en la línea trazada reflejan
              fluctuaciones significativas en la magnitud de la variable medida...
              {/* Continue with the placeholder text */}
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {/* Navigation buttons */}
          <Link to="../main" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ÍNDICE
          </Link>
          {/* ...other buttons */}
        </div>
      </div>
    </div>
  );
};

export default SeccionFiguras;
