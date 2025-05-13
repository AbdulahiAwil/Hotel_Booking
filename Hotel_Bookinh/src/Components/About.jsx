import React from 'react'
import { motion } from 'framer-motion'
import { aboutData } from '../data'
import { plateVariants, staggerContainer, fadeIn } from '../Variants'
const About = () => {
    const { pretitle, title, subtitle, btnText, image} = aboutData
  return (
    <section className='min-h-[620px] min-w-screen'>
        <div className='container mx-auto min-h-[620px]'>
            {/* text-image wrapper */}
            <motion.div
                variants={staggerContainer}
                initial='hidden'
                whileInView={'show'}
                viewport={{once: false, amount:0.6} }
                className='min-h-[620px] flex flex-col lg:flex-row items-center'>
                {/* text */}
                <motion.div variants={fadeIn('right', 'tween', 0.2, 1.8)} className='flex-1 text-center lg:text-left'>
                    <div className='font-bold text-base uppercase tracking-[-0.04em] text-yellow-800 mb-2'>{pretitle}</div>
                    <h2 className='font-black text-[46px] mb-4 leading-[1.1] capitalize'>{title}</h2>
                    <p className='mb-8 text-gray-600 max-w-[560px]'>{subtitle}</p>
                    <button className='h-14 rounded-full bg-yellow-700 px-[42px] text-white text-base font-secondary font-semibold tracking-[0.02em] outline-none hover:bg-yellow-600-hover transition-all duration-300 flex justify-center items-center capitalize mx-auto lg:mx-0'>
                        {btnText}
                    </button>
                </motion.div>
                {/* image */}
                <motion.div variants={plateVariants} className='-mb-[300px] -mr-[186px] z-10'>
                    <img src={image} alt="" />
                </motion.div>
            </motion.div>
        </div>

    </section>
  )
}

export default About