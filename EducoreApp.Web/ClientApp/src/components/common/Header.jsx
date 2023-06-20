import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { AppContext } from '../../plugins/AppContext';
import auth from '../../utils/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import notice from '../../plugins/notice';



function Header() {
  const [isCatagoryActive, setCatagoryActive] = useState(false);
  const [isUserDropdown, setUserDropdown] = useState(false);
  const [mobileSideberMenu, setMobileSideberMenu] = useState(0);
  const contextObj = useContext(AppContext);
  const navigate = useHistory()
  const handleUserDropDown = () => {
    if (isUserDropdown === false || isUserDropdown === 0) {
      setUserDropdown(1);
    } else {
      setUserDropdown(false)
    }
  }
  const handleMobileSiderbar = () => {
    if (mobileSideberMenu === false || mobileSideberMenu === 0) {
      setMobileSideberMenu(1);
    } else {
      setMobileSideberMenu(false);
    }
  };
  const handleCatagorybtn = () => {
    if (isCatagoryActive === false || isCatagoryActive === 0) {
      setCatagoryActive(1);

    } else {
      setCatagoryActive(false);
    }
  };
  useEffect(() => {
    // Add scroll event when the component is loaded
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });
  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector('header');
    const scrollTop = window.scrollY;
    scrollTop >= 200 ? header.classList.add('sticky') : header.classList.remove('sticky');
  }

  const logout = () => {
    auth.logout().then((data) => {
      navigate.push("/")
      notice.warning("Login Again to Continue learning ")
      contextObj.getUser();
    }).catch((error)=>{
      navigate.push("/")
      contextObj.getUser();
    })
  }
  console.log("header",contextObj?.user);
  
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className={`${"category-sidebar-wrapper"} ${isCatagoryActive === 1 ? "category-active" : ''} `} >
        <div className="category-sidebar">
          <div className="category-header d-flex justify-content-between align-items-center">
            <h4>Category</h4>
            <div onClick={handleCatagorybtn} className="category-toggle">
              <i className="bi bi-x-lg" />
            </div>
          </div>
          <div className="row row-cols-lg-3 row-cols-2 gy-5 mt-3">
            <div className="col">
              <Link
                className="category-box"
                onClick={scrollTop}
                to={`${process.env.PUBLIC_URL}/Admin/CourseSetting`}
              >
                <div className="cate-icon mx-auto">
                  <img src={process.env.PUBLIC_URL + "/images/icons/counter-icon1.svg"} alt="images" />
                </div>
                <h5>Course Setting</h5>
              </Link>
            </div>
            <div className="col">
              <Link
                className="category-box"
                onClick={scrollTop}
                to={`${process.env.PUBLIC_URL}/Admin/UserSetting`}
              >
                <div className="cate-icon mx-auto">
                  <img src={process.env.PUBLIC_URL + "/images/icons/cate2.svg"} alt="images" />
                </div>
                <h5>User Setting</h5>
              </Link>
            </div>
            <div className="col">
              <Link
                className="category-box"
                onClick={scrollTop}
                to={`${process.env.PUBLIC_URL}/Admin/VideoSetting`}
              >
                <div className="cate-icon mx-auto">
                  <img src={process.env.PUBLIC_URL + "/images/icons/video-icon.svg"} alt="images" />
                </div>
                <h5>Video Setting</h5>
              </Link>
            </div>
            <div className="col">
              <Link
                className="category-box"
                onClick={scrollTop}
                to={`${process.env.PUBLIC_URL}/Admin/CouponSetting`}
              >
                <div className="cate-icon mx-auto">
                  <img src={process.env.PUBLIC_URL + "/images/icons/payment-icon.svg"} alt="images" />
                </div>
                <h5>Coupon Setting</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <header>
        <div className={`${"header-area header-style-two"} ${isSticky && 'sticky'}`} >
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6 col-lg-8 col-md-8 col-sm-6 col-xs-6 d-flex justify-content-center">
                <nav className={mobileSideberMenu === 1 ? "main-nav slidenav" : "main-nav"}>
                  <div className="inner-logo d-xl-none text-center">
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/`}
                    >
                      <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
                    </Link>
                  </div>
                  <ul >
                    <li >
                      <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
                    </li>
                    <li>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/about`}
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/courses`}>Courses</Link>
                    </li>
                    <li>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/contact`}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  <div className="inner-contact-options d-xl-none">
                    <div className="contact-box-inner">
                      <i className="bi bi-telephone-fill" />
                      <Link to={"tel:+91 8208667300"}>+91 8208667300</Link>
                    </div>
                    <div className="contact-box-inner">
                      <i className="bi bi-envelope-fill" />
                      <Link to={"mailto:anandbulls08@gmail.com"}>
                        anandbulls08@gmail.com
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12 align-items-center d-xl-flex d-lg-block">
                <div className="nav-logo d-flex justify-content-between align-items-center mr-2">
                  <Link
                    onClick={scrollTop}
                    to={`${process.env.PUBLIC_URL}/`}
                  >
                    <img src={process.env.PUBLIC_URL + "/images/anandbullsweblogo310.png"} alt="logo" />
                  </Link>
                  <div className="mobile-menu d-flex ">
                    <div className="d-flex align-items-center">
                      <div className="nav-right-icons d-xl-none d-flex align-items-center ">
                        <div className="user-dropdown">
                          <i onClick={handleUserDropDown} className="bx bx-user-circle" />
                          <ul className={`${"user-drop-list"} ${isUserDropdown === 1 ? "account-drop-active" : ""}`}>
                            {contextObj?.user ?
                              (<> <li>
                                <NavLink to={`${process.env.PUBLIC_URL}/myProfile`}>My Account</NavLink>
                              </li>
                                <li>
                                  <NavLink to={`#`} onClick={logout}>logout</NavLink>
                                </li>
                              </>) :
                              <li>
                                <NavLink to={`${process.env.PUBLIC_URL}/auth/Login`}>Login</NavLink>
                              </li>}
                            {/* <li>
                              <NavLink to={"#"}>Registration</NavLink>
                            </li>
                            <li>
                              <NavLink to={"#"}>Setting</NavLink>
                            </li> */}
                          </ul>
                        </div>
                        {contextObj?.user?.Role === "Admin" && <div onClick={handleCatagorybtn} className="category-toggle">
                          <i className="bx bx-category" />
                        </div>}
                      </div>
                      <Link
                        to={"#"}
                        onClick={handleMobileSiderbar}
                        className={
                          mobileSideberMenu === 1
                            ? "hamburger d-block d-xl-none h-active"
                            : "hamburger d-block d-xl-none"
                        }
                      >
                        <span className="h-top" />
                        <span className="h-middle" />
                        <span className="h-bottom" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* big screen */}
              <div className="col-xl-3">
                <div className="nav-right d-xl-flex d-none">
                  <div className="nav-right-icons">
                    <div className="user-dropdown">
                      <i onClick={handleUserDropDown} className="bx bx-user-circle" />
                      <ul className={`${"user-drop-list"} ${isUserDropdown === 1 ? "account-drop-active" : ""}`}>
                        {contextObj?.user ? (
                          <>
                            <li>
                              <NavLink to={`${process.env.PUBLIC_URL}/myProfile`}>My Account</NavLink>
                            </li>
                            <li>
                              <NavLink to={`#`} onClick={logout}>logout</NavLink>
                            </li>
                          </>) :
                          <li>
                            <Link to={`${process.env.PUBLIC_URL}/auth/Login`}>Login</Link>
                          </li>}
                        {/* <li>
                          <Link to={"#"}>Setting</Link>
                        </li> */}
                      </ul>
                    </div>
                    {contextObj?.user?.Role === "Admin" && <div onClick={handleCatagorybtn} className="category-toggle">
                      <i className="bx bx-category" />
                    </div>}
                  </div>
                  <div className="nav-right-hotline">
                    <div className="hotline-icon">
                      <i className="bi bi-phone-vibrate" />
                    </div>
                    <div className="hotline-info">
                      <span>Hot Line Number</span>
                      <h6>
                        <a rel="noopener noreferrer" href="tel: +91 8208667300">
                          +91 8208667300
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
