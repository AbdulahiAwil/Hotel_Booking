import { useEffect, useState } from 'react';
import { useAuth } from '../contex/AuthContex';
import { selectPublishedRooms } from '../Lib/room';
import { BedDouble, BookCopy, Users } from 'lucide-react';
import { getUserCount, getUserProfile } from '../Lib/auth';
import { getBookingCount } from '../Lib/booking';
import BookingChart from '../ChartFolder/BookingChart';
import ErrorBoundary from '../ErrorBoundry/ErrorBoundery';
import BarChartRooms from '../ChartFolder/BarChartRooms';

export default function Dashboard() {
  const user = useAuth();
  const [rooms, setRooms] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [roomsData, userCountData, bookingCountData] = await Promise.all([
        selectPublishedRooms(),
        getUserCount(),
        getBookingCount()
      ]);

      setRooms(roomsData || []);
      setUserCount(userCountData || 0);

      // Halkan ayaa la saxay
      setBookingCount(
        Array.isArray(bookingCountData)
          ? bookingCountData.reduce((total, item) => total + (item.count || 0), 0)
          : bookingCountData?.count || 0
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  if (loading) return <p className="text-gray-600 p-6">Loading...</p>;

  return (
    <div className="max-w-screen bg-gray-100 min-h-screen overflow-hidden">
      <div className="top-50 flex justify-between items-center mt-18 mb-6 p-4 max-w-screen shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)]">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Booking Hotel</h1>
        <div className="text-xl text-yellow-700 flex items-center gap-1">
          <span className="text-gray-600">🏠</span> Dashboard
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        {/* User Count */}
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <div className='flex flex-col space-y-2'>
            <div className="text-xl text-gray-500">Total Admins</div>
            <div className="text-3xl font-bold text-gray-600">{userCount}</div>
          </div>
          <div className='flex items-center justify-center border-2 border-yellow-700 rounded-full w-20 h-20'>
            <Users className="w-15 h-15 text-yellow-800" />
          </div>
        </div>

        {/* Booking Count */}
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <div className='flex flex-col space-y-2'>
            <div className="text-xl text-gray-500">Total Booking</div>
            <ErrorBoundary>
              <div className="text-3xl font-bold text-gray-600">{bookingCount}</div>
            </ErrorBoundary>
          </div>
          <div className='flex items-center justify-center border-2 border-yellow-700 rounded-full w-20 h-20'>
            <BookCopy className="w-15 h-15 text-yellow-800" />
          </div>
        </div>

        {/* Rooms Count */}
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <div className='flex flex-col space-y-2'>
            <div className="text-xl text-gray-500">Total Rooms</div>
            <div className="text-3xl font-bold text-gray-600">{rooms.length}</div>
          </div>
          <div className='flex items-center justify-center border-2 border-yellow-700 rounded-full w-20 h-20'>
            <BedDouble className="w-15 h-15 text-yellow-800" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 m-6 items-center'>
        <ErrorBoundary>
          <div className="p-4">
            <BookingChart />
          </div>
        </ErrorBoundary>
        <div className='p-4 h-full'>
          <BarChartRooms />
        </div>
      </div>
    </div>
  );
}
