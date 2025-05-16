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
import { getBookingCount } from '../Lib/booking';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Bilaha si order sax ah
const monthsOrder = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function BookingChart() {
  const [bookingCount, setBookingCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const count = await getBookingCount();
        if (Array.isArray(count)) {
          setBookingCount(count);
        } else {
          console.warn("getBookingCount() did not return an array:", count);
          setBookingCount([]);
        }
      } catch (err) {
        console.error("Error fetching booking count:", err);
        setError(true);
        setBookingCount([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingCount();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading chart...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load booking data.</p>;

  const sortedBookingCount = [...bookingCount].sort(
    (a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month)
  );

  const chartData = {
    labels: sortedBookingCount.map(entry => entry.month),
    datasets: [
      {
        label: 'Booking-yo Bil walba',
        data: sortedBookingCount.map(entry => entry.count),
       backgroundColor: 'rgb(137,75,0)', // yellow-700 with 60% opacity
        borderColor: 'rgba(250, 204, 21, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Booking-yo Bil Bil (Bar Chart)',
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Tirada Booking-yada Bishiiba</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
