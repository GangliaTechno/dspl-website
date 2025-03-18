import React from "react";

const Background = () => {
  return (
    <div
      className="absolute top=0 left=0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url("assets/nature.jpg")`,
        filter: "brightness(35%)",
      }}
    ></div>
  );
};

export default Background;
