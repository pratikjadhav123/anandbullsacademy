import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import CourseCard from "../courseGrid/CourseCard";
import MyCourse from "./Video/MyCourse";
import ChangePasswordPage from "./ChangePasswordPage";

function ProfileWrapperArea() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="about-main-wrappper">
                <div className="container ">
                    {/* <RegisterForm /> */}
                    <div className="row justify-content-center">
                        <div className="col-lg-12 mt-5 mt-lg-0">
                            <div className="about-tab-wrap">
                                <div className="about-tab-switcher">
                                    <ul
                                        className="nav nav-pills mb-3 justify-content-start"
                                        id="about-tab-pills"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <div
                                                className="nav-link active"
                                                id="pills-about1"
                                                data-bs-toggle="pill"
                                                data-bs-target="#about-pills1"
                                                role="tab"
                                                aria-controls="about-pills1"
                                                aria-selected="true"
                                            >
                                                <h6>My Profile</h6>
                                            </div>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <div
                                                className="nav-link"
                                                id="pills-about2"
                                                data-bs-toggle="pill"
                                                data-bs-target="#about-pills2"
                                                role="tab"
                                                aria-controls="about-pills2"
                                                aria-selected="false"
                                            >
                                                <h6>My Courses</h6>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div
                                className="tab-content about-tab-content"
                                id="pills-tabContent"
                            >
                                <div
                                    className="tab-pane fade show active"
                                    id="about-pills1"
                                    role="tabpanel"
                                    aria-labelledby="pills-about1"
                                >

                                    <div className="package-card-alpha">
                                        <div className="package-thumb">
                                            <div className="accordion plans-accordion" id="planAccordion">
                                                <div className="accordion-item plans-accordion-single">
                                                    <div className="accordion-header" id="planHeadingOne">
                                                        <div
                                                            className="accordion-button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#planCollapse1"
                                                            role="navigation"
                                                        >
                                                            <div className="plan-title">
                                                                <h5>Account Details</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="planCollapse1"
                                                        className="accordion-collapse collapse show"
                                                        aria-labelledby="planHeadingOne"
                                                        data-bs-parent="#planAccordion"
                                                    >
                                                        <div className="accordion-body plan-info">
                                                            <form
                                                                onSubmit={(e) => e.preventDefault()}
                                                                action="#"
                                                                method="post"
                                                                id="booking-form"
                                                            >
                                                                <div className="booking-form-wrapper">
                                                                    <div className="row">
                                                                        <div className="col-sm-6">
                                                                            <div className="custom-input-group">
                                                                                <input type="text" placeholder="Your FirstName " id="FirstName" name="FirstName" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="custom-input-group">
                                                                                <input type="text" placeholder="Your LastName " id="LastName" name="LastName" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="custom-input-group">
                                                                            <input type="email" placeholder="Your Email" id="email" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="custom-input-group">
                                                                            <input type="tel" placeholder="Phone" id="phone" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="custom-input-group">
                                                                        <div className="submite-btn">
                                                                            <button type="submit">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item plans-accordion-single">
                                                    <div className="accordion-header" id="planHeadingTwo">
                                                        <div
                                                            className="accordion-button collapsed"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#planCollapse2"
                                                            role="navigation"
                                                        >
                                                            <div className="plan-title">
                                                                <h5>Account Security </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="planCollapse2"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="planHeadingTwo"
                                                        data-bs-parent="#planAccordion"
                                                    >
                                                        <div className="accordion-body plan-info">
                                                            <ChangePasswordPage/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item plans-accordion-single">
                                                    <div className="accordion-header" id="planHeadingThree">
                                                        <div
                                                            className="accordion-button collapsed"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#planCollapse3"
                                                            aria-controls="planCollapse1"
                                                            role="navigation"
                                                        >
                                                            <div className="plan-title">
                                                                <h5>Purchase history</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="planCollapse3"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="planHeadingThree"
                                                        data-bs-parent="#planAccordion"
                                                    >
                                                        <div className="accordion-body plan-info">
                                                            <p>
                                                                Pellentesque accumsan magna in augue sagittis, non
                                                                fringilla eros molestie. Sed feugiat mi nec ex vehicula,
                                                                nec vestibulum orci semper. Class aptent taciti sociosqu
                                                                ad litora torquent per conubia nostra, per inceptos
                                                                himenaeos. Donec tristique commodo fringilla.
                                                            </p>
                                                            <ul>
                                                                <li>
                                                                    <i className="bi bi-check-lg" /> Specilaized Bilingual
                                                                    Guide
                                                                </li>
                                                                <li>
                                                                    <i className="bi bi-check-lg" /> Private Transport
                                                                </li>
                                                                <li>
                                                                    <i className="bi bi-check-lg" /> Entrance Fees
                                                                </li>
                                                                <li>
                                                                    <i className="bi bi-check-lg" /> Box Lunch,Water,Dinner
                                                                    and Snacks
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="about-pills2"
                                    role="tabpanel"
                                    aria-labelledby="pills-about2"
                                >
                                    <MyCourse />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileWrapperArea;
