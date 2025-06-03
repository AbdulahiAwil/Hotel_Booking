// pages/ContactUs.jsx
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import Img1 from '../Images/heroSlider/1.jpg'
// import Img2 from '../Images/heroSlider/2.jpg' // ✅ Replace with your image path

const ContactUs = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img
          src={Img1}
          alt="Contact Us Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-widest text-center">
            Contact Our Hotel Booking Team
          </h1>
        </div>
      </div>

      {/* Contact Content */}
      <main className="flex items-center justify-center px-4 py-16 bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl max-w-4xl w-full p-8 md:p-16 text-center">
          {/* Purpose */}
          <p className="text-gray-600 text-lg mb-8">
            Need to book a room, ask a question, or talk to our support team?
            <br />
            Reach out via your preferred social platform — we’re here 24/7.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center flex-wrap gap-6 text-3xl text-gray-600 mb-12">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/252907499989"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Your Hotel Name. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
