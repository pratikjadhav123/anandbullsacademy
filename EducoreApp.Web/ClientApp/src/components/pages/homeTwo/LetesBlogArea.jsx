import React from "react";

function LetesBlogArea() {

  return (
    <>

      <div className="col-lg-12 py-3">
        <div className="hero-image-group ">
          <img
            src={process.env.PUBLIC_URL + "/images/coursebenifite.jpg"}
            alt="HeroIMG"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="col-lg-12 py-3">
        <div className="hero-image-group">
          <img
            src={process.env.PUBLIC_URL + "/images/optionbuying.png"}
            alt="HeroIMG"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="col-lg-12">
        <div className="hero-image-group">
          <img
            src={process.env.PUBLIC_URL + "/images/AB Banner 5.png"}
            alt="HeroIMG"
            className="img-fluid"
          />
        </div>
      </div>
    </>
  );
}

export default LetesBlogArea;
