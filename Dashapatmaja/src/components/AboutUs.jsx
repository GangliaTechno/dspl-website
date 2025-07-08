import React from 'react';
import { motion } from "framer-motion";
import Background from "./Background";
import { FaShoppingBag, FaGraduationCap, FaFlask } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  const industries = [
    {
      title: "Branding and Ecommerce",
      icon: <FaShoppingBag className="text-red-500 text-5xl" />,
      description:
        "Innovative solutions to enhance brand presence and optimize online commerce strategies.",
      path: "/branding",
    },
    {
      title: "Edtech",
      icon: <FaGraduationCap className="text-yellow-500 text-5xl" />,
      description:
        "Advanced learning platforms and smart educational tools for the future of education.",
      path: "/edtech",
    },
    {
      title: "Research and Development",
      icon: <FaFlask className="text-green-500 text-5xl" />,
      description:
        "Driving innovation with cutting-edge research in AI, healthcare, and smart technologies.",
      path: "/research",
    },
  ];

  // Animation variant for fade up effect
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <section className="relative flex flex-col items-center justify-center h-[400px] text-white text-center px-4 overflow-hidden">
        <Background />
        <motion.h1
          className="relative text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-center z-10" 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
      </section>

      {/* Hero Section for About the Company */}
      <section className="bg-gray-100 py-20 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">Dashapatmaja Solutions Pvt. Ltd</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Dashapatmaja Solutions Pvt. Ltd. was founded on a mission to blend technology with care, driving innovation across industries to create meaningful, transformative solutions.
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mt-4">
          Established in 2023 and incubated at the Manipal Universal Technology Business Incubator in Manipal, we bring together a multidisciplinary team of professionals from engineering, healthcare, management, and technology to solve real-world challenges.
        </p>
      </section>

      {/* Our Journey Section with Animation */}
      <section className="py-10">
        <motion.h2 
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Journey
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 1 }}
        >
<div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
  <div className="flex justify-center mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
  <h3 className="text-xl font-semibold mb-2 text-center">2023</h3>
  <p className="text-gray-700 text-center">
    - Formed with a vision to innovate at the intersection of technology, education, and research.
  </p>
  <p className="text-gray-700 text-center">
    - Incubated at GOK Bioincubator, Manipal.
  </p>
  
</div>

         
          {/* 2024 Milestone */}
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">2024</h3>
              <p className="text-gray-700 text-center">
    - Launch of flagship projects, including the GenAlpha Portable.
               </p>
            <p className="text-gray-700 text-center">
    - Launch of premium Ayurvedic brand - Raw Radicles.
               </p>
          
          </div>
          {/* Incubation Milestone */}
           {/* 2024 Milestone */}
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">2025</h3>
            <p className="text-gray-700 text-center">
             - Recieved Grant From MUTBI,MAHE,Manipal under the NIDHI-PRAYAS Scheme.
            </p>
             <p className="text-gray-700 text-center">
             - Signed a MOU with Amruthanjali Ayurveda for manufacturing and supply of premium Ayurvedic products.
            </p>
          </div>
          
        </motion.div>
      </section>

      {/* Our Industries of Impact Section with Animation */}
      <section className="py-16 bg-gray-50">
        <motion.h2 
          className="text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Our Industries of Impact
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-700 text-center mb-12 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We serve a wide range of sectors, delivering innovative solutions tailored to each industry's needs.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-8 px-6"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.2 }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              className="w-80 bg-white p-6 border border-gray-300 rounded-lg text-center shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(industry.path)}
            >
              <div className="flex justify-center mb-4">{industry.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{industry.title}</h3>
              <p className="text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export default AboutUs;
