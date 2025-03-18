import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="m-5 p-5 w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-5xl font-extrabold text-center mb-4">Contact Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </div>
        {/* Select Field */}
        <div>
          <label className="block text-gray-700 font-medium">Select Field *</label>
          <select
            name="field"
            value={formData.field}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select your option</option>
            <option value="Health and Wellness solutions">Health and Wellness solutions</option>
            <option value="Research collaborations">Research collaborations</option>
            <option value="Edge-Tech services">Edge-Tech services</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-[10%] bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition"
        >
          SUBMIT 
        </button>
      </form>
    
    <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-yellow-500">Main Branch</h2>
        <h1 className="text-4xl font-extrabold text-gray-900">Reach Out to Us</h1>
      </div>
    </div>
  );
}

export default ContactUs;
