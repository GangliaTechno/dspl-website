import React from 'react';

function AboutUs() {
  const leaders = [
    { name: "Dr. Manu Sudhi", designation: "Chairman", image: "assets/manu.png" },
    { name: "Mr. Shreepathy Ranga Bhatta B", designation: "Managing Director", image: "assets/sree.jpeg" },
    { name: "Dr. Dasharathraj K Shetty", designation: "Mentor", image: "assets/dr.jpeg" },
    { name: "Ms. Anusha Pai", designation: "Director", image: "assets/anu.jpeg" },
    { name: "Mr. Vishnu U Pillai", designation: "Director", image: "assets/vishnu.jpeg" },
    { name: "Ms. Staissy Salu", designation: "Chief Operating Officer", image: "assets/stais.jpeg" },
    { name: "Mr. Namesh Malarout", designation: "Chief Marketing Officer", image: "assets/namesh.jpeg" },
  ];

  return (
    <div>
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

      {/* Leadership Team Section */}
      <section className="py-10">
        <h2 className="text-4xl font-bold mb-6 text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 px-4">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4 text-center border border-gray-300">
              <img
                src={leader.image}
                alt={leader.name}
                className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
              />
              <h3 className="text-xl font-semibold">{leader.name}</h3>
              <p className="text-gray-500">{leader.designation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Industries of Impact Section */}
      <section className="py-10 bg-gray-50">
        <h2 className="text-4xl font-bold mb-6 text-center">Our Industries of Impact</h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          We serve a wide range of sectors, providing innovative solutions that address the unique needs of each:
        </p>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {/* Health and Wellness Card */}
          <div className="w-64 bg-white p-4 border border-gray-300 rounded text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Health and Wellness</h3>
          </div>
          {/* Edge-Tech Card */}
          <div className="w-64 bg-white p-4 border border-gray-300 rounded text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ed-Tech</h3>
          </div>
          {/* Research and Development Card */}
          <div className="w-64 bg-white p-4 border border-gray-300 rounded text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 4.08c0 1.433-.323 2.78-.84 4.08L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-6.16-3.422A12.083 12.083 0 004 14c0 1.433.323 2.78.84 4.08L12 14z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Research and Development</h3>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-10">
        <h2 className="text-4xl font-bold mb-6 text-center">Our Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* 2023 Milestone */}
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">2023</h3>
            <p className="text-gray-700 text-center">
              Launch of flagship projects, including the Torsoscope and GenAlpha Portable Lab.
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
              Expansion into AI-driven personalized healthcare solutions with DIY Ayurveda.
            </p>
          </div>
          {/* Incubation Milestone */}
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Incubation</h3>
            <p className="text-gray-700 text-center">
              Selected by GOK Bioincubator, providing us with cutting-edge facilities and expert mentorship.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
