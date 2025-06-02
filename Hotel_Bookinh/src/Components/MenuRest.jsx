import React from 'react'
import { motion } from 'framer-motion'
import { menuData } from '../data'
import backgroundMenu from '../Images/menu/bg.png'
import { staggerContainer, fadeIn } from '../Variants'

const MenuRest = () => {
  const { title, subtitle, modelImg, menuItems, btnText } = menuData;

  return (
    <section className="relative w-full bg-yellow-300">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <img src={backgroundMenu} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Content Wrapper */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.6 }}
        className="relative z-10 pt-20 md:pt-32 lg:pt-40 pb-10"
      >
        {/* Heading and Image */}
        <motion.div
          variants={fadeIn("top", "tween", 0.2, 1.8)}
          className="container mx-auto px-4 flex flex-col items-center text-center"
        >
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4 max-w-xl">
            {title}
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-md">{subtitle}</p>
          <div className="w-[200px] sm:w-[300px] md:w-[400px] mx-auto">
            <img src={modelImg} alt="Model" className="w-full object-contain" />
          </div>
        </motion.div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          delay: 0.2,
          duration: 1.6,
          ease: "easeOut",
        }}
        className="relative z-10 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item, index) => {
              const { name, price, image, description } = item;
              return (
                <div key={index} className="bg-[#fff3e4] rounded-lg overflow-hidden shadow-md">
                  <div className="w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 lg:p-6 flex flex-col justify-between h-full">
                    <div className="text-xl font-semibold text-gray-700">{name}</div>
                    <div className="text-yellow-600 text-lg sm:text-xl font-bold my-2">{price}</div>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default MenuRest;
