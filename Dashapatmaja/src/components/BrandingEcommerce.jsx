import React from 'react';
import { motion } from 'framer-motion';
import Background from './Background';
const BrandingEcommerce = () => {
  const offerings = [
    {
        title: "E-commerce Platform Management",
        description:
          "We help businesses set up, optimize, and manage their online stores for seamless operations and growth.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H17M7 13h10M16 21a1 1 0 110-2 1 1 0 010 2zm-8 0a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        ),
      },
    {
      title: "Brand Development & Strategy",
      description:
        "We create and refine brand identities, ensuring businesses have a strong, consistent presence in their market.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.536a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
          />
        </svg>
      ),
    },
   
    {
      title: "Digital Marketing & SEO",
      description:
        "We implement targeted marketing strategies and SEO techniques to enhance brand visibility and drive organic traffic.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h5m4-12l3 3-3 3m0 4h-1"
          />
        </svg>
      ),
    },
    {
      title: "Product Launch & Market Positioning",
      description:
        "We develop go-to-market strategies to ensure successful product launches and competitive positioning in the industry.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-purple-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 13 7 13s7-9.13 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative flex flex-col items-center justify-center h-[400px] text-white text-center px-4 overflow-hidden">
        <Background />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 z-10">
            Branding & Ecommerce
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8  z-10">
            Helping Businesses Build, Market, and Sell Their Brands
          </p>
          <p className="max-w-2xl mx-auto text-white  z-10">
            We specialize in building and scaling brands by providing comprehensive support in branding, marketing, and e-commerce management. From crafting a compelling brand identity to optimizing online sales channels, we empower businesses to thrive in competitive markets.
          </p>
     
      </section>

      {/* Why It Matters Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why It Matters
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Brand visibility and online presence are crucial in today’s digital economy. Our expertise helps businesses reach their target audiences effectively, maximize sales, and build long-term brand equity.
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

export default BrandingEcommerce;
