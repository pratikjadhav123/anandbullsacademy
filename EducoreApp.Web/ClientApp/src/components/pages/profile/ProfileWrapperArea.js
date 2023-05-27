import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

function ProfileWrapperArea() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="about-main-wrappper pt-110">
                <div className="container ">
                    {/* <RegisterForm /> */}
                    <div className="about-tab-wrapper">
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
                                                <p>
                                                    Duis rutrum nisl urna. Maecenas vel libero faucibus nisi
                                                    venenatis hendrerit a id lectus. Suspendissendt blandit
                                                    interdum. Sed pellentesque at nunc eget consente
                                                    consectetur.Duis rutrum nisl urna. Maecenas vel libero
                                                    faucibus nisi venenatis hendrerit a id lectus.
                                                    Suspendissendt blandit interdum. Sed pellentesque at
                                                    nunc consectetur.Duis rutrum nisl urna. Maecenas vel
                                                    libero faucibus nisi venenatis hendrerit a id lectus.
                                                    Suspendissendt blandit interdum. Sed pellentesque at
                                                    nunc consectetur.Duis rutrum nisl urna. Maecenas vel
                                                    libero faucibus nisi venenatis hendrerit a id lectus.
                                                    Suspendissendt blandit interdum. Sed pellentesque at
                                                    nunc consectetur.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="about-pills2"
                                        role="tabpanel"
                                        aria-labelledby="pills-about2"
                                    >
                                        <p>
                                            Duis rutrum nisl urna. Maecenas vel libero faucibus nisi
                                            venenatis hendrerit a id lectus. Suspendissendt blandit
                                            interdum. Sed pellentesque at nunc eget consente
                                            consectetur.Duis rutrum nisl urna. Maecenas vel libero
                                            faucibus nisi venenatis hendrerit a id lectus.
                                            Suspendissendt blandit interdum. Sed pellentesque at
                                            nunc consectetur.Duis rutrum nisl urna. Maecenas vel
                                            libero faucibus nisi venenatis hendrerit.
                                        </p>
                                    </div>
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
