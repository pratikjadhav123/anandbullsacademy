import React from "react";
import WidgetForm from "./WidgetForm";
import PackageHeader from "./PackageHeader";
import PackageDetailsTab from "./PackageDetailsTab";

function CourseDetailsWrap({ courseDetail, user, myCourseData }) {
  let MyCourse =  myCourseData?.find((item)=> item.CourseId === courseDetail.CourseId );
  return (
    <>
      <div className="package-details-wrapper pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour-package-details">
                <PackageHeader courseDetail={courseDetail} />
                <PackageDetailsTab courseDetail={courseDetail} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="package-sidebar">
                <WidgetForm courseDetail={courseDetail} user={user} MyCourse={MyCourse} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailsWrap;
