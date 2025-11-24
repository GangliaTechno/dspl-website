import React from "react";
import Background from "./Background"; // Import Hero Image component
import { motion } from "framer-motion";

export default function OurProducts() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-[400px] text-white">
        <Background />
        <motion.h1
          className="relative text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-center z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Products
        </motion.h1>
      </div>

      {/* Product Content */}
      <div className="py-12 text-center bg-white relative z-10">
        <h3 className="text-orange-600 font-semibold text-lg">Our Products</h3>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">Latest Innovations</h2>

        <div className="mt-8 bg-gray-100 py-8 px-6 md:px-20 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <ProductCard
              image={"/assets/product1.png"}
              title="GenAlpha Portable Kit"
            />
            <ProductCard
              image={"/assets/product2.png"}
              title="Raw Radicles – Chyawanaprash Candies"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ image, title }) {
  return (
    <div className="overflow-hidden flex flex-col items-center p-4 w-80">
      <img src={image} alt={title} className="w-full h-auto max-h-60 object-contain" />
      <div className="py-4 text-lg font-bold text-gray-900 text-center">{title}</div>
    </div>
  );
}
