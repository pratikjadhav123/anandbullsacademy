import React, { useState } from "react";
import "react-modal-video/css/modal-video.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthWrap() {
    const [isOpen, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("Login")
    return (
        <>
            <div className="about-main-wrappper pt-110">
                <div className="container ">
                    {/* <RegisterForm /> */}
                    <div className="about-tab-wrapper">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <div className="about-tab-wrap">
                                    {currentPage === "Login" ?
                                        <LoginForm setCurrentPage={setCurrentPage} />
                                        : <RegisterForm setCurrentPage={setCurrentPage} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthWrap;
