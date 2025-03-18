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
    <div className="m-5 p-5 w-[1500px] mx-auto p-6 bg-grey shadow-lg rounded-lg">
      <h1 className="text-5xl font-extrabold text-center mb-4">Contact Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="John" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Doe" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="johndoe@gmail.com" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Message <span className="text-red-500">*</span></label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Enter your message here" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </div>
        {/* Select Field */}
        <div>
          <label className="block text-gray-700 font-medium">Select Field <span className="text-red-500">*</span></label>
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
    
    <div className="text-center space-y-4  mt-10">
        <h2 className="text-2xl font-bold  space-y-4 text-yellow-500">Main Branch</h2>
        <h1 className="text-4xl font-extrabold  space-y-4 text-gray-900">Reach Out to Us</h1>
      </div>
           
      <div className="grid md:grid-cols-4 gap-8 items-center">
  
  {/* Contact Information Section - Takes 1/4 of the space */}
  <div className="col-span-1 space-y-4">
    <p className="text-lg text-gray-700">
      We are eager to collaborate and transform your business with innovative solutions.
    </p>

    <div>
      <h2 className="text-xl font-bold text-gray-900">Address:</h2>
      <p className="text-gray-600">
        IS/CWI/ 002, Manipal GOK Bioincubator, Advanced Research Centre, Madhav Nagar, Manipal – 576104
      </p>
    </div>

    <div>
      <h2 className="text-xl font-bold text-gray-900">Phone:</h2>
      <p className="text-gray-600">+91 88619 42440</p>
    </div>

    <div>
      <h2 className="text-xl font-bold text-gray-900">Email:</h2>
      <p className="text-blue-600 underline">contact@dashapatmaja.in</p>
    </div>
  </div>

  {/* Google Maps Section - Takes 3/4 of the space */}
  <div className="col-span-3 h-[400px] rounded-lg shadow-lg overflow-hidden">
    <iframe
      title="Google Maps"
      className="w-full h-full border-0"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.295362825754!2d74.7820413!3d13.3561856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca3d9db9ae3f7%3A0xc915988cac502131!2sManipal+Government+of+Karnataka+Bioincubator!5e0!3m2!1sen!2sin!4v1631051012775!5m2!1sen!2sin"
      loading="lazy"
    ></iframe>
  </div>

</div>
</div>
  );
}

export default ContactUs;
