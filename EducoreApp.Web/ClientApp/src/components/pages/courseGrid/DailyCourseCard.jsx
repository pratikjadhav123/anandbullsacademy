import React from "react";
import { Link } from "react-router-dom";

function DailyCourseCard(props) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="package-card-alpha">
        <div className="package-thumb">
          <Link
            onClick={scrollTop}
            to={`${process.env.PUBLIC_URL}/dailyCourse`}
          >
            <img src={props.image} alt="images" />
          </Link>
          <p className="card-lavel">
            <i className="bi bi-clock" /> <span>{props.time}</span>
          </p>
        </div>
        <div className="package-card-body">
          <h3 className="p-card-title">
            <Link
              onClick={scrollTop}
              to={`${process.env.PUBLIC_URL}/dailyCourse`}
            >
              {props.title}
            </Link>
          </h3>
          <div className="p-card-bottom">
            <div className="book-btn">
              <Link
                onClick={scrollTop}
                to={`${process.env.PUBLIC_URL}/dailyCourse`}
              >
                Join Now <i className="bx bxs-right-arrow-alt" />
              </Link>
            </div>
            <div className="p-card-info">
              <h6>
                {"₹" + props.price} 
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DailyCourseCard;
