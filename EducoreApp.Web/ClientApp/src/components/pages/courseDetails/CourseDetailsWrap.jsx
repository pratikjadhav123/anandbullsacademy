import React from "react";
import WidgetForm from "./WidgetForm";
import PackageHeader from "./PackageHeader";
import PackageDetailsTab from "./PackageDetailsTab";

function CourseDetailsWrap() {

  return (
    <>
      <div className="package-details-wrapper pt-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour-package-details">
                <PackageHeader />
                <PackageDetailsTab />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="package-sidebar">
                <WidgetForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailsWrap;
