import React from 'react'
import { BsArrowsFullscreen, BsCurrencyDollar, BsPeople } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa6";
import { Link } from 'react-router';

const RoomCard = ({room}) => {
    const { id, title, content, author, price, createdAt, created_at, featured_image, room_type } = room
  return (
   <div className="bg-white shadow-2xl rounded-lg overflow-hidden group flex flex-col justify-between h-full">
  {/* Featured Image */}
  {featured_image && (
    <div className="overflow-hidden">
      <img
        src={featured_image}
        alt={title}
        className="group-hover:scale-110 transition-transform duration-300 w-full h-[220px] object-cover"
      />
    </div>
  )}

  {/* Details */}
  <div className="bg-white shadow-md w-[90%] max-w-sm mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center rounded-md text-xs sm:text-sm md:text-base uppercase tracking-wide font-semibold">
    <div className="flex justify-between w-[85%]">
      {/* Price */}
      <div className="flex items-center gap-x-2 text-yellow-700">
        <FaMoneyBillWave className="text-[15px]" />
        <div>{price}$</div>
      </div>

      {/* Room Type */}
      <div className="flex items-center gap-x-2 text-yellow-700">
        <BsPeople className="text-[15px]" />
        <div>{room_type}</div>
      </div>
    </div>
  </div>

  {/* Title and Description */}
  <div className="text-center px-4">
    <Link to={`/room/${room.id}`}>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide mb-2">
        {title}
      </h3>
    </Link>
    <p className="text-sm sm:text-base max-w-md mx-auto mb-4 text-gray-600">
      {content.slice(0, 56)}
    </p>
  </div>

  {/* Book Button */}
  <Link
    to={`/room/${room.id}`}
    className="text-[10px] sm:text-xs tracking-widest uppercase text-white flex justify-center items-center h-12 bg-black hover:bg-yellow-700 transition-all w-[90%] max-w-[245px] mx-auto mb-6 rounded-full"
  >
    Book now from ${price}
  </Link>
</div>

  )
}

export default RoomCard