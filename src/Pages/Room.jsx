import React from 'react'
import Rooms from '../Components/Rooms'
import Img3 from "../Images/heroSlider/3.jpg";

const Room = () => {
  return (
   <section>
    <div className="bg-cover bg-center h-[560px] relative flex justify-center items-center">
        <img className="object-cover w-full h-full" src={Img3} alt="" />
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/70 flex justify-center items-center">
          <h1 className="text-6xl text-white text-center">
             Rooms
          </h1>
        </div>
        {/* Title */}
      </div>
      <Rooms />
   </section>
  )
}

export default Room