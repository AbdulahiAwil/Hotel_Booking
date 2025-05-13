// import React from 'react'
import React from 'react'
import { easeOut, motion } from 'framer-motion'
import { menuData } from '../data'
import backgroundMenu from '../Images/menu/bg.png'
import { staggerContainer, fadeIn } from '../Variants'

const MenuRest = () => {
    const {title, subtitle, modelImg, menuItems, btnText} = menuData
  return (
    <section className="min-h-[780px]">
      <div className="bg-yellow-300 h-[780px] absolute w-full min-w-screen -z-0">
        <img src={backgroundMenu} className="w-full" alt="" />
      </div>
      {/* text */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.6 }}
        className="relative z-10 top-72 lg:top-52"
      >
        <motion.div
          variants={fadeIn("top", "tween", 0.2, 1.8)}
          className="container mx-auto flex flex-col items-center text-center"
        >
          <h2 className="font-black text-[46px] mb-4 leading-[1.1] capitalize text-white max-w-[400px]">
            {title}
          </h2>
          <p className="text-white/70 capitalize mb-8"> {subtitle} </p>
          <div>
            <img src={modelImg} alt="" />
          </div>
        </motion.div>
      </motion.div>
      {/* Menu gallery */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "tween",
          delay: 0.2,
          duration: 1.6,
          ease: "easeOut",
        }}
        className="relative top-80 lg:top-[150px]"
      >
        <div className="container mx-auto">
          <div className="lg:mt-24 min-h-[590px] z-30 mb-8 md:mb-4 xl:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[590px]">
              {menuItems.map((item, index) => {
                const { name, price, image, description } = item;
                return (
                  <div key={index}>
                    <div className="flex flex-row lg:flex-col h-full">
                      <div
                        className={`w-[45%] md:w-auto ${
                          index === 1 || index === 3
                            ? "lg:order-1"
                            : "order-none"
                        }`}
                      >
                        <img className="min-w-full" src={image} alt="" />
                      </div>
                      {/* text */}
                      <div className="bg-[#fff3e4] flex-1 flex flex-col justify-center px-6 lg:p-12 lg:max-h-[250px] xl:max-h-max">
                        <div>
                          <div className="text-xl font-semibold text-gray-700 xl:text-2xl">
                            {name}
                          </div>
                          <div className="my-1 text-[20px] lg:text-[40px] lg:my-6 text-yellow-600 font-semibold">
                            {price}
                          </div>
                          <div className="">{description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default MenuRest