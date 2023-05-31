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
    auth.logout().then((data)=>{
      navigate.push("/")
      notice.warning("Login Again to Continue learning ")
      contextObj.getUser();
    })
  }
  console.log(contextObj?.user);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <header>
        <div className={`${"header-area header-style-two"} ${isSticky && 'sticky'}`} >
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7 col-lg-8 col-md-8 col-sm-6 col-xs-6">
                <nav className={mobileSideberMenu === 1 ? "main-nav slidenav" : "main-nav"}>
                  <div className="inner-logo d-xl-none text-center">
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/`}
                    >
                      <img src={process.env.PUBLIC_URL + "/images/anandbullsweblogo310.png"} alt="Logo" />
                    </Link>
                  </div>
                  <ul>
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
              <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 col-xs-12 align-items-center d-xl-flex d-lg-block">
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
                            {contextObj.user ?
                              (<> <li>
                                <NavLink to={`${process.env.PUBLIC_URL}/myProfile`}>My Account</NavLink>
                              </li>
                                <li>
                                  <NavLink to={`#`} onClick={logout}>logout</NavLink>
                                </li>
                              </>) :
                              <li>
                                <NavLink to={`${process.env.PUBLIC_URL}/auth`}>Login</NavLink>
                              </li>}
                            {/* <li>
                              <NavLink to={"#"}>Registration</NavLink>
                            </li>
                            <li>
                              <NavLink to={"#"}>Setting</NavLink>
                            </li> */}
                          </ul>
                        </div>
                        <div onClick={handleCatagorybtn} className="category-toggle">
                          <i className="bx bx-category" />
                        </div>
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
              <div className="col-xl-3">
                <div className="nav-right d-xl-flex d-none">
                  <div className="nav-right-icons">
                    <div className="user-dropdown">
                      <i onClick={handleUserDropDown} className="bx bx-user-circle" />
                      <ul className={`${"user-drop-list"} ${isUserDropdown === 1 ? "account-drop-active" : ""}`}>
                        {contextObj.user ? (<> <li>
                          <NavLink to={`${process.env.PUBLIC_URL}/myProfile`}>My Account</NavLink>
                        </li>
                          <li>
                            <NavLink to={`#`} onClick={logout}>logout</NavLink>
                          </li>
                        </>) :
                          <li>
                            <Link to={`${process.env.PUBLIC_URL}/auth`}>Login</Link>
                          </li>}
                        {/* <li>
                          <Link to={"#"}>Setting</Link>
                        </li> */}
                      </ul>
                    </div>
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
