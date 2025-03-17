import React from 'react';

const EdTechPage = () => {
  const offerings = [
    {
      title: "Smart Learning Devices & Gadgets",
      description:
        "We develop innovative educational hardware and tools that enhance interactive and immersive learning experiences.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Laptop/Device Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17h4.5M7 7h10a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h18" />
        </svg>
      ),
    },
    {
      title: "Interactive Educational Platforms",
      description:
        "We create digital platforms that provide engaging, student-centered learning experiences through multimedia and gamification.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Monitor/Screen Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v12H4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 20h8" />
        </svg>
      ),
    },
    {
      title: "AI-Based Learning Assistance",
      description:
        "Our AI-powered tools offer personalized learning support, tutoring, and real-time feedback to improve student outcomes.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* AI/Brain Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 4.08c0 1.433-.323 2.78-.84 4.08L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-6.16-3.422A12.083 12.083 0 005 14c0 1.433.323 2.78.84 4.08L12 14z" />
        </svg>
      ),
    },
    {
      title: "Research Tools for Academics",
      description:
        "We provide advanced software and resources to help researchers and educators streamline data analysis, collaboration, and publication.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Book/Research Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0l3-3m-3 3l-3-3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4">
            Ed-Tech
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Innovative Learning Solutions for the Future of Education
          </p>
          <p className="max-w-2xl mx-auto text-gray-700">
            We develop next-generation educational tools that integrate technology to enhance teaching and learning experiences. Our products are designed for students, professors, and institutions looking to modernize education.
          </p>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why It Matters
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            The future of education lies in technology-driven solutions that improve accessibility, engagement, and knowledge retention. We work on creating tools that make learning more efficient and impactful.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offer, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center"
              >
                <div className="mb-4">{offer.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-center">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EdTechPage;
