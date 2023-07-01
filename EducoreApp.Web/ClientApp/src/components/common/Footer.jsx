
import { Link } from "react-router-dom";

function Footer(props) {
  // smooth scrol
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={props.className}>
        <div className="footer-main-wrapper">
          <div className="footer-vactor">
            <img src={process.env.PUBLIC_URL + "/images/banner/footer-bg.png"} alt="FooterIMG" />
          </div>
          <div className="container">
            <div className="row justify-content-around g-4">
              <div className="col-lg-4">
                <div className="footer-about text-lg-start text-center">
                  <div className="footer-social-wrap">
                    <h5>Follow Us On:</h5>
                    <ul className="footer-social-links justify-content-lg-start justify-content-center">
                      <li>
                        <a
                          rel="noopener noreferrer"
                          href="https://instagram.com/anand_bulls?igshid=NTc4MTIwNjQ2YQ=="
                          target="_blank"
                        >
                          <i className="bx bxl-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          rel="noopener noreferrer"
                          href="https://t.me/Anandbullsak"
                          target="_blank"
                        >
                          <i className="bx bxl-telegram" />
                        </a>
                      </li>
                      <li>
                        <a
                          rel="noopener noreferrer"
                          href="https://www.whatsapp.com/"
                          target="_blank"
                        >
                          <i className="bx bxl-whatsapp" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="footer-widget">
                  <h3 className="footer-widget-title">Quick Link</h3>
                  <ul className="footer-links">
                    <li>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/about`}
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/courses`}
                      >
                        Course List
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/myProfile`}
                      >
                        My Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-contact-wrapper">
              <h5>Contact Us:</h5>
              <ul className="footer-contact-list">
                <li>
                  <i className="bi bi-telephone-x" />{" "}
                  <a rel="noopener noreferrer" href="tel:+91 8208667300">
                    +91 8208667300
                  </a>
                </li>
                <li>
                  <i className="bi bi-geo-alt" />{" "}
                  <Link to={"#"}>1550, Subhash Nagar, Barshi, Maharashtra 413401</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-4 col-md-6 order-lg-1 order-3 ">
                <div className="copyright-link text-lg-start text-center">
                  <p>
                    Copyright 2023 Anand Bulls Treding Academy
                  </p>
                </div>
              </div>
              <div className="col-lg-4  order-lg-2 order-1">
                <div className="footer-logo text-center">
                  <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/`}>
                    <img src={process.env.PUBLIC_URL + "/images/anandbullsweblogo310.png"} alt="FooterIMG" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 order-lg-3 order-2">
                <div className="policy-links">
                  <ul className="policy-list justify-content-lg-end justify-content-center">
                    <li>
                      <Link to={"#"}>Terms &amp; Condition</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
