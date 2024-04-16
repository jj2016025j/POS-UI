import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// 注册Chart.js的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AllData() {
  const [sellData, setSellData] = useState([]);

  useEffect(() => {
    fetch('/data/all')
      .then(response => response.json())
      .then(data => setSellData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: sellData.map(data => data.OrderDate),
    datasets: [
      {
        label: 'Total Sales',
        data: sellData.map(data => parseInt(data.TotalSales, 10)),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>All Sell Data</h2>
      <Line data={data} />
    </div>
  );
}

export default AllData;
