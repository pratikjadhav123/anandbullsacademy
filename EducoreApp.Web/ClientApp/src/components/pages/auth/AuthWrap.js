import React from "react";
import "react-modal-video/css/modal-video.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function AuthWrap() {
    const {path} = useParams();
    return (
        <>
            <div className="about-main-wrappper pt-110">
                <div className="container ">
                    {/* <RegisterForm /> */}
                    <div className="about-tab-wrapper">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <div className="about-tab-wrap">
                                    {path === "Login" && <LoginForm/>}
                                    {path === "Register" && <RegisterForm/>}
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
