import React from 'react'
import { teamData } from '../data'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'


const Team = () => {
    const {
        pretitle,
        title,
        sub1,
        sub2,
        name,
        occupation,
        signatureImg,
        chefImg

    } = teamData
  return (
    <section className='relative top-60 mb-50 z-10 lg:top[480px] min-h-[720px]'>
        <div className='container mx-auto mb-[100px]'>
            {/* wrapper text and image */}
            <div className='flex flex-col lg:flex-row lg:gap-x-[120px] items-center lg:items-start'>
                <motion.div 
                    variants={fadeIn('up', 'tween',0.6,1.6)}
                    initial='hidden'
                    whileInView={'show'}
                 className='flex-1 text-center lg:text-left lg:pt-16'>
                    <div className='font-bold text-base uppercase tracking-[-0.04em] text-yellow-800 mb-2'>{pretitle}</div>
                    <h2 className='font-black text-[46px] mb-4 leading-[1.1] capitalize'>{title}</h2>
                    <p className='mb-10'>{sub1}</p>
                    <p>{sub2}</p>
                    <div className='my-[26px]'>
                        <div className='text-2xl capitalize font-semibold text-yellow-700'>{name}</div>
                        <div className='text-[15px] capitalize font-semibold text-gray/70'>{occupation}</div>
                    </div>
                    <div className='flex justify-center lg:justify-start mb-6 lg:mb-0'>
                        <img src={signatureImg} alt="" />
                    </div>
                </motion.div>
                {/* image */}
                <motion.div
                    variants={fadeIn('up', 'tween',0.7,1.6)}
                    initial='hidden'
                    whileInView={'show'}

                 className='flex-1'>
                    <img src={chefImg} alt="" />
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Team