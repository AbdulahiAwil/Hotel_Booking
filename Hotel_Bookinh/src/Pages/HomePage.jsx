import React, { useState } from 'react'
import HeroSlider from '../Components/HeroSlider'
import Rooms from '../Components/Rooms'

function HomePage() {
  





  return (
  <>
  <section className="w-full overflow-hidden">
    {/* Hero Slider Section */}
    <div className="w-full h-auto bg-white">
      <HeroSlider />
    </div>

    {/* Rooms Section */}
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <Rooms />
    </div>
  </section>
</>

   

  )
}

export default HomePage