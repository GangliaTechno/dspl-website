import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faWrench, faBox, faDollarSign, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Background from "./Background"; // Import Hero Image component
import { motion } from "framer-motion";

export default function ProductService() {
  const images = ["/assets/pic1.png", "/assets/pic2.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center text-white">
        <Background /> {/* Background Image */}
        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50">
        <motion.h1
          className="relative text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-center z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          GenAlpha Portable Kit
        </motion.h1>
        </div>
      </div>

      {/* Product Section */}
      <div className="relative flex flex-col items-center p-10 space-y-10 z-10 mt-10">
        <section className="text-center relative w-80 mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">About the Product</h2>
          <div className="mt-6 mb-20 relative">
            {/* Image with fade transition */}
            <div className="bg-transparent relative w-80 h-80 mx-auto">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Left Arrow */}
            <button
              className="absolute top-1/2 -left-14 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900 transition"
              onClick={handlePrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* Right Arrow */}
            <button
              className="absolute top-1/2 -right-14 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900 transition"
              onClick={handleNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        {/* Main Content Wrapper */}
        <div className="w-full bg-gray-100 py-10 flex flex-col items-center relative z-10">
          {/* Key Features Section */}
          <section className="relative w-full max-w-5xl">
            <div className="relative p-6 m-2 bg-red-100 bg-opacity-30 border border-red-100 divide-y divide-white">
              <h2 className="text-3xl font-bold text-center text-gray-800">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Feature title="Integrated Hardware" description="Combines IC 555 timers, Arduino, and Raspberry Pi for comprehensive electronics learning." />
                <Feature title="Dual Screens" description="Facilitates simultaneous programming and real-time project demonstrations." />
                <Feature title="Error Detection Technology" description="Real-time troubleshooting for simplified circuit learning." />
                <Feature title="Hybrid Learning" description="Built-in Zoom-enabled screen and top camera support remote instruction and hands-on activities." />
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="w-full max-w-4xl text-center mt-10">
            <h2 className="text-3xl font-bold text-gray-800">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mr-2 ml-2">
              <Benefit icon={faGraduationCap} title="Empowering Students" description="Offers hands-on STEM learning from basic circuits to IoT applications." />
              <Benefit icon={faWrench} title="Inclusive Design" description="Pin-based breadboards ensure safety for beginners while supporting advanced projects." />
              <Benefit icon={faBox} title="Portability" description="A compact, all-in-one lab for schools, colleges, and remote learners." />
              <Benefit icon={faDollarSign} title="Affordability" description="Locally sourced components make it accessible to a broader audience." />
            </div>
          </section>

          {/* Impact Section */}
          <section className="text-center mt-10">
            <h2 className="text-3xl font-bold text-gray-800">Impact</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              The GenAlpha Portable Lab bridges gaps in STEM education, enhances problem-solving skills, and promotes innovation among students and educators. It’s a transformative tool preparing the next generation for the challenges of tomorrow.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="p-4 border border-white rounded-lg">
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function Benefit({ icon, title, description }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-14 h-9 flex items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg">
        <FontAwesomeIcon icon={icon} className="text-xl" fixedWidth />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}
