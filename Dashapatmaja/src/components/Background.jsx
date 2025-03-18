import React from "react";

const Background = () => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url("assets/nature.jpg")`,
        filter: "brightness(35%)",
      }}
    ></div>
  );
};

export default Background;
