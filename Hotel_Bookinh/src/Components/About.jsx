import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../data';
import { plateVariants, staggerContainer, fadeIn } from '../Variants';

const About = () => {
  const { pretitle, title, subtitle, btnText, image } = aboutData;

  return (
    <section className="w-full py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.6 }}
          className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20"
        >
          {/* Text */}
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1.8)}
            className="flex-1 text-center lg:text-left"
          >
            <div className="text-yellow-800 text-base font-bold uppercase tracking-wide mb-2">
              {pretitle}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 capitalize">
              {title}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 text-base sm:text-lg">
              {subtitle}
            </p>
            <button className="h-14 px-10 bg-yellow-700 text-white rounded-full font-semibold tracking-wide hover:bg-yellow-600 transition-all duration-300 capitalize">
              {btnText}
            </button>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={plateVariants}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <img
              src={image}
              alt="About Image"
              className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px] xl:w-[500px] object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
