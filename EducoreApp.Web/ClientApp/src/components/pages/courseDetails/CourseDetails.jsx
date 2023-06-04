import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import CourseDetailsWrap from "./CourseDetailsWrap";
import course from "../../../utils/course";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../common/Loading";
import { AppContext } from "../../../plugins/AppContext";
import payment from "../../../utils/payment";


function CourseDetails() {
  const { id } = useParams()
  const [courseDetail, setCourseDetail] = useState();
  const [myCourseData, setMyCourseData] = useState([]);
  const contextObj = useContext(AppContext);
  useEffect(() => {
    getCourseDetail();
    if (contextObj?.user) {
      getCourse()
    }
  }, [])
  const getCourseDetail = () => {
    course.get(id).then((data) => {
      setCourseDetail(data);
    })
  }
  const getCourse = () => {
    payment.getCourse().then((data) => {
      setMyCourseData(data);
    }).catch((error) => {
      console.error("course", error);
    })
  }

  return (
    <>
      {!courseDetail ? <Loading /> :
        <> <Breadcrumb name="Course Details" />
          <CourseDetailsWrap courseDetail={courseDetail} user={contextObj?.user} myCourseData={myCourseData} /></>}
    </>
  )
}

export default CourseDetails
