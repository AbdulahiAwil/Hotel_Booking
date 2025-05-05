import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import { useAuth } from '../contex/AuthContex'
import { getBookingByRoom } from '../Lib/booking';
import { Link, useNavigate } from 'react-router'
import { IoList } from "react-icons/io5";
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';

function Customer() {

  const { user } = useAuth()
      const navigate = useNavigate()
      const [booking, setBooking] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [totalCount, setTotalCount] = useState(0)
      const [bookingToDelete, setBookingToDelete] = useState(null)
      const [isDeleting, setIsDeleting] = useState(false)
      const [isPending, startTransition] = useTransition()


      const [optimisticBooks, updateOptimisticBooks] = useOptimistic(booking, (state, booksToRemove) => state.filter(booking => booking.id !== booksToRemove))

       useEffect(() => {
              if (user) {
                  fetchCustomerBooking()
              } else {
                  navigate('signin')
              }
          }, [user])

           const fetchCustomerBooking = async () => {
          
                  try {
                      setLoading(true)
                      const { booking, count } = await getBookingByRoom({ includeUnPublished: true, limit: 100 })
          
                      setBooking(booking)
                      setTotalCount(count)
          
                      console.log("Booking", booking)
          
                  } catch (error) {
          
                      console.error('Error fetching customers:', error)
                      setError('Failed to load your customer. Please try again.')
                      toast.error('Failed to load your rooms')
          
                  } finally {
                      setLoading(false)
                  }
          
              }
          
              const confirmDelete = (book) => {
                setBookingToDelete(book)
            }

            // const publishedBooks = optimisticBooks.filter(booking => booking.published)
            // console.log(publishedBooks)
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
    <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">Customer</div>
  
    <div className="bg-white m-5 rounded-lg shadow-md">
      <div className="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <IoList /> Customer List
        </h2>
        <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
          + Create
        </button>
      </div>
  
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Form Inputs */}
        <div>
          <label className="block text-gray-700">Full name:</label>
          <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter Full name" />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input type="email" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter Email" />
        </div>
        <div>
          <label className="block text-gray-700">Customer Phone:</label>
          <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter Customer Number" />
        </div>
        <div>
          <label className="block text-gray-700">Check In Date:</label>
          <input type="date" className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Check Out Date:</label>
          <input type="date" className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Number of Guest:</label>
          <input type="number" className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Room Type:</label>
          <select className="w-full mt-1 p-2 border rounded-md">
            <option>Room Type</option>
          </select>
        </div>
      </div>
  
      <div className="flex items-center gap-4 p-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Search</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Reset</button>
      </div>
  
      {/* State Handling: Loading / Error / Empty / Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
          <button
            onClick={fetchCustomerBooking}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      ) : optimisticBooks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <FiPlus className="h-10 w-10 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            You haven't created any booking yet. Start writing your first article and share your knowledge!
          </p>
          <Link
            to="/editor"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700"
          >
            <FiPlus className="mr-2" />
            Create Your First Article
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto p-4">
          {booking.length > 0 ? (
            <table className="min-w-full bg-white text-sm border">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">Full Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Check In Date</th>
                  <th className="py-2 px-4 border">Check Out Date</th>
                  <th className="py-2 px-4 border">Room Title</th>
                  <th className="py-2 px-4 border">Room Type</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border text-left">{book.name}</td>
                    <td className="py-2 px-4 border text-left">{book.email}</td>
                    <td className="py-2 px-4 border text-center">{book.phone}</td>
                    <td className="py-2 px-4 border text-center">{formatDate(book.check_in)}</td>
                    <td className="py-2 px-4 border text-center">{formatDate(book.check_out)}</td>
                    <td className="py-2 px-4 border text-left">{book.room_name}</td>
                    <td className="py-2 px-4 border text-left">{book.room_type}</td>
                    <td className="py-2 px-4 border text-center">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/room/${book.id}`}
                          className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-blue-50"
                          title="View Article"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          to={`/create/${book.id}`}
                          className="p-2 text-orange-600 hover:text-orange-800 rounded-full hover:bg-orange-50"
                          title="Edit room"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => confirmDelete(book)}
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
          ) : (
            <p className="text-center text-gray-500">No bookings found.</p>
          )}
        </div>
      )}
    </div>
  </div>
  
  
  );
}

export default Customer

 