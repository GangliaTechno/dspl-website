import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faLuggageCart, faUserFriends, faFlask } from "@fortawesome/free-solid-svg-icons";

export default function Candies() {
  return (
    <div className="w-full bg-gray-100 py-10 flex flex-col items-center">
      {/* Introductory Text */}
      <span className="text-center text-gray-800 font-bold text-lg max-w-3xl mb-6">
        Raw Radicles Chyawanaprash Candies bring the ancient wisdom of Ayurveda into a convenient, 
        modern format. Designed for individuals seeking holistic wellness without compromising on taste 
        or convenience, these candies provide the benefits of traditional Chyawanaprash in a chewable form.
      </span>

      {/* Key Features Section */}
      <section className="relative w-full max-w-5xl">
          <div className="relative p-6 bg-red-100 bg-opacity-30 border border-red-100 divide-y divide-white">
            <h2 className="text-3xl font-bold text-center text-gray-800">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Feature title="Immunity-Boosting Ingredients" description="Made with authentic Ayurvedic herbs known to enhance vitality and overall well-being." />
            <Feature title="Convenient and Travel-Friendly" description="Unlike traditional Chyawanprash, these candies can be consumed on the go." />
            <Feature title="No Artificial Additives" description="Free from synthetic preservatives and chemicals, ensuring purity and authenticity." />
            <Feature title="Suitable for All Age Groups" description="A palatable and easy-to-consume alternative for children, adults, and seniors." />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-4xl text-center mt-10">
        <h2 className="text-3xl font-bold text-gray-800">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Benefit icon={faLeaf} title="Boosts Immunity" description="Supports respiratory health and strengthens the immune system naturally." />
          <Benefit icon={faFlask} title="Antioxidant Rich" description="Provides essential antioxidants for overall wellness and energy." />
          <Benefit icon={faLuggageCart} title="On-the-Go Nutrition" description="A travel-friendly supplement for busy lifestyles." />
          <Benefit icon={faUserFriends} title="Suitable for Everyone" description="Safe and effective for all age groups, from kids to seniors." />
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="text-center mt-10">
        <h2 className="text-3xl font-bold text-gray-800">Future Plans</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Expansion into diverse flavors and herbal formulations.<br />
          Research-driven enhancement to maximize Ayurvedic benefits.<br />
          Integration with DIY Ayurveda for personalized health recommendations.
        </p>
      </section>
    </div>
  );
}

// Feature Component
function Feature({ title, description }) {
    return (
      <div className="p-4 border border-white rounded-lg">
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  }
  
// Benefit Component
function Benefit({ icon, title, description }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg">
        <FontAwesomeIcon icon={icon} className="text-2xl" fixedWidth />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}
