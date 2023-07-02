import React from "react";
import { Link } from "react-router-dom";

function ContactWrapperArea() {
  return (
    <>
      <div className="contact-wrapper pt-110">
        <div className="container">
          <div className="row align-items-center justify-content-lg-center gy-5">
            <div className="col-lg-6">
              <div className="contatc-intro-figure">
                <img
                  src={process.env.PUBLIC_URL + "/images/banner/contact-bg.png"}
                  alt="ContactBannerIMG"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="contact-info">
                <h3>Contact Info.</h3>
                <ul>
                  <li>
                    <h6>Let’s Talk</h6>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="tel:+91 8208667300"
                    >
                      WhatsApp No:+91 8208667300 
                    </a>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="tel:+91 9404855782"
                    >
                      Support No:+91 9404855782 
                    </a>
                  </li>
                  <li>
                    <h6>Location.</h6>
                    <a href="https://maps.app.goo.gl/QKUgQbZJrhhxNron8">
                      1550, Subhash Nagar, Barshi, Maharashtra 413401
                    </a>
                  </li>
                  <li>
                    <h6>Visit Us.</h6>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://t.me/Anandbullsak"
                    >
                      Telegram: https://t.me/Anandbullsak
                    </a>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://instagram.com/anand_bulls?igshid=NTc4MTIwNjQ2YQ=="
                    >
                      Instagram: https://instagram.com/anand_bulls
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactWrapperArea;
