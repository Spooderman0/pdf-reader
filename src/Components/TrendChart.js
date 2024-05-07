import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TrendChart = ({ words }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null); // Referencia al gráfico actual

  useEffect(() => {
    if (words && words.length) {
      const topWords = getTopWords(words, 5);
      renderChart(topWords);
    }
  }, [words]);

  //console.log(words)

  // Función para obtener los N términos más populares
  function getTopWords(wordsArray, n) {
    wordsArray.sort((a, b) => b.value[1] - a.value[1]); // Ordena por frecuencia descendente
    return wordsArray.slice(0, n); // Devuelve los primeros N elementos
  }

  // Función para renderizar el gráfico de barras
  function renderChart(words) {
    if (!chartRef.current || !words.length) return;

    // Destruir gráfico existente
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = words.map(({ text }) => text);
    const data = words.map(({ value }) => value[1]);

    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Frecuencia de términos',
        data: data,
        backgroundColor: 'rgba(0,133,192,0.3)',
        borderColor: 'rgba(0,133,192,1)',
        borderWidth: 1,
      }],
    };

    /*const chartOptions = {
      scales: {
        y: { beginAtZero: true },
      },
    };*/
    
    const chartOptions = {
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            maxRotation: 180, // Rotación de 0 grados (vertical)
            autoSkip: false, // Desactivar el auto-ajuste para mostrar todas las etiquetas
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    };
    

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      // Limpiar el gráfico al desmontar el componente
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%', maxHeight:"28dvh" }} />;
};

export default TrendChart;
