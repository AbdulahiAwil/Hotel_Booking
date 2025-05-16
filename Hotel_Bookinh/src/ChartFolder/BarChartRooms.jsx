import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { selectPublishedRooms } from '../Lib/room'; // hubi path-ka

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartRooms() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await selectPublishedRooms();
        setRoomData(rooms);
      } catch (err) {
        console.error("Error loading rooms:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading room data.</p>;

  const chartData = {
    labels: roomData.map(room => room.title),
    datasets: [
      {
        label: 'Tirada Room Title-yada Published',
        data: roomData.map(() => 1), // kasta 1 count u saar
        backgroundColor: 'rgb(137,75,0)', // yellow-700 with 60% opacity
        borderColor: 'rgba(250, 204, 21, 1)', // full yellow-700
        borderWidth: 1,
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Room Title-yada Published (Bar Chart)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
