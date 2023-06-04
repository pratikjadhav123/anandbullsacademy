import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../plugins/AppContext";
import Loading from "../../common/Loading";
import course from "../../../utils/course";
import CourseSettingWrapperArea from "./CourseSettingWrapperArea";

function CourseSetting() {
    const contextObj = useContext(AppContext);
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
