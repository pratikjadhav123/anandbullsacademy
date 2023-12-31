import React from "react";
import MyCourseCard from "./MyCourseCard";
import { Link } from "react-router-dom/cjs/react-router-dom";

function MyCourse({ courseData }) {
    return (
        <>
            {/* ===============  Package gird area start =============== */}
            <div className="package-wrapper pt-110">
                <div className="container">
                    <div className="row g-4">
                        {courseData.length ? (courseData?.filter((item) => item.Status === "Active")?.map((item, index) => <div className="col-lg-4 col-md-6" key={index}>
                            <MyCourseCard
                                image={process.env.PUBLIC_URL + "/images/myCourse.png"}
                                title={item.Title}
                                id={item.CourseId}
                                data={item}
                            />
                        </div>)) : (<span>When you enroll in a course, it will appear here. <Link to={'/courses'} type="button" className="px-2">Browse now.</Link></span>)}
                    </div>{/* <Pagination />   */}
                </div>
            </div>
            {/* ===============  Package gird area end =============== */}
        </>
    );
}

export default MyCourse;
