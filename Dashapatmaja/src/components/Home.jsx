import React from "react";
import natureImage from "../assets/nature.jpg";
import brandingImage from "../assets/branding.jpg";
import edtechImage from "../assets/edtech.jpg";
import researchImage from "../assets/research.jpg";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[130vh] text-white flex flex-col justify-center items-center text-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${natureImage})`,
            filter: "brightness(25%)",
          }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-8xl -mt-44 font-bold leading-tight text-left">
            Innovating Today for a <br /> Smarter Tomorrow
          </h1>
          <p className="mt-4 text-lg max-w-5xl text-left font-bold">
            At Dashapatmaja Solutions, we specialize in three core domains –
            Branding & E-commerce, Ed-Tech, and Research & Development. We
            empower businesses to establish strong brands, develop innovative
            educational technology solutions, and drive cutting-edge research
            that makes a global impact.
          </p>
          <div className="mt-20 flex gap-x-28 items-center justify-center">
            <button className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded">
              OUR PRODUCTS
            </button>
            <button className="border border-white px-6 py-3 font-semibold rounded">
              CONTACT US
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section (Moved Up) */}
      <section className="relative min-h-screen -mt-32 flex flex-col md:flex-row mr-40 items-center md:items-start shadow-lg rounded-lg ml-44 bg-white">
        {/* Left Section */}
        <div className="min-h-screen bg-yellow-400 text-black p-10 md:w-1/2">
          <h2 className="text-lg font-semibold">Why Choose Us?</h2>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Innovate. Educate. Elevate
          </h1>
          <p className="mt-4 text-lg">
            Why Choose us? Innovate. Educate. Elevate At Dashapatmaja Solutions,
            we believe in innovation as the driving force behind
            transformation—whether in branding, e-commerce, or technology.
            Through education, we empower individuals and businesses with
            cutting-edge Ed-Tech solutions that foster learning and growth. Our
            commitment to elevation ensures that our research and development
            initiatives push boundaries, creating global impact. By seamlessly
            integrating these principles, we help businesses thrive in a
            dynamic, technology-driven world.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
            WORK WITH US
          </button>
        </div>
        {/* Right Section */}
        <div className=" min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 p-10 md:w-1/2 bg-white rounded-lg shadow-lg">
          {[
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
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span> {item.title}
              </h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Industries of Impact Section */}
      <section className="mt-20 px-10">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our Industries of Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Branding and Ecommerce",
              image: brandingImage,
              description: [
                <>We specialize in developing cutting-edge technologies and products that enhance both physical and mental well-being. Our focus is on creating solutions that improve healthcare accessibility, promote overall wellness, and integrate seamlessly into daily life.</>,
                <>Our offerings include <strong>innovative medical devices</strong> designed for better patient care, <strong>wellness applications</strong> that support healthy living and mental well-being, and <strong>personalized healthcare solutions </strong> powered by AI and data analytics to provide tailored health recommendations.</>,
              ],
            },
            {
              title: "Ed-Tech",
              image: edtechImage,
              description: [
                <>We specialize in <strong>edge computing solutions</strong>, bringing processing power closer to data sources to enhance speed, efficiency, and real-time decision-making. Our expertise ensures seamless integration of smart technologies while optimizing performance for various industries.</>,
                <>Our services include <strong>IoT integration</strong> for real-time data processing, <strong>smart device development</strong> to enable efficient edge operations, and <strong>data security solutions</strong> that safeguard edge devices and networks with robust protection measures.</>,
              ],
            },
            {
              title: "Research and Development",
              image: researchImage,
              description: [
                <>Our <strong>R&D division </strong> is the driving force behind our innovation, constantly developing new technologies and enhancing existing solutions. Through continuous research and experimentation, we push the boundaries of advancement across various fields.</>,
                <>Our focus areas include <strong>biomedical research</strong> for groundbreaking health solutions, <strong>technological innovation</strong> in AI, machine learning, and edge computing, and <strong>collaborative projects</strong> with academic and industry leaders to accelerate innovation.</>,
              ],
            },
          ].map((industry, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
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
                    <p key={idx} className="mb-8">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
