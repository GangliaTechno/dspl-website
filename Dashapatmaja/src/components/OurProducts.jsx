import React from "react";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";

export default function OurProducts() {
  return (
    <div className="py-12 text-center">
      <h3 className="text-orange-600 font-semibold text-lg">Our Products</h3>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">Latest Innovations</h2>

      <div className="mt-8 bg-gray-100 py-8 px-6 md:px-20 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <ProductCard
            image={product1}
            title="GenAlpha Portable Kit"
          />
          <ProductCard
            image={product2}
            title="Raw Radicles – Chyawanaprash Candies"
          />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ image, title }) {
  return (
    <div className=" overflow-hidden flex flex-col items-center p-4 w-80">
      <img src={image} alt={title} className="w-full h-auto max-h-60 object-contain" />
      <div className="py-4 text-lg font-bold text-gray-900 text-center">{title}</div>
    </div>
  );
}
