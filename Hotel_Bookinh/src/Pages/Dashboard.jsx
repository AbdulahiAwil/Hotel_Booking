import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contex/AuthContex'; // ama meesha saxda ah
import { getRoomsByAuthor } from '../Lib/room'; // ama meesha saxda ah
import { useOptimistic } from 'react'; 
import { Users } from 'lucide-react';
// ama custom hook
// import toast from 'react-hot-toast' (haddii loo baahdo)
// import ErrorMessage or Spinner here if needed

export default function Dashboard() {
  const user = useAuth();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  const [optimisticRooms, updateOptimisticRooms] = useOptimistic(
    rooms,
    (state, roomsToRemove) => state.filter(room => room.id !== roomsToRemove)
  );

  const fetchUserRooms = async () => {
    try {
      setLoading(true);
      const { rooms, count } = await getRoomsByAuthor(user.id, {
        includeUnPublished: true,
        limit: 100,
      });

      setRooms(rooms);
      setTotalCount(count);
      console.log("rooms", rooms);

    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to load your rooms. Please try again.');
      // toast.error('Failed to load your rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserRooms();
    } else {
      navigate('signin');
    }
  }, [user]);

  const publishedRooms = optimisticRooms.filter(room => room.published);

  // Return JSX (waxaad beddeli kartaa sida aad u rabto)
  


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="top-50 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Smartmeter</h1>
        <div className="text-sm text-blue-600 flex items-center gap-1">
          <span className="text-gray-600">🏠</span> Dashboard
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
            <Users className="w-6 h-6 text-green-500" />
            {rooms.length > 0 && (
              <p className="text-2xl font-bold text-gray-800">{publishedRooms.length}</p>
            )}
            </div>
            
          </div>
      
      </div>
    </div>
  );
}
