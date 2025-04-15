import React from "react";


const BackgroundImage = ({background}) => {
  return (
    <div
      className="homepage_img"
      style={{ backgroundImage: `url(${background})` }}
      aria-hidden="true"
    ></div>
  );
};

export default BackgroundImage;
