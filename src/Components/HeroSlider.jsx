import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
// import swiper slides
import 'swiper/css'
import 'swiper/css/effect-fade'
// import required modules
import { EffectFade, Autoplay } from 'swiper/modules'

// images 
import Img1 from '../Images/heroSlider/1.jpg'
import Img2 from '../Images/heroSlider/2.jpg'
import Img3 from '../Images/heroSlider/3.jpg'

const slides = [
    {
        title: 'Your Luxury Hotel For Vacation',
        bg: Img1,
        btnText: 'See Our Rooms',
    },
    {
        title: 'Your Luxury Hotel For Vacation',
        bg: Img2,
        btnText: 'See Our Rooms',
    },
    {
        title: 'Your Luxury Hotel For Vacation',
        bg: Img3,
        btnText: 'See Our Rooms',
    },
]

function HeroSlider() {
    
  return (
    <Swiper 
    modules={[EffectFade, Autoplay]}
    effect={'fade'}
    loop={true}
    autoplay={{
        delay: 3000,
        disableOnInteraction: false,
    }}
    className='heroSlider h-[600px] lg:h-[860px]'>
        {slides.map((slide, index) => {
            const { title, bg, btnText } = slide;
            return (
              <SwiperSlide
                className="h-full bg-pink-400 relative flex justify-center items-center"
                key={index}
              >
                {/* Background Image Layer */}
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                  <img
                    src={bg}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center px-4 text-center">
                  {/* Small Text */}
                  <div className="text-white uppercase tracking-[3px] sm:tracking-[4px] md:tracking-[6px] text-sm sm:text-base mb-4">
                    Just Enjoy and Relax
                  </div>

                  {/* Title */}
                  <h1 className="text-white uppercase font-semibold leading-tight tracking-[1px] sm:tracking-[2px] max-w-[90%] sm:max-w-[600px] md:max-w-[720px] lg:max-w-[920px] text-2xl sm:text-4xl md:text-5xl lg:text-[68px] mb-6">
                    {title}
                  </h1>

                  {/* Button */}
                  <button className="bg-yellow-700 hover:bg-yellow-900 transition-colors duration-300 text-white uppercase tracking-widest text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-4 rounded-md">
                    {btnText}
                  </button>
                </div>
              </SwiperSlide>
            );
        })}
    </Swiper>
  )
}

export default HeroSlider