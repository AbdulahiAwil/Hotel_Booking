import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import { useAuth } from '../contex/AuthContex'
import { Link, useNavigate } from 'react-router'
import { deleteRoom, getRoomsByAuthor } from '../Lib/room'
import { MdPublishedWithChanges } from "react-icons/md";
import { FiAlertTriangle, FiEdit2, FiEye, FiLoader, FiPlus, FiTrash2 } from 'react-icons/fi'


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

    const confirmDelete = (room) => {
      setRoomToDelete(room)
  }

    const handleDelete = async () => {

      if (!roomToDelete) return

      try {

          setIsDeleting(true)
          console.log('Starting deletion process for room:', roomToDelete.id)

          // Wrap the optimistic update in a transition

          startTransition(() => updateOptimisticRooms(roomToDelete.id))

          const result = await deleteRoom(roomToDelete.id)

          setRooms(prevRooms => prevRooms.filter(room => room.id !== roomToDelete.id))
          setTotalCount(prevCount => prevCount - 1);

          setRoomToDelete(null)

      } catch (error) {

          console.error('Error deleting room in component:', error)
          console.error('Error details:', JSON.stringify(error, null, 2))
          toast.error(`Failed to delete room: ${error.message || 'Unknown error'}`)

          // Fetch articles again to restore state in case optimistic update was applied
          fetchUserRooms()

      } finally {
          setIsDeleting(false)
      }

  }





    // Published rooms
    const publishedRooms = optimisticRooms.filter(article => article.published)

    const formatDate = (dateString) => {
      if (!dateString) return ''

      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      })
  }

  return (
    <div className="max-w-screen flex flex-col bg-gray-100">
      <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">
        Create Room Blogs
      </div>
      <div class="bg-white m-5 rounded-lg shadow-md">
        <div class="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
          <h2 class="text-xl font-semibold flex items-center gap-2 text-white">
            <MdPublishedWithChanges /> Published{" "}
            {publishedRooms.length > 0 && (
              <span className="ml-3 px-2.5 py-0.5 bg-yellow-900 text-white text-sm font-medium rounded-full">
                {publishedRooms.length}
              </span>
            )}
          </h2>
          <Link to={"/create"} class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
            + Create Room
          </Link>
        </div>
        {/* content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
              <button
                onClick={fetchUserRooms}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : optimisticRooms.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <FiPlus className="h-10 w-10 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Articles Yet
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                You haven't created any articles yet. Start writing your first
                article and share your knowledge!
              </p>
              <Link
                to="/editor"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-colors duration-200"
              >
                <FiPlus className="mr-2" />
                Create Your First Article
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {publishedRooms.length > 0 ? (
                <div className="bg-yellow-700/70 overflow-hidden shadow-md">
                  <div className="bg-white overflow-hidden shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="text-left px-6 py-4">
                        <tr class="bg-yellow-600 text-white">
                          <th class="py-2 px-4 border">Title</th>
                          <th class="py-2 px-4 border">Date</th>
                          <th class="py-2 px-4 border">Room type</th>
                          <th class="py-2 px-4 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {publishedRooms.map((room) => (
                          <tr key={room.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {room.title}
                              </div>
                            </td>

                            <td className="py-2 px-4 border whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {formatDate(room.created_at)}
                              </div>
                            </td>

                            <td className="py-2 px-4 border whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {room.room_type}
                              </div>
                            </td>

                            <td className="py-2 px-4 border whitespace-nowrap text-right">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  to={`/room/${room.id}`}
                                  className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-blue-50"
                                  title="View Article"
                                >
                                  <FiEye />
                                </Link>

                                <Link
                                 to={`/create/${room.id}`}
                                  className="p-2 text-orange-600 hover:text-orange-800 rounded-full hover:bg-orange-50"
                                  title="Edit room"
                                >
                                  <FiEdit2 />
                                </Link>

                                <button
                                  onClick={() => confirmDelete(room)}
                                  className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 cursor-pointer"
                                  title="Delete room"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                  <p className="text-gray-500">
                    You don't have any published rooms yet
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* delete confirmation modal */}

      {roomToDelete && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              {roomToDelete.title || "Untitled Article"}"? This action cannot
              be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                // onClick={cancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                // disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
              >
                {isDeleting ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomManagePage