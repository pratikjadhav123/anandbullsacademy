import React from "react";
import { Link } from "react-router-dom";
import BlogCardGama from "../blog/BlogGrid/BlogCardGama";

function LetesBlogArea() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>

      <div className="col-lg-12 py-3">
        <div className="hero-image-group">
          <img
            src={process.env.PUBLIC_URL + "/images/anandcourse.png"}
            alt="HeroIMG"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="col-lg-12 py-3">
        <div className="hero-image-group">
          <img
            src={process.env.PUBLIC_URL + "/images/option buying strategy-1.png"}
            alt="HeroIMG"
            className="img-fluid"
          />
        </div>
      </div>
    </>
  );
}

export default LetesBlogArea;
