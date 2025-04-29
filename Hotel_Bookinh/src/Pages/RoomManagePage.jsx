import React, { useEffect, useState, useTransition } from 'react'
import { useAuth } from '../contex/AuthContex'
import { useNavigate } from 'react-router'
import { getRoomsByAuthor } from '../Lib/room'
import { MdPublishedWithChanges } from "react-icons/md";


const RoomManagePage = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [roomToDelete, setRoomToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [optimisticRooms, updateOptimisticRooms] = useOptimistic(rooms, (state, roomsToRemove) => state.filter(room => room.id !== roomsToRemove))

    useEffect(() => {
        if (user) {
            fetchUserRooms()
        } else {
            navigate('signin')
        }
    }, [user])


    const fetchUserRooms = async () => {

        try {
            setLoading(true)
            const { rooms, count } = await getRoomsByAuthor(user.id, { includeUnPublished: true, limit: 100 })

            setRooms(rooms)
            setTotalCount(count)

            console.log("rooms", rooms)

        } catch (error) {

            console.error('Error fetching rooms:', error)
            setError('Failed to load your rooms. Please try again.')
            toast.error('Failed to load your rooms')

        } finally {
            setLoading(false)
        }

    }
  return (
    <div className="max-w-screen flex flex-col bg-gray-100">
      <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">
        Create Room Blogs
      </div>
      <div class="bg-white m-5 rounded-lg shadow-md">
        <div class="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
          <h2 class="text-xl font-semibold flex items-center gap-2 text-white">
            <MdPublishedWithChanges /> Published
          </h2>
          <button class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
            + Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomManagePage