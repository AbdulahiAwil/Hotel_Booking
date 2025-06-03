import React from 'react';
import Img1 from '../Images/heroSlider/1.jpg'
import Img2 from '../Images/heroSlider/2.jpg' // Replace with actual path
import { FaStar } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        <img
          src={Img1}
          alt="About Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-5xl font-bold text-center">
            About Us
          </h1>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img
              src={Img2}
              alt="Hotel"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Welcome to Paradise Stay
            </h2>
            <p className="text-gray-700 mb-6">
              Experience luxury and comfort at its finest. Paradise Stay offers
              a peaceful escape in the heart of the city, combining world-class
              service with contemporary elegance.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Modern Rooms & Suites</li>
              <li>Fine Dining & 24/7 Room Service</li>
              <li>Free High-Speed WiFi</li>
              <li>Swimming Pool & Fitness Center</li>
              <li>Complimentary Breakfast</li>
              <li>Easy Online Booking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-6">Watch Our Hotel Tour</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[300px] md:h-[400px] rounded-xl"
              src="https://www.youtube.com/embed/s8vnc9l8sz4"
              title="Hotel Tour Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      
      {/* Testimonials */}
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-semibold mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Emma Stone',
                quote:
                  'An amazing experience! Clean rooms, great food, and the staff was extremely helpful.',
              },
              {
                name: 'Michael James',
                quote:
                  'Perfect for a weekend getaway. The pool and restaurant were top-notch!',
              },
              {
                name: 'Sophia Lee',
                quote:
                  'This hotel exceeded our expectations. Everything was smooth from check-in to check-out.',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-yellow-50 rounded-xl p-6 shadow-md text-left"
              >
                <p className="text-sm text-gray-700 italic mb-4">
                  “{testimonial.quote}”
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    {testimonial.name}
                  </span>
                  <div className="flex text-yellow-600 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-yellow-700 py-16 text-center px-4">
        <h2 className="text-white text-3xl font-bold mb-4">
          Ready for Your Stay?
        </h2>
        <p className="text-white text-lg mb-6">
          Book your room now and experience unforgettable hospitality.
        </p>
        <a
          href="/room"
          className="bg-white text-yellow-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition"
        >
          Book a Room
        </a>
      </div>
    </section>
  );
};

export default AboutUs;
