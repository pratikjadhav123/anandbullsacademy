import React from "react";


function PackageHeader() {
  return (
    <>
      <div className="pd-header">
        <div className="pd-thumb">
          <img src={process.env.PUBLIC_URL + "/images/package/pd-thumb.png"} alt="PackageIMG" />
        </div>
        <div className="header-bottom">
          <div className="pd-lavel d-flex justify-content-between align-items-center flex-wrap gap-2">
            
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
          <h2 className="pd-title">Market Psychology and Setup.</h2>
        </div>
      </div>
    </>
  );
}

export default PackageHeader;
