import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import course from "../../../utils/course";
import CourseSettingWrapperArea from "./CourseSettingWrapperArea";

function CourseSetting() {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCourseList();
    }, []);
    const getCourseList = () => {
        course.list().then((data) => {
            setLoading(false)
            setCourseList(data);
        })
    }
    return (
        <>
            {loading ? <Loading /> :
                <CourseSettingWrapperArea courseList={courseList} getCourseList={getCourseList} />}
        </>
    );
}

export default CourseSetting;
