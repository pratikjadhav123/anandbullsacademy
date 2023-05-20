import React from "react";
import AboutWrapperArea from "./AboutWrapperArea";
import TestimonialArea from "../../common/TestimonialArea";
import Breadcrumb from "../../common/Breadcrumb";

function About() {
  return (
    <>
      <Breadcrumb name="About" />
      <AboutWrapperArea />
      <TestimonialArea />
    </>
  );
}

export default About;
