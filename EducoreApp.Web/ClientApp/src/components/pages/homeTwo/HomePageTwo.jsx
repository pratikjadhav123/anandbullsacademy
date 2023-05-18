import React from "react";
import DestinationArea from "./DestinationArea";
import NewsLetterArea from "./NewsLetterArea";
import TestimonialArea from "./TestimonialArea";
import LetesBlogArea from "./LetesBlogArea";
import Hero2 from "./Hero2";

function HomePageTwo() {
  return (
    <>
      <Hero2 />
      <LetesBlogArea/>
      {/* <Package /> */}
      <DestinationArea />
      <NewsLetterArea />
      <TestimonialArea />
    </>
  );
}

export default HomePageTwo;
