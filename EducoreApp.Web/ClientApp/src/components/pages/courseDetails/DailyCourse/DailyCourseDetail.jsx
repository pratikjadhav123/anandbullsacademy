import React from "react";
import Breadcrumb from "../../../common/Breadcrumb";
import Loading from "../../../common/Loading";
import DailyCourseWrap from "./DailyCourseWrap";


function DailyCourseDetail() {

  return (
    <>
      {!true ? <Loading /> :
        <>
          <Breadcrumb name="Daily Update Course" />
          <DailyCourseWrap/> 
        </>}
    </>
  )
}

export default DailyCourseDetail
