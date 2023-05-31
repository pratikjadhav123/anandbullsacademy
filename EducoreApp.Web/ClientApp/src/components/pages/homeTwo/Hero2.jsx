import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function Hero2() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const hero2 = {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    roundLengths: true,

    autoplay: {
      delay: 7000,
    },
    pagination: {
      el: ".hero-two-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
      },
    },
  };
  return (
    <>
      <div className="hero-area hero-style-two">
        <div className="hero-main-wrapper position-relative">
          <Swiper {...hero2} className="swiper hero-slider-two">
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide single-hero-slide">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="hero-content">
                        <h2 className="hero-title">
                          Making the future of stock market
                        </h2>
                        <h3 className="featured-price">
                          LEARN STOCK MARKET /<span>One of the best mentor in India</span>
                        </h3>
                       
                        <div className="hero-btns">
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://t.me/Anandbullsak"
                          >
                            <img src={process.env.PUBLIC_URL + "/images/Telegram.png"} alt="logo" />
                          </a>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="hero-image-group">
                        <img
                          src={process.env.PUBLIC_URL + "/images/slide-2.png"}
                          alt="HeroIMG"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide single-hero-slide">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="hero-content">
                        <div className="hero-title">
                          Join The Most <span> Simplified Trading Course </span>
                        </div>
                        <p>
                          Anand Bulls trading course can provide you to learn about the stock market from the basics, where you get to learn how does a market operates to how can you earn simply by putting all the logical thinking into the action. Our simplified strategies will help you to earn and stand financially independent.
                        </p>
                        <div className="hero-btns">
                          <Link
                            onClick={scrollTop}
                            to={`${process.env.PUBLIC_URL}/courses`}
                            className="button-fill-round"
                          >
                            View Courses
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="hero-image-group">
                        <img
                          src={process.env.PUBLIC_URL + "/images/Stock -1.png"}
                          alt="HeroIMG"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
          <div className="hero-two-pagination d-lg-inline-flex flex-column  d-none w-auto"></div>
        </div>
      </div>
    </>
  );
}

export default Hero2;
