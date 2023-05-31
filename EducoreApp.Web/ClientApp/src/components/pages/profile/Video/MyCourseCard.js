import React from "react";
import { Link } from "react-router-dom";

function MyCourseCard(props) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <>
      <div className="package-card-alpha">
        <div className="package-thumb">
          <Link
            onClick={scrollTop}
            to={`${process.env.PUBLIC_URL}/video/${props.id}`}
          >
            <img src={props.image} alt="images" />
          </Link>
          <p className="card-lavel">
            <i className="bi bi-clock" /> <span>{props.hours}</span>
          </p>
        </div>
        <div className="package-card-body">
          <h3 className="p-card-title">
            <Link
              onClick={scrollTop}
              to={`${process.env.PUBLIC_URL}/video/${props.id}`}
            >
              {props.title}
            </Link>
          </h3>
          <div className="p-card-bottom">
            <div className="book-btn">
              <Link
                onClick={scrollTop}
                to={`${process.env.PUBLIC_URL}/video/${props.id}`}
              >
                start Learning <i className="bx bxs-right-arrow-alt" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourseCard;
