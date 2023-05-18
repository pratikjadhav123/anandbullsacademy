import React, { useState } from "react";
import ModalVideo from "react-modal-video";

function PackageDetailsTab() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="package-details-tabs">
     
          {/* package info tab */}
          <div
            className="tab-pane fade show active package-info-tab mt-5"
            id="pill-body1"
            role="tabpanel"
            aria-labelledby="pills-package1"
          >
            <h3 className="d-subtitle">Course Details</h3>
            <p>
              Pellentesque accumsan magna in augue sagittis, non fringilla eros
              molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci
              semper. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Donec tristique commodo
              fringilla. Duis aliquet varius mauris eget rutrum. Nullam sit amet
              justo consequat, bibendum orci in, convallis enim. Proin convallis
              neque viverra finibus cursus. Mauris lacinia lacinia erat in
              finibus. In non enim libero.Pellentesque accumsan magna in augue
              sagittis, non fringilla eros molestie. Sed feugiat mi nec ex
              vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.
              Donec tristique commodo fringilla. Duis aliquet varius mauris eget
              rutrum. Nullam sit amet justo consequat, bibendum orci in,
              convallis enim. Proin convallis neque viverra finibus cursus.
              Mauris lacinia lacinia erat in finibus. In non enim libero.
            </p>
            <div className="p-info-featured-img row position-relative g-3  row-cols-1 row-cols-sm-2">
              <div className="col">
                <div className="featured-img">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/package/feat-img1.png"
                    }
                    alt="PackageIMG"
                  />
                </div>
              </div>
              <div className="col">
                <div className="featured-img">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/package/feat-img2.png"
                    }
                    alt="PackageIMG"
                  />
                </div>
              </div>
              <div className="featured-video position-absolute ">
                <img
                  src={process.env.PUBLIC_URL + "/images/package/feat-img3.png"}
                  alt="PackageIMG"
                />
                <div className="video-overlay">
                  <div className="play-icon video-popup">
                    {/* <i className="bi bi-play-fill" /> */}
                    <i
                      onClick={() => setOpen(true)}
                      className="bi bi-play-fill"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              id="comment_form"
              method="post"
            >
              <div className="comment-form">
                <h4>Leave Your Comment</h4>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="custom-input-group">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        id="name1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="custom-input-group">
                      <input type="text" placeholder="Your Email" id="email1" />
                    </div>
                  </div>
                </div>
                <div className="custom-input-group">
                  <input type="text" placeholder="Tour Type" id="type" />
                </div>
                <div className="custom-input-group">
                  <textarea
                    cols={20}
                    rows={7}
                    placeholder="Write Message"
                    defaultValue={""}
                  />
                </div>
                <ul className="form-rating d-flex">
                  <li>
                    <i className="bi bi-star" />
                  </li>
                  <li>
                    <i className="bi bi-star" />
                  </li>
                  <li>
                    <i className="bi bi-star" />
                  </li>
                  <li>
                    <i className="bi bi-star" />
                  </li>
                  <li>
                    <i className="bi bi-star" />
                  </li>
                </ul>
                <div className="custom-input-group">
                  <div className="submite-btn">
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
         
      </div>
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="L61p2uyiMSo"
          onClose={() => setOpen(false)}
        />
      </React.Fragment>
    </>
  );
}

export default PackageDetailsTab;
