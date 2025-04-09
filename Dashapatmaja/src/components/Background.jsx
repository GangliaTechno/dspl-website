import React from "react";
import homeBackground from "/assets/homebackground.jpg"; 

const Background = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${homeBackground})`,
        filter: "brightness(35%)",
      }}
    ></div>
  );
};

export default Background;
