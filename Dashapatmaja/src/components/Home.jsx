import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "./Background";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const industries = [
    {
      title: "Branding and Ecommerce",
      image: "assets/branding.jpeg",
      description: [
        <>
         Our mission is to make meaningful innovation more accessible, everyday challenges more manageable, and smart solutions a seamless part of modern life. Whether it’s enhancing performance, enabling balance, or empowering better decisions—our products are designed to help people and businesses thrive.
        </>,
        <>
          From intelligent platforms that drive measurable impact to intuitive tools that simplify complexity, we deliver powerful, easy-to-use solutions rooted in real-world needs. Join the future with technology that’s thoughtful, transformative, and made for those who care.
        </>,
      ],
      path: "/branding",
    },
    {
      title: "Ed-Tech",
      image: "assets/edtech.jpeg",
      description: [
        <>

          At Dashapatmaja Solutions, we specialize in advanced computing solutions that bring processing power closer to your data sources, enhancing speed, efficiency, and real-time decision-making. Our expertise ensures seamless integration of smart technologies while optimizing performance across various industries.
        </>,
        <>
        We offer a full suite of services, including IoT integration for real-time data processing, smart device development to enhance operations, and robust data security solutions that protect your devices and networks from evolving threats. Let us help you unlock the true potential of modern computing for your business.
        </>,
      ],

      path: "/edtech",
    },
    {
      title: "Research and Development",
      image: "assets/r&d.jpeg",
      description: [
        <>
          At Dashapatmaja Solutions, our R&D division powers our commitment to innovation—constantly exploring new frontiers, enhancing existing capabilities, and driving breakthrough solutions.
Through continuous research, experimentation, and refinement, we turn bold ideas into practical advancements that create meaningful impact.
        </>,
        <>
          Our focus spans emerging technologies, intelligent systems, and scalable solutions designed to solve real-world challenges. We collaborate closely with academic and industry partners to accelerate progress and shape the future across diverse domains.

Join us at the forefront of innovation—and discover what’s next.
        </>,
      ],
      path: "/research",
    },
  ];

  const whychooseus = [
    {
      title: "Expertise Across Domains",
      description:
        "Strong foundation in Branding, E-commerce, Ed-Tech, and R&D to cater to diverse business needs.",
    },
    {
      title: "Innovation-Driven Solutions",
      description:
        "Cutting-edge technology and research to create impactful and future-ready solutions.",
    },
    {
      title: "Customized Approach",
      description:
        "Tailored strategies that align with your business goals for maximum success.",
    },
    {
      title: "Global Impact",
      description:
        "Helping businesses scale and make a meaningful difference worldwide.",
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen md:h-[130vh] text-white flex flex-col justify-center items-center text-center px-4">
        <Background />
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
          At Dashapatmaja Solutions, we bridge creativity and strategic insight—driving innovation across Branding & E-commerce, Ed-Tech, and Research & Development.
We partner with businesses not only to craft distinctive brand experiences and transformative educational technologies, but also to deliver high-impact advisory and consulting services.
Whether it’s shaping go-to-market strategies, enabling digital transformation, or conducting industry-defining research, we bring the analytical rigor and executional excellence typically associated with top-tier firms—while keeping our solutions bold, future-ready, and grounded in real-world impact.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col md:flex-row gap-6 md:gap-x-10 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button
              className="border border-white px-6 py-3 font-semibold rounded w-full md:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="relative py-16 px-4 md:px-10 lg:ml-44 lg:mr-40 bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
  {/* Left Section */}
  <div
    className={`bg-yellow-400 text-black p-6 md:p-10 w-full md:w-1/2 transition-all duration-1000 ${
      isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
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
    <button
      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      onClick={() => navigate("/contact")}
    >
      WORK WITH US
    </button>
  </div>

  {/* Right Section */}
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 md:p-10 w-full md:w-1/2 bg-white rounded-lg shadow-lg transition-all duration-1000 ${
      isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
    }`}
  >
    {whychooseus.map((item, index) => (
      <div
        key={index}
        className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300"
      >
        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          {item.title}
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
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer w-full h-[650px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(industry.path);
              }}
            >
              <div className="relative w-[280px] h-[280px] mx-auto mt-6 overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover rounded-full brightness-95"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{industry.title}</h3>
                <p className="mb-4 text-gray-700">
                  {industry.description[0]}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <div className="w-0.5 h-10 bg-gray-700"></div>
            </div>

            <motion.div
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer w-full h-[270px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(industry.path);
              }}
            >
              <div className="p-6">
                <p className="text-gray-700">
                  {industry.description[1]}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Home;
