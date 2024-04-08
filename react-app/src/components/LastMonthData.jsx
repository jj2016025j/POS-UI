import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function LastMonthData() {
  const [sellData, setSellData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/data/lastMonth')
      .then(response => response.json())
      .then(data => setSellData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: sellData.map(data => data.MenuItemName),
    datasets: [
      {
        label: 'Total Sales',
        data: sellData.map(data => data.TotalSales),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Last Month Sell Data</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default LastMonthData;
