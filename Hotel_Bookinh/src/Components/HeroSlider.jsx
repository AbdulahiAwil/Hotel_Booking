import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
// import swiper slides
import 'swiper/css'
import 'swiper/css/effect-fade'
// import required modules
// import { EffectFade, Autoplay } from 'swiper'

// images 
import Img1 from '../Images/heroSlider/1.jpg'
import Img2 from '../Images/heroSlider/2.jpg'
import Img3 from '../Images/heroSlider/3.jpg'

const slides = [
    {
        title: 'Your Luxury Hotel For Vacation',
        bg: Img1,
        btnText: 'Room & Suites',
    },
    {
        title: 'Your Luxury Hotel For Vacation',
        bg: Img2,
        btnText: 'Room & Suites',
    },
    {
        title: 'Your Luxury Hotel For Vacation',
        bg: Img3,
        btnText: 'Room & Suites',
    },
]

function HeroSlider() {
    
  return (
    <Swiper className='h-[600px] lg:h-[860px]'>
        {slides.map((slide, index) => {
            const { title, bg, btnText } = slide;
            return(
            <SwiperSlide className='h-full bg-amber-500 relative flex justify-center items-center' key={index}>
                <div className='z-20 h-full flex justify-center items-center text-white text-center'>

                    <div>Just Enjoy and Relax</div>

                </div>
                <div className='absolute top-0 w-full h-full'>
                    <img src={bg} className='object-cover h-full w-full' 
                    alt="" />
                </div>
                {/* Overlay */}

                <div className='absolute w-full h-full bg-black/70'></div>
                
            </SwiperSlide>
            )
        })}
    </Swiper>
  )
}

export default HeroSlider