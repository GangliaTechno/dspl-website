import React from "react";
import natureImage from "../assets/nature.jpg";

const Background = () => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${natureImage})`,
        filter: "brightness(25%)",
      }}
    ></div>
  );
};

export default Background;
