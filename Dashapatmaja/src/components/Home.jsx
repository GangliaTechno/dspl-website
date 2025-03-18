import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Background from "./background";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const industries = [
    {
      title: "Branding and Ecommerce",
      image: "assets/branding.jpg",
      description: [
        <>
          We specialize in developing cutting-edge technologies and products
          that enhance both physical and mental well-being. Our focus is on
          creating solutions that improve healthcare accessibility, promote
          overall wellness, and integrate seamlessly into daily life.
        </>,
        <>
          Our offerings include <strong>innovative medical devices</strong>{" "}
          designed for better patient care,{" "}
          <strong>wellness applications</strong> that support healthy living and
          mental well-being, and{" "}
          <strong>personalized healthcare solutions</strong> powered by AI and
          data analytics to provide tailored health recommendations.
        </>,
      ],
    },
    {
      title: "Ed-Tech",
      image: "assets/edtech.jpg",
      description: [
        <>
          We specialize in <strong>edge computing solutions</strong>, bringing
          processing power closer to data sources to enhance speed, efficiency,
          and real-time decision-making. Our expertise ensures seamless
          integration of smart technologies while optimizing performance for
          various industries.
        </>,
        <>
          Our services include <strong>IoT integration</strong> for real-time
          data processing,
          <strong> smart device development</strong> to enable efficient edge
          operations, and <strong>data security solutions</strong> that
          safeguard edge devices and networks with robust protection measures.
        </>,
      ],
    },
    {
      title: "Research and Development",
      image: "assets/research.jpg",
      description: [
        <>
          Our <strong>R&D division</strong> is the driving force behind our
          innovation, constantly developing new technologies and enhancing
          existing solutions. Through continuous research and experimentation,
          we push the boundaries of advancement across various fields.
        </>,
        <>
          Our focus areas include <strong>biomedical research</strong> for
          groundbreaking health solutions,{" "}
          <strong>technological innovation</strong> in AI, machine learning, and
          edge computing, and <strong>collaborative projects</strong> with
          academic and industry leaders to accelerate innovation.
        </>,
      ],
    },
  ];

  const whychooseus = [
    {
      title: "Expertise Across Domains",
      description:
        "Strong foundation in Branding, E-commerce, Ed-Tech, and R&D to cater to diverse business needs.",
      icon: "📌",
    },
    {
      title: "Innovation-Driven Solutions",
      description:
        "Cutting-edge technology and research to create impactful and future-ready solutions.",
      icon: "🚀",
    },
    {
      title: "Customized Approach",
      description:
        "Tailored strategies that align with your business goals for maximum success.",
      icon: "🎯",
    },
    {
      title: "Global Impact",
      description:
        "Helping businesses scale and make a meaningful difference worldwide.",
      icon: "🌍",
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen md:h-[130vh] text-white flex flex-col justify-center items-center text-center px-4">
       <Background/>
        <div className="relative z-10 max-w-6xl px-4 mb-56">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Innovating Today for a <br /> Smarter Tomorrow
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-left font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            At Dashapatmaja Solutions, we specialize in three core domains –
            Branding & E-commerce, Ed-Tech, and Research & Development. We
            empower businesses to establish strong brands, develop innovative
            educational technology solutions, and drive cutting-edge research
            that makes a global impact.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col md:flex-row gap-6 md:gap-x-10 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button
              className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded w-full md:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OUR PRODUCTS
            </motion.button>
            <motion.button
              className="border border-white px-6 py-3 font-semibold rounded w-full md:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="relative min-h-full -mt-32 flex flex-col md:flex-row items-center md:items-start shadow-lg rounded-lg bg-white lg:ml-44 lg:mr-40">
        {/* Left Section */}
        <div
          className={`min-h-full bg-yellow-400 text-black p-6 md:p-14 md:w-1/2 w-full transition-all duration-1000 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-20 opacity-0"
          }`}
        >
          <h2 className="text-lg font-semibold">Why Choose Us?</h2>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">
            Innovate. Educate. Elevate
          </h1>
          <p className="mt-4 text-base md:text-lg">
            At Dashapatmaja Solutions, we believe in innovation as the driving
            force behind transformation—whether in branding, e-commerce, or
            technology. Through education, we empower individuals and businesses
            with cutting-edge Ed-Tech solutions that foster learning and growth.
            Our commitment to elevation ensures that our research and
            development initiatives push boundaries, creating global impact. By
            seamlessly integrating these principles, we help businesses thrive
            in a dynamic, technology-driven world.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
            WORK WITH US
          </button>
        </div>

        {/* Right Section */}
        <div
          className={`min-h-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 md:p-10 md:w-1/2 w-full bg-white rounded-lg shadow-lg transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        >
          {whychooseus.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span> {item.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Industries of Impact Section */}
      <section className="mt-16 mb-20 mx-0 px-4 md:px-20 md:mx-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-8">
          Our Industries of Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={industry.image}
                alt={industry.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{industry.title}</h3>
                <div className="text-gray-700">
                  {industry.description.map((line, idx) => (
                    <p key={idx} className="mb-4">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
