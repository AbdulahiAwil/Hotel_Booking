import React from 'react';
import { aboutData } from '../data';

const About = () => {
  const { pretitle, title, subtitle, btnText, image } = aboutData;

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20"
>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-y-10 lg:gap-x-20">
          
          {/* Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="text-yellow-800 text-sm sm:text-base font-bold uppercase tracking-widest mb-2">
              {pretitle}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 capitalize mb-4">
              {title}
            </h2>

            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-6">
              {subtitle}
            </p>

            <button className="h-12 sm:h-14 px-6 sm:px-10 bg-yellow-700 text-white rounded-full font-semibold tracking-wide hover:bg-yellow-600 transition duration-300 capitalize">
              {btnText}
            </button>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={image}
              alt="About"
              className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] xl:w-[460px] 2xl:w-[500px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
