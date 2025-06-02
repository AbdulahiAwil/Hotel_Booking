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
  } = teamData;

  return (
    <section className="relative z-10 py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-x-16">
          {/* Text Side */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.6, 1.6)}
            initial="hidden"
            whileInView="show"
            className="flex-1 text-center lg:text-left mt-10 lg:mt-0"
          >
            <div className="text-yellow-800 uppercase text-sm font-bold tracking-wide mb-2">{pretitle}</div>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black mb-4 leading-tight capitalize">{title}</h2>
            <p className="text-gray-700 mb-6">{sub1}</p>
            <p className="text-gray-600 mb-6">{sub2}</p>
            <div className="mb-6">
              <div className="text-xl font-semibold text-yellow-700">{name}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">{occupation}</div>
            </div>
            <div className="flex justify-center lg:justify-start">
              <img src={signatureImg} alt="Signature" className="h-12 w-auto" />
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.7, 1.6)}
            initial="hidden"
            whileInView="show"
            className="flex-1"
          >
            <img
              src={chefImg}
              alt="Chef"
              className="w-full max-w-[450px] mx-auto lg:mx-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Team;
