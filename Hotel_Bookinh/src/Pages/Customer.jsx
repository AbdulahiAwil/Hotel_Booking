import React, { useEffect, useOptimistic, useState, useTransition } from 'react';
import { useAuth } from '../contex/AuthContex';
import { deleteBook, getBookingByRoom, updateBook } from '../Lib/booking';
import { Link, useNavigate } from 'react-router';
import { IoList } from "react-icons/io5";
import { FiEdit2, FiEye, FiLoader, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaRegCircleUser } from "react-icons/fa6";
import { MdModeEdit } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

function Customer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isUpdating, setIsUpdating] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [phone, setPhone] = useState('');
  const [viewCustomer, setViewCustomer] = useState()
  const [searchName, setSearchName] = useState('');
const [searchEmail, setSearchEmail] = useState('');
const [searchPhone, setSearchPhone] = useState('');
const [searchCheckIn, setSearchCheckIn] = useState('');
const [price, setPrice] = useState('');
const [searchCheckOut, setSearchCheckOut] = useState('');
const [searchRoomName, setSearchRoomName] = useState('');



  const [optimisticBooks, updateOptimisticBooks] = useOptimistic(booking, (state, idToRemove) =>
    state.filter((booking) => booking.id !== idToRemove)
  );

  useEffect(() => {
    if (user) {
      fetchCustomerBooking();
    } else {
      navigate('signin');
    }
  }, [user]);

  const fetchCustomerBooking = async () => {
    try {
      setLoading(true);
      const { booking, count } = await getBookingByRoom({ includeUnPublished: true, limit: 100 });
      setBooking(booking);
      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to load your customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (book) => setBookingToDelete(book);
  const cancelDelete = () => setBookingToDelete(null);
  const handleView = (booking) => setViewCustomer(booking);
  const handleBack = () => setViewCustomer(null)

  const handleDelete = async () => {
    if (!bookingToDelete) return;
    try {
      setIsDeleting(true);
      startTransition(() => updateOptimisticBooks(bookingToDelete.id));
      await deleteBook(bookingToDelete.id);
      setBooking((prevBooks) => prevBooks.filter((book) => book.id !== bookingToDelete.id));
      setTotalCount((prevCount) => prevCount - 1);
      setBookingToDelete(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      fetchCustomerBooking();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdating = (booking) => {
    setIsUpdating(booking);
    setName(booking.name);
    setEmail(booking.email);
    setPhone(booking.phone);
    setCheckIn(booking.check_in);
    setCheckOut(booking.check_out);
    setPrice(booking.price);
  };

  const updateBooking = async (e) => {
    e.preventDefault();
    if (!isUpdating || !isUpdating.id) return;
  
    const updatedBooking = {
      id: isUpdating.id,
      name,
      email,
      phone,
      check_in: checkIn,
      check_out: checkOut,
      price
    };
  
    console.log(updatedBooking);
  
    try {
      await updateBook(updatedBooking.id, updatedBooking); // ✅ FIXED LINE
  
      setBooking((prevBookings) =>
        prevBookings.map((book) =>
          book.id === updatedBooking.id ? { ...book, ...updatedBooking } : book
        )
      );
      setIsUpdating(null);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleSearching = (e) => {
    e.preventDefault()
    const filtered = booking.filter((b) =>
      b.name.toLowerCase().includes(searchName.toLowerCase()) &&
      b.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      b.phone.toLowerCase().includes(searchPhone.toLowerCase()) &&
      b.check_in.toLowerCase().includes(searchCheckIn.toLowerCase())&&
      b.check_out.toLowerCase().includes(searchCheckOut.toLowerCase())&&
      b.room_name.toLowerCase().includes(searchRoomName.toLowerCase())
    );
  
    setBooking(filtered);
  };
  
  
  

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };


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
      <form onSubmit={handleSearching}>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Form Inputs */}
       
        <div>
          <label className="block text-gray-700">Full name:</label>
          <input type="text" 
          value={searchName}
          onChange={(e) => { setSearchName(e.target.value); handleSearching(); }}
           className="w-full mt-1 p-2 border rounded-md"
           placeholder="Enter Full name" />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input type="email"
           value={searchEmail}
           onChange={(e) => { setSearchEmail(e.target.value); handleSearching(); }}
           className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter Email" />
        </div>
        <div>
          <label className="block text-gray-700">Customer Phone:</label>
          <input type="text"
           value={searchPhone}
           onChange={(e) => { setSearchPhone(e.target.value); handleSearching(); }}
          className="w-full mt-1 p-2 border rounded-md" 
          placeholder="Enter Customer Number" />
        </div>
        <div>
          <label className="block text-gray-700">Check In Date:</label>
          <input type="date"
             value={searchCheckIn}
             onChange={(e) => { setSearchCheckIn(e.target.value); handleSearching(); }}
           className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Check Out Date:</label>
          <input type="date"
          value={searchCheckOut}
          onChange={(e) => { setSearchCheckOut(e.target.value); handleSearching(); }} 
          className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Room Title:</label>
          <input type="text" 
          value={searchRoomName}
          onChange={(e) => { setSearchRoomName(e.target.value); handleSearching(); }}
          placeholder='Room Title'
          className="w-full mt-1 p-2 border rounded-md" />
        </div>
       
        
      
      </div>
      <div className="flex items-center gap-4 p-4">
        <button type='submit' className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Search</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Reset</button>
      </div>
      </form>
      
      
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
          <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <FiPlus className="h-10 w-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Booking Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            You haven't created any booking yet. Start writing your first article and share your knowledge!
          </p>
         
        </div>
      ) : (
        <div className="overflow-x-auto p-4">
          {booking.length > 0 ? (
            <table className="min-w-full bg-white text-sm border">
              <thead>
                <tr className="bg-yellow-800/70 text-white">
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
                        <button
                          onClick={() => handleView(book)}
                          className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-blue-50"
                          title="View Customer"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => handleUpdating(book)}
                          className="p-2 text-orange-600 hover:text-orange-800 rounded-full hover:bg-orange-50"
                          title="Edit Customer"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => confirmDelete(book)}
                          className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 cursor-pointer"
                          title="Delete Customer"
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

    {/* delete confirmation modal */}
    {bookingToDelete && (
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "
                  {bookingToDelete.name || "Untitled Book"}"? This action cannot
                  be undone.
                </p>
    
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDelete}
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


    
    {isUpdating && (
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-[600px] ">
                <div className='w-full p-4 bg-yellow-700 rounded-t-xl'>
                
                <div className="flex items-center space-x-5 text-xl font-bold text-white mb-4">
                <MdModeEdit className='text-xl text-white' />
                 Edit Customer Booking

                </div>

                </div>
                  <div>
                    <form onSubmit={updateBooking}>
                      <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                        <label className="block text-gray-700">Full name:</label>
                        <input type="text"
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                         className="w-full mt-1 p-2 border rounded-md" 
                         placeholder="" />
                        </div>
                        <div className='col-span-2'><label className="block text-gray-700">Full name:</label>
                        <input type="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                         className="w-full mt-1 p-2 border rounded-md"
                          placeholder="" /></div>
                        <div className='col-span-2'>
                        <label className="block text-gray-700">Full name:</label>
                        <input type="text"
                        name="phone"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)} 
                         className="w-full mt-1 p-2 border rounded-md"
                          placeholder="" />
                        </div>
                        <div className='cols-span-1'>
                        <label className="block text-gray-700">Full name:</label>
                        <input type="date"
                        name='date'
                        value={checkIn}
                        onChange={(e)=>setCheckIn(e.target.value)} 
                        className="w-full mt-1 p-2 border rounded-md" 
                        placeholder="" />
                        </div>
                        <div className='cols-span-1'>
                        <label className="block text-gray-700">Full name:</label>
                        <input type="date" 
                        
                        value={checkOut}
                        onChange={(e)=>setCheckOut(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md" 
                        placeholder="Enter Full name" />
                        </div>
                      </div>
                      <div className="flex justify-left m-4 space-x-3">
                  <button
                    // onClick={cancelDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
    
                  <button
                    type='submit'
                    // disabled={isDeleting}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center"
                  >
                    Update
                  </button>
                </div>
                    </form>
                    
                  </div>
                 
              </div>
            </div>
          )}


    
{viewCustomer && (
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-[600px] ">
                <div className='flex items-center justify-center w-full mt-10 mb-10'>
                <div className="flex items-center justify-center w-[200px] h-[200px] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <FaUserAlt className='w-[200px] h-[200px] rounded-full font-semibold items-center text-yellow-800/70'/>
         
                </div>
                </div>
                
                  <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-2 justify-center mb-8 text-gray-700'>
                  <div className='col-span-2 space-x-4 w-full border-b-2 border-gray-100 text-xl p-4'>
                    <span>Full Name:</span> <span>{viewCustomer.name}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Customer Email:</span> <span>{viewCustomer.email}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Full Phone:</span> <span>{viewCustomer.phone}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Room Title:</span> <span>{viewCustomer.room_name}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Room Type:</span> <span>{viewCustomer.room_type}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Check In Date:</span> <span>{formatDate(viewCustomer.check_in)}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Check Out Date:</span> <span>{formatDate(viewCustomer.check_out)}</span>
                  </div>
                  <div className='col-span-2 space-x-4 border-b-2 border-gray-100 text-xl p-4'>
                    <span>Price:</span> <span>{viewCustomer.price}</span>
                  </div>
                  <button onClick={handleBack} className="col-span-2 px-4 py-2 bg-yellow-700 text-yellow-100 rounded-lg hover:bg-yellow-800 transition-colors duration-200">Back</button>
                </div>
                
                
                 
              </div>
            </div>
          )}


          
  </div>



  
  
  
  );
}

export default Customer

 