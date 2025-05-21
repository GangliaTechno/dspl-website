import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Dr. Manu Sudhi", role: "Chairman", image: "/assets/manu.png" },
  { name: "Shreepathy Ranga Bhatta", role: "Managing Director", image: "/assets/sree.jpeg" },
  { name: "Dr. Dasharathraj K Shetty", role: "Mentor", image: "/assets/dr.png" },
  { name: "Ms. Anusha Pai", role: "Director", image: "/assets/anu.png" },
];

const teamMembers2 = [
  { name: "Mr. Vishnu U Pillai", role: "Director", image: "/assets/vishnu.png" },
  // { name: "Ms. Staissy Salu", role: "Chief Operating Officer", image: "/assets/newpfp.png" },
  { name: "Mr. Namesh Malarout", role: "Chief Marketing Officer", image: "/assets/namesh.png" },
];

export default function OurTeam() {
  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 md:px-6">

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At Dashapatmaja Solutions Pvt. Ltd., our team is the driving force behind our innovations.
          Comprising experts from diverse fields such as engineering, healthcare, management, and
          technology, we collaborate to create impactful solutions.
        </p>
      </div>

      {/* Row 1 Centered */}
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white w-64 h-72 rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col items-center p-6"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-gray-700">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {teamMembers2.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white w-64 h-72 rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col items-center p-6"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-gray-700">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
