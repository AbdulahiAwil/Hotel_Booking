import { Section } from 'lucide-react'
import React from 'react'
import RestImage from '../Images/bg.png'
import About from '../Components/About'
import MenuRest from '../Components/MenuRest'
import Team from '../Components/team'


function Restaurant() {

  return (
    <>
    <section className='h-full bg-repeat min-w-[1800px] overflow-hidden'>
      <div className="bg-cover bg-center h-[560px] relative flex justify-center items-center w-full">
              <img className=" w-full h-full" src={RestImage} alt="" />
              {/* Overlay */}
              <div className="absolute w-full h-full flex justify-center items-center">
                <h1 className="text-6xl text-white text-center">
                   Restaurant
                </h1>
              </div>
              {/* Title */}
            </div>
           
                <About />
               <MenuRest />
               <Team />
            
          
    </section>
    
    </>
  )
}

export default Restaurant