import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from "swiper";
import DestinationCard2 from "./DestinationCard2";
import ModalVideo from "react-modal-video";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function DestinationArea() {
  const [isOpen, setOpen] = useState(false);

  const destinationSlider = {
    slidesPerView: 1,
    speed: 2000,
    spaceBetween: 24,

    loop: true,
    roundLengths: true,
    autoplay: {
      delay: 1500,
    },
    pagination: {
      el: ".testi-pagination",
      clickable: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };
  return (
    <>
      <div className="destination-area destination-style-two pt-110">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="section-head-gamma">
                <h2>Our Latest Blog</h2>
              </div>
            </div>
          </div>
          <Swiper
            {...destinationSlider}
            className="swiper destination-slider-two"
          >
            <div className="">
              <SwiperSlide className="swiper-slide">
              
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm5.png"}
                  placeName="Augsburg"
                  palceCount="45"
                  altNo="1"
                  setOpen={setOpen}
                />
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm2.png"}
                  placeName="Marakana"
                  palceCount="25"
                  altNo="2"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm3.png"}
                  placeName="Nuremberg"
                  palceCount="30"
                  altNo="3"
                />
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm4.png"}
                  placeName="Bielefeld"
                  palceCount="35"
                  altNo="4"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm5.png"}
                  placeName="Düsseldorf"
                  palceCount="30"
                  altNo="5"
                />
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm5.png"}
                  placeName="Wiesbaden"
                  palceCount="45"
                  altNo="6"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm7.png"}
                  placeName="Chemnitz"
                  palceCount="15"
                  altNo="7"
                />
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm1.png"}
                  placeName="Oberhausen"
                  palceCount="24"
                  altNo="8"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm6.png"}
                  placeName="Nuremberg"
                  palceCount="30"
                  altNo="9"
                />
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm6.png"}
                  placeName="Bielefeld"
                  palceCount="35"
                  altNo="10"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm1.png"}
                  placeName="Chemnitz"
                  palceCount="15"
                  altNo="11"
                />
                <DestinationCard2
                  image={process.env.PUBLIC_URL + "/images/destination/des-sm5.png"}
                  placeName="Oberhausen"
                  palceCount="24"
                  altNo="12"
                />
              </SwiperSlide>
            </div>
            <div className="testi-pagination text-center" />
          </Swiper>
        </div>
      </div>
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="AhP5Tg_BLIk"
          onClose={() => setOpen(false)}
        />
      </React.Fragment>
    </>
  );
}

export default DestinationArea;
