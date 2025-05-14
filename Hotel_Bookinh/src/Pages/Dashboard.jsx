import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router'; // sax: dom, ma aha 'react'
import { useAuth } from '../contex/AuthContex'; // saxda ah
import {  selectPublishedRooms } from '../Lib/room';
import { BedDouble, BookCopy, Users } from 'lucide-react';
import { getUserCount, getUserProfile } from '../Lib/auth';
import { getBookingCount } from '../Lib/booking';
// import toast from 'react-hot-toast';

export default function Dashboard() {
  const user = useAuth(); // hubi haddii user uu ku jiro user.user haddii loo baahdo
  // const navigate = useNavigate();

  // const [rooms, setRooms] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [totalCount, setTotalCount] = useState(0);
  // const [error, setError] = useState(null);

  const [rooms, setRooms] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await selectPublishedRooms();
      setRooms(data);
      setLoading(false);
    };

    fetchData();
  }, []);


   useEffect(() => {
    const fetchCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
      setLoading(false);
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchBookingCount = async () => {
      const count = await getBookingCount();
      setBookingCount(count);
      setLoading(false);
    };

    fetchBookingCount();
  }, []);



  if (loading) return <p>Loading...</p>;
  // ----------- Fetch Rooms Function -------------
  // useEffect(() => {
  //        if (!user?.id) {
  //            fetchUserRooms()
  //        } else {
  //            navigate('signin')
  //        }
  //    }, [!user?.id])
 
 
  //    const fetchUserRooms = async () => {
 
  //        try {
  //            setLoading(true)
  //            const { rooms, count } = await getRoomsByAuthor(user.id, { includeUnPublished: true, limit: 100 })
 
  //            setRooms(rooms)
  //            setTotalCount(count)
 
  //            console.log("rooms", rooms)
 
  //        } catch (error) {
 
  //            console.error('Error fetching rooms:', error)
  //            setError('Failed to load your rooms. Please try again.')
  //            toast.error('Failed to load your rooms')
 
  //        } finally {
  //            setLoading(false)
  //        }
 
  //    }
  // // ---------- JSX -------------
  return (
    <div className="max-w-screen bg-gray-100 min-h-screen overflow-hidden">
      <div className="top-50 flex justify-between items-center mt-18 mb-6 p-4 max-w-screen shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)]">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Booking Hotel</h1>
        <div className="text-xl text-yellow-700 flex items-center gap-1">
          <span className="text-gray-600">🏠</span> Dashboard
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div className='flex flex-col space-y-2'>
              <div className="text-xl text-gray-500">Total Admins</div>
               <div className="text-3xl font-bold text-gray-600">
                {userCount}
              </div>
              
            </div>
            <div className='flex items-center justify-center border-2 border-yellow-700 rounded-full w-20 h-20 '>
              <Users   className="w-15 h-15 text-yellow-800" />
             
            </div>
          </div>

           <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div className='flex flex-col space-y-2'>
              <div className="text-xl text-gray-500">Total Booking</div>
               <div className="text-3xl font-bold text-gray-600">
                {bookingCount}
              </div>
              
            </div>
            <div className='flex items-center justify-center border-2 border-yellow-700 rounded-full w-20 h-20 '>
              <BookCopy  className="w-15 h-15 text-yellow-800" />
             
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div className='flex flex-col space-y-2'>
              <div className="text-xl text-gray-500">Total Rooms</div>
               <div className="text-3xl font-bold text-gray-600">
                {rooms.length}
              </div>
              
            </div>
            <div className='flex items-center justify-center border-2 border-yellow-700 rounded-full w-20 h-20 '>
              <BedDouble  className="w-15 h-15 text-yellow-800" />
             
            </div>
          </div>

        </div>
{/* 
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <Users className="w-6 h-6 text-green-500" />
              <div className="text-2xl font-bold text-gray-800">
                {roomCount}
              </div>
              <div className="text-xs text-gray-500">Total Rooms</div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
