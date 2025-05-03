import React from 'react'
import { BsArrowsFullscreen, BsCurrencyDollar, BsPeople } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa6";
import { Link } from 'react-router';

const RoomCard = ({room}) => {
    const { id, title, content, author, price, createdAt, created_at, featured_image, room_type } = room
  return (
    <div className='bg-white shadow-2xl min-h-[500px] group'>
          {/* Featured Image */}
          {featured_image && (
                <div className="overflow-hidden">
                    <img
                        src={featured_image}
                        alt={title}
                        className="group-hover:scale-110 transition-all duration-300 w-full"
                    />
                </div>
               
                
            )}
                 {/* // details */}
            <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase tracking-[1px] font-semibold text-base'>
            <div className='flex justify-between w-[80%]'>
                {/* Size */}
                <div className='flex items-center gap-x-2'>
                    <div className='text-yellow-700'>
                        <FaMoneyBillWave className='text-[15px]'/>
                    </div>
                    <div className='flex-gap-x-1'>
                        
                        <div>{price}$</div>
                    </div>

                </div>
                {/* Room capacity */}
                <div className='flex items-center gap-x-2'>
                    <div className='text-yellow-700'>
                        <BsPeople className='text-[15px]'/>
                    </div>
                    <div className='flex-gap-x-1'>
                        
                        <div>{room_type}</div>
                    </div>

                </div>
            </div>
            </div>
            {/* Title and description */}
            <div className='text-center'>
                <Link to={`/room/${room.id}`}>
                <h3 className='text-2xl font-semibold tracking-[1px] mb-2'>{title}</h3>
                </Link>
                <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>{content.slice(0, 56)}</p>
            </div>
            {/* btn */}
            <Link to={`/room/${room.id}`} className='text-[11px] tracking-[3px] uppercase text-white flex-1 transition-all px-8 flex justify-center items-center h-[48px]  bg-black hover:bg-yellow-700 max-w-[245px] mx-auto mb-8'>
                Book now from ${price}
            </Link>
    </div>
  )
}

export default RoomCard