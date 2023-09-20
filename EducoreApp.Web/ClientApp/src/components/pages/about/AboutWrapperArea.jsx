import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

function AboutWrapperArea() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="about-main-wrappper pt-110">
        <div className="container">
          <div className="about-tab-wrapper">
            
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="about-tab-image-grid text-center">
                  <div className="about-video d-inline-block mb-5">
                    <img src={process.env.PUBLIC_URL + "/images/youtubeVideo.png"} alt="aboutIMG" />
                    <div className="video-overlay">
                      <div className="play-icon video-popup">
                        <i
                          onClick={() => setOpen(true)}
                          className="bi bi-play-fill"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="row float-images g-4">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="about-image">
                        <img src={process.env.PUBLIC_URL + "/images/slide-2.png"} alt="aboutIMG" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="about-image">
                        <img src={process.env.PUBLIC_URL + "/images/slider1.jpg"} alt="aboutIMG" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-5 mt-lg-0">
                <div className="about-tab-wrap">
                  <h2 className="about-wrap-title">
                    About <span>Anand Bulls Trading Academy</span>  And <span>What We Are</span> Offer.
                  </h2>
                  <div className="about-tab-switcher">
                    <ul
                      className="nav nav-pills mb-3 justify-content-center"
                      id="about-tab-pills"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <div
                          className="nav-link active"
                          id="pills-about1"
                          data-bs-toggle="pill"
                          data-bs-target="#about-pills1"
                          role="tab"
                          aria-controls="about-pills1"
                          aria-selected="true"
                        >
                          <h3>2</h3>
                          <h6>Years Experience</h6>
                        </div>
                      </li>
                      <li className="nav-item" role="presentation">
                        <div
                          className="nav-link"
                          id="pills-about2"
                          data-bs-toggle="pill"
                          data-bs-target="#about-pills2"
                          role="tab"
                          aria-controls="about-pills2"
                          aria-selected="false"
                        >
                          <h3>1000+</h3>
                          <h6>Students</h6>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="tab-content about-tab-content"
                    id="pills-tabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="about-pills1"
                      role="tabpanel"
                      aria-labelledby="pills-about1"
                    >
                      <p>
                        Since 2020, Anand Bulls Trading Academy has been committed to teaching the skills you need to make smarter investment decisions by using our Patented Supply and Demand Strategy. Our courses include instruction from experienced professional traders, and a framework for building a customized trading plan. We have helped thousands of investors learn the skills necessary to have the ability and confidence of the pros.

                        We invite you to join us for an upcoming Webinar. Our experienced instructors and staff are here to help you achieve your financial goals. As an Online Trading Academy student, you’ll become part of a community of traders and investors committed to success.
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="about-pills2"
                      role="tabpanel"
                      aria-labelledby="pills-about2"
                    >
                      <p>
                        Anand Bulls Trading Academy has designed these courses especially to help retail traders create a source of income in the stock market.  it is designed in such a way that it only includes vital information and strategies. we have different courses designed and customized for a different levels of traders!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="pXu8QVvh3SI"
          onClose={() => setOpen(false)}
        />
      </React.Fragment>
    </>
  );
}

export default AboutWrapperArea;
