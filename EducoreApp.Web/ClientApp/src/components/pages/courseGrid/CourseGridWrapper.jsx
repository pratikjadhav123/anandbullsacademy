import React from "react";
import CourseCard from "./CourseCard";

function CourseGridWrapper() {
  
  return (
    <>
      {/* ===============  Package gird area start =============== */}
      <div className="package-wrapper pt-110">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <CourseCard
                image={process.env.PUBLIC_URL + "/images/package/p-alpha1.png"}
                hours="16h:00m"
                title="Market Psychology and Setup"
                price="₹888.00"
              />
            </div>
            <div className="col-lg-4 col-md-6 ">
              <CourseCard
                image={process.env.PUBLIC_URL + "/images/package/p-alpha2.png"}
                hours="06h:50m"
                title="Option Beginner to Pro."
                price="₹989.00"
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <CourseCard
                image={process.env.PUBLIC_URL + "/images/package/p-alpha3.png"}
                hours="06h:50m"
                title="Basics of Stock Market."
                price="₹999.00"
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <CourseCard
                image={process.env.PUBLIC_URL + "/images/package/p-alpha4.png"}
                hours="12h:50m"
                title="Sed ultricies sapien arcu, sed cong feugiat sapien."
                price="₹299.00"
              />
            </div>
            <div className="col-lg-4 col-md-6">
            <CourseCard
                image={process.env.PUBLIC_URL + "/images/package/p-alpha5.png"}
                hours="30h:50m"
                title="Pellentesque habitant morbi malesua tristique senectus."
                price="₹299.00"
              />
            </div>
            <div className="col-lg-4 col-md-6">
            <CourseCard
                image={process.env.PUBLIC_URL + "/images/package/p-alpha6.png"}
                hours="03h:55m"
                title="San francisco golden gate bridge, cable & fog."
                price="₹199.00"
              />
              
            </div>
          </div>
          {/* <Pagination />   */}
        </div>
      </div>
      {/* ===============  Package gird area end =============== */}
    </>
  );
}

export default CourseGridWrapper;
