import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import CourseDetailsWrap from "./CourseDetailsWrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../common/Loading";
import { AppContext } from "../../../plugins/AppContext";
import payment from "../../../utils/payment";
import course from "../../../utils/course";
import notice from "../../../plugins/notice";


function CourseDetails() {
  const { id } = useParams()
  const [courseDetail, setCourseDetail] = useState();
  const [coupon, setCoupon] = useState(null);
  const [myCourseData, setMyCourseData] = useState([]);
  const contextObj = useContext(AppContext);
  useEffect(() => {
    getCourseDetail();
    if (contextObj?.user) {
      getMyCourse()
    }
    // eslint-disable-next-line
  }, [contextObj?.user])
  const getCourseDetail = () => {
    if (contextObj?.user) {
      const formData = new FormData()
      formData.append("CourseId", id);
      formData.append("Coupon", coupon ? coupon : '');
      payment.get(formData).then((data) => {
        setCourseDetail(data);
      }).catch((error) => {
        const formData1 = new FormData()
        formData1.append("CourseId", id);
        formData1.append("Coupon", '');
        notice.error(error.message)
        payment.get(formData1).then((data) => {
          setCourseDetail(data);
        })
      })
    } else {
      course.get(id).then((data) => {
        setCourseDetail(data);
      })
    }
  }

  const getMyCourse = () => {
    payment.getCourse().then((data) => {
      setMyCourseData(data);
    }).catch((error) => {
      console.error("course", error);
    })
  }

  return (
    <>
      {!courseDetail ? <Loading /> :
        <>
          <Breadcrumb name="Course Details" />
          <CourseDetailsWrap
            courseDetail={courseDetail}
            user={contextObj?.user}
            myCourseData={myCourseData}
            getCourseDetail={getCourseDetail}
            coupon={coupon}
            setCoupon={setCoupon}
          />
        </>}
    </>
  )
}

export default CourseDetails
