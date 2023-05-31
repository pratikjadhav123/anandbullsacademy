import React, { useEffect, useState } from "react";
import MyCourseCard from "./MyCourseCard";
import course from "../../../../utils/course";

function MyCourse() {
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        getCourse()
    }, []);
    const getCourse = () => {
        course.list().then((data) => {
            setCourseData(data);
        }).catch((error) => {
            console.error("course",error);
        })
    }
    console.log(courseData);

    return (
        <>
            {/* ===============  Package gird area start =============== */}
            <div className="package-wrapper pt-110">
                <div className="container">
                    <div className="row g-4">
                        {courseData.map((item)=><div className="col-lg-4 col-md-6">
                            <MyCourseCard
                                image={process.env.PUBLIC_URL + "/images/package/p-alpha1.png"}
                                hours="16h:00m"
                                title={item.Title}
                                id={item.CourseId}
                            />
                        </div>)}
                    </div>{/* <Pagination />   */}
                </div>
            </div>
            {/* ===============  Package gird area end =============== */}
        </>
    );
}

export default MyCourse;
