import React, { useState } from "react";
import ModalVideo from "react-modal-video";

function PackageDetailsTab({ courseDetail }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="package-details-tabs">

        {/* package info tab */}
        <div
          className="tab-pane fade show active package-info-tab mt-3"
          id="pill-body1"
          role="tabpanel"
          aria-labelledby="pills-package1"
        >
          <h3 className="d-subtitle">Course Details</h3>
          <p>
            {courseDetail.Description}
          </p>
        </div>

      </div>
    </>
  );
}

export default PackageDetailsTab;
