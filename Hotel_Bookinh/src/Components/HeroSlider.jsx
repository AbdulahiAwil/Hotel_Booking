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
            return(
            <SwiperSlide className='h-full bg-pink-400 relative flex justify-center items-center' key={index}>

                
                    
                
                <div className='absolute top-0 w-full h-full'>
                    <img src={bg} alt="" className='object-cover w-full h-full'/>
                </div>

                <div className='absolute w-full h-full flex flex-col justify-center items-center bg-black/70'>
                <div className='text-white text-center uppercase tracking-[6px] mb-5'>Just Enjoy and relax</div>
                <h1 className='w-[800px] text-[32px] font-medium text-white text-center uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>
                    {title}
                </h1>
                <button className='text-[15px] tracking-[3px] upparcase text-white transition-all px-8 py-4 flex justify-center items-center bg-yellow-700 border-none cursor-pointer hover:bg-yellow-900'>{btnText}</button>
                </div>
               

            </SwiperSlide>
            )
        })}
    </Swiper>
  )
}

export default HeroSlider