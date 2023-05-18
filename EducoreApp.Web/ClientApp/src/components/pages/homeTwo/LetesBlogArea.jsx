import React from "react";
import { Link } from "react-router-dom";
import BlogCardGama from "../blog/BlogGrid/BlogCardGama";

function LetesBlogArea() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="more-update-section" >
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center gy-5">
            <div className="col-lg-6 text-lg-start text-center">
              <div className="more-update-content">
                <h2>Option Buying <span>Strategy</span></h2>
                <p><i className="bi bi-star-fill" /> Advance Option Buying Strategy with Live Trades</p>
                <p><i className="bi bi-star-fill" /> Bank Nifty SUPER SETUPS</p>

                {/* <p><i className="bi bi-star-fill" /> Nifty SUPER SETUPS</p>
                <p><i className="bi bi-star-fill" />5 Minute Option Buying Strategy (Advance Version)</p>
                <p><i className="bi bi-star-fill" /> Option Buying Algorithm Strategy</p>
                <p><i className="bi bi-star-fill" /> Backtesting Reports building confidence</p>
                <p><i className="bi bi-star-fill" />Lifetime Access</p>
                <p><i className="bi bi-star-fill" /> QnA Sessions</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LetesBlogArea;
