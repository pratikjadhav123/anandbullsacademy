import React from "react";


function PackageHeader({courseDetail}) {

  return (
    <>
      <div className="pd-header">
        <div className="pd-thumb">
          <img src={process.env.PUBLIC_URL + "/images/youtubeVideo.png"} alt="PackageIMG" />
        </div>
        <div className="header-bottom">
          <div className="pd-lavel d-flex justify-content-between align-items-center flex-wrap ">
            
            <ul className="d-flex align-items-center rating">
              <li>
                <i className="bi bi-star-fill" />
              </li>
              <li>
                <i className="bi bi-star-fill" />
              </li>
              <li>
                <i className="bi bi-star-fill" />
              </li>
              <li>
                <i className="bi bi-star-fill" />
              </li>
              <li>
                <i className="bi bi-star-fill" />
              </li>
            </ul>
          </div>
          <h2 className="pd-title">{courseDetail.Title}.</h2>
        </div>
      </div>
    </>
  );
}

export default PackageHeader;
