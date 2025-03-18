import React from 'react';

const ResearchDevelopmentPage = () => {
  const offerings = [
    {
      title: "Theoretical & Practical Research Development",
      description:
        "We conduct in-depth research, combining theoretical frameworks with real-world applications to drive innovation.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Flask Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 2a1 1 0 00-1 1v7a7 7 0 0014 0V3a1 1 0 00-1-1H6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 10h16"
          />
        </svg>
      ),
    },
    {
      title: "Collaborative Research with Leading Experts",
      description:
        "We partner with top academics, institutions, and industry leaders to advance research across various disciplines.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Users Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m8-6a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Publication in International High-Impact Journals",
      description:
        "We assist researchers in publishing their work in prestigious, peer-reviewed journals to gain global recognition.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Document Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h10M7 11h10M7 15h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
          />
        </svg>
      ),
    },
    {
      title: "Patent & Intellectual Property Consultation",
      description:
        "We provide expert guidance on securing patents and protecting intellectual property rights for groundbreaking innovations.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Shield & Check Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2l4 -4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 22C7 19 4 16 4 10a8 8 0 1116 0c0 6-3 9-8 12z"
          />
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
            Research &amp; Development
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Advancing Knowledge Through Theoretical and Practical Research
          </p>
          <p className="max-w-2xl mx-auto text-gray-700">
            Our R&amp;D division is dedicated to conducting high-quality research in collaboration with doctors, professors, and students. We focus on producing research that gets published in high-impact international journals, contributing to global scientific advancements.
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
            Groundbreaking research leads to technological advancements and innovation. Our mission is to push the boundaries of knowledge by collaborating with eminent professionals and institutions worldwide.
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

export default ResearchDevelopmentPage;
