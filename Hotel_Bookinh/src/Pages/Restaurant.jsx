import { Section } from 'lucide-react'
import React from 'react'
import RestImage from '../Images/bg.png'
import About from '../Components/About'
import MenuRest from '../Components/MenuRest'
import Team from '../Components/Team'


function Restaurant() {

  return (
    <>
  <section className="w-full overflow-hidden bg-repeat">
    {/* Hero Section */}
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[560px] bg-cover bg-center flex justify-center items-center">
      <img
        className="w-full h-full object-cover"
        src={RestImage}
        alt="Restaurant"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold">
          Restaurant
        </h1>
      </div>
    </div>

    {/* Other Sections */}
    <About />
    <MenuRest />

    <div className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-6">Watch Our Hotel Restaurant Cafe</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[300px] md:h-[400px] rounded-xl"
              src="https://www.youtube.com/embed/NC9KlaxtfLg"
              title="Hotel Tour Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

    <Team />
    
  </section>
</>

  )
}

export default Restaurant