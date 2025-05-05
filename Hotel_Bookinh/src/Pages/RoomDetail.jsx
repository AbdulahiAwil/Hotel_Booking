import React, { useEffect, useState } from "react";
import Img3 from "../Images/heroSlider/3.jpg";
import Img1 from "../Images/rooms/1.png";
// icons
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from 'react-icons/fa';
import { Link, useParams } from "react-router";
import { useAuth } from "../contex/AuthContex";
import { getRoomyById } from "../Lib/room";
import { createBooking } from "../Lib/booking";

const RoomDetail = () => {


  const { id } = useParams()
  const { user } = useAuth()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [phone, setPhone] = useState('')


  const [error, setError] = useState(null)

  useEffect(() => {
  const fetchRoom = async () => {
    try {

      if (!id) return
      setLoading(true)

      const room = await getRoomyById(id);

      console.log('room info', room)

      setRoom(room)


    } catch (error) {
      console.error('Error fetching article:', err)
    } finally {
      setLoading(false)
    }
  }
  fetchRoom();
}, [id, , user])

// handle booking
const handleBooking = async (e)=>{
e.preventDefault()
const newBooking = {
  name,
  email,
  check_in : checkIn,
  check_out : checkOut,
  room_id: room.id,
  room_name: room.title,
  room_type: room.room_type,
  price: room.price,
  phone

}
try {

  await createBooking(newBooking)
  
} catch (error) {

  console.error(error)
  
}
console.log(newBooking);
}

if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

if (!room) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Article not found</h2>
      <p className="mt-2 text-gray-600">The room you're looking for doesn't exist or has been removed.</p>
      <Link to="/create" className="mt-4 inline-block text-blue-600 hover:underline">
        Browse all rooms
      </Link>
    </div>
  )
}

  return (
    <section className="">
      <div className="bg-cover bg-center h-[560px] relative flex justify-center items-center">
        <img className="object-cover w-full h-full" src={Img3} alt="" />
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/70 flex justify-center items-center">
          <h1 className="text-6xl text-white text-center">
            Luxury Room Details
          </h1>
        </div>
        {/* Title */}
      </div>
      <div className="container mx-auto items-center">
        <div className="flex flex-col lg:flex-row h-full py-24 gap-5">
          {/* Left */}

          <div className="w-full h-full px-10 lg:w-[60%]">
            <h2 className="text-[45px] mb-4">
              {room.title}
            </h2>
            <p className="mb-4">
              {room.content}
            </p>
            {room.featured_image && (
              <img className="w-full mb-8" src={room.featured_image} alt="" />
            )}
            

            <h3 className="text-2xl font-semibold tracking-[1px] mb-2">
              Room Facilitates
            </h3>
            <p className="mb-12">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
              eveniet ratione magni ipsa quibusdam exercitationem animi
              accusamus nulla, laborum excepturi laboriosam sit, fuga corrupti
              delectus consequatur at quis vel minima!
            </p>

            <div className="grid grid-cols-3 gap-2 mb-12">
              <div className="p-2 flex items-center gap-x-3">
                <FaWifi className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">WiFi</span>
              </div>

              <div className="p-2 flex items-center gap-x-3">
                <FaCoffee className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">Coffee</span>
              </div>

              <div className="p-2 flex items-center gap-x-3">
                <FaBath className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">Bath</span>
              </div>
              <div className="p-2 flex items-center gap-x-3">
                <FaParking className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">Packing Space</span>
              </div>
              <div className="p-2 flex items-center gap-x-3">
                <FaSwimmingPool className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">Swimming Pool</span>
              </div>
              <div className="p-2 flex items-center gap-x-3">
                <FaHotdog className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">Breakfast</span>
              </div>
              <div className="p-2 flex items-center gap-x-3">
                <FaStopwatch className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">GYM</span>
              </div>
              <div className="p-2 flex items-center gap-x-3">
                <FaCocktail className="text-3xl text-yellow-700" />{" "}
                <span className="text-base">Drinks</span>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="w-full h-full lg:w-[40%]">
            <div className="py-8 px-6 bg-yellow-900/20">
              <div className="flex flex-col space-y-4 mb-4">
                <h3>Your Reservation</h3>
                <form onSubmit={handleBooking}>
                <div>
                 
                 <input
                   type="text"
                   name="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   placeholder="Enter Name"
                   class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                 />
               </div>
               <div>
                 
                 <input
                   type="email"
                   name="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   placeholder="Enter Email"
                   class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                 />
               </div>
               <div>
                 
                 <input
                   type="text"
                   value={phone}
                   onChange={(e)=>setPhone(e.target.value)}
                   placeholder="Enter Phone"
                   class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                 />
               </div>
                <div>
                 
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e)=>setCheckIn(e.target.value)}
                    class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                  />
                </div>

                <div>
                 
                 <input
                   type="date"
                   value={checkOut}
                   onChange={(e)=>setCheckOut(e.target.value)}
                   class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                 />
               </div>
                
                <div>
                  
                  <input
                    type="text"
                    value={room?.title}
                    disabled
                    class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                  />
                </div>
                <div>
                 
                 <input
                   type="text"
                   value={room?.price}
                   disabled
                   class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                 />
               </div>
               <div>
                 
                 <input
                   type="text"
                   value={room?.room_type}
                   disabled
                   class=" bg-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700"
                 />
               </div>
                {/* btn */}
                <div>
                  <button type="submit" className="bg-yellow-700 hover:bg-yellow-800 text-xl text-white mt-1 block w-full rounded border border-gray-300 px-2 py-4 focus:ring focus:ring-yellow-700">Booking</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetail;
