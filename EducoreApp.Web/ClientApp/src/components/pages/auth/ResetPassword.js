import React, { useEffect, useState } from "react";
import auth from "../../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import notice from "../../../plugins/notice";
import useValidator from "../../../plugins/validator";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../common/Loading";
const reset = {
    Token: "",
    NewPassword: "",
    ConfirmPassword: "",
}
function ResetPassword() {
    const [login, setLogin] = useState(reset);
    const navigate = useHistory()
    const [validator, showMessage] = useValidator();
    const { token } = useParams();
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        handleSetData("Token", token);
    }, [])
    const error = {
        Token: validator.message(('Token'), login.Token, "required|string"),
        NewPassword: validator.message(('NewPassword'), login.NewPassword, "required|password"),
        ConfirmPassword: validator.message(('ConfirmPassword'), login.ConfirmPassword, `required|password|in:${login.NewPassword}`),
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleSetData(name, value)
    }
    const handleSetData = (name, value) => {
        setLogin((prevalue) => {
            return {
                ...prevalue,   // Spread Operator              
                [name]: value
            }
        })
    }
    const handlelogin = (e) => {
        e.preventDefault()
        if (validator.allValid()) {
            setIsSubmit(true)
            auth.resetPassword(login).then((data) => {
                setIsSubmit(false)
                notice.success("Password updated successfully login to continue")
                navigate.push("/auth/Login")
            }).catch((error) => {
                setIsSubmit(false)
                console.log("error", error)
            })
        }
        else {
            showMessage(true);
        }
    }
    return (
        <>
            <div className="about-main-wrappper pt-110">
                <div className="container ">
                    {/* <RegisterForm /> */}
                    <div className="about-tab-wrapper">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <aside className="package-widget-style-2 widget-form">
                                    <div className="widget-title text-center d-flex justify-content-between">
                                        <h4>Reset Password</h4>
                                    </div>
                                    <div className="widget-body">
                                        <form
                                            onSubmit={(e) => e.preventDefault()}
                                            action="#"
                                            method="post"
                                            id="booking-form"
                                        >
                                            <div className="booking-form-wrapper">
                                                <div className="custom-input-group">
                                                    <input type="password" placeholder="Set Your New Password" id="NewPassword" name="NewPassword" value={login.NewPassword} onChange={handleChange} />
                                                    {error?.NewPassword &&
                                                        <span className='error' style={{ color: "red" }}> {error?.NewPassword}</span>}
                                                </div>
                                                <div className="custom-input-group">
                                                    <input type="password" placeholder="Confirm Your New Password" id="ConfirmPassword" name="ConfirmPassword" value={login.ConfirmPassword} onChange={handleChange} />
                                                    {error?.ConfirmPassword &&
                                                        <span className='error' style={{ color: "red" }}> {error?.ConfirmPassword}</span>}
                                                </div>
                                                <div className="custom-input-group">
                                                    <div className="submite-btn">
                                                        <button type="submit" onClick={handlelogin}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isSubmit && <Loading />}
        </>
    );
}

export default ResetPassword;
