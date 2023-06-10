import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import course from "../../../utils/course";

function CourseGridWrapper() {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    getCourseList();
  }, [])

  const getCourseList = () => {
    course.list().then((data) => {
      setCourseList(data)
    }).catch((error) => {
      console.error("course errorr:", error);
    })
  }
  return (
    <>
      {/* ===============  Package gird area start =============== */}
      <div className="package-wrapper pt-110">
        <div className="container">
          <div className="row g-4">

            {courseList?.map((item, index) => <div className="col-lg-4 col-md-6" key={index}>
              <CourseCard
                image={process.env.PUBLIC_URL + "/images/youtubeVideo.png"}
                hours=""
                title={item.Title}
                price={item.Price}
                course={item}
              />
            </div>)}
          </div>
          {/* <Pagination />   */}
        </div>
      </div>
      {/* ===============  Package gird area end =============== */}
    </>
  );
}

export default CourseGridWrapper;
