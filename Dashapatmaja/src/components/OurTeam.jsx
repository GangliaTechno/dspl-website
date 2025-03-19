import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
    { name: "Dr. Manu Sudhi", role: "Chairman", image: "/assets/manu.png" },
    { name: "Shreepathy Ranga Bhatta", role: "Managing Director", image: "/assets/sree.jpeg" },
    { name: "Dr. Dasharathraj K Shetty", role: "Mentor", image: "/assets/dr.jpeg" },
    { name: "Ms. Anusha Pai", role: "Director", image: "/assets/anu.jpeg" },
    { name: "Mr. Vishnu U Pillai", role: "Director", image: "/assets/vishnu.jpeg" },
    { name: "Ms. Staissy Salu", role: "Chief Operating Officer (COO)", image: "/assets/stais.jpeg" },
    { name: "Mr. Namesh Malarout", role: "Chief Marketing Officer", image: "/assets/namesh.jpeg" },
];

export default function OurTeam() {
  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 md:px-6">
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At Dashapatmaja Solutions Pvt. Ltd., our team is the driving force behind our innovations. 
          Comprising experts from diverse fields such as engineering, healthcare, management, and 
          technology, we collaborate to create impactful solutions. Our multidisciplinary approach 
          ensures that we stay ahead in research, development, and cutting-edge product innovation. 
          Together, we are shaping the future with passion, expertise, and a commitment to excellence.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col items-center p-6"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Circular Profile Image with Dynamic Sizing */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-700">{member.name}</h3>
              <p className="text-gray-500 text-sm md:text-base">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
