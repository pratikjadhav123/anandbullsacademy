import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../../utils/auth";
import { AppContext } from "../../../plugins/AppContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import notice from "../../../plugins/notice";
import useValidator from "../../../plugins/validator";
const reset = {
  Email: "",
  Password: ""
}
function LoginForm() {
  const [login, setLogin] = useState(reset);
  const navigate = useHistory()
  const [validator, showMessage] = useValidator();
  const [validator2, showMessage2] = useValidator();
  const contextObj = useContext(AppContext);
  const error = {
    Email: validator.message(('Email'), login.Email, "required|email"),
    forgotEmail: validator2.message(('Email'), login.Email, "required|email"),
    Password: validator.message(('Password'), login.Password, "required|password|max:20|min:5"),
    // Mobile: validator.message(('Mobile'), register.Mobile, "required|string|max:200"),
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
      auth.login(login).then((data) => {
        contextObj.getAllData();
        notice.success("Login Successfully")
        navigate.push("/myProfile")

      }).catch(error =>
        console.log("error", error)
      )}
    else {
      showMessage(true);
    }
  }
  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (validator2.allValid()) {
      auth.forgotPassword(login).then((data) => {
        console.log(data);
        notice.success("Reset Password link send to your Email")
      }).catch(error =>
        console.log("error", error)
      )}
    else {
      showMessage2(true);
      showMessage(false);
    }
  }
  return (
    <>
      <aside className="package-widget-style-2 widget-form">
        <div className="widget-title text-center d-flex justify-content-between">
          <h4>Login Form</h4>
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
                <input type="email" placeholder="Your Email" id="email" name="Email" value={login.Email} onChange={handleChange} />
                {error?.Email &&
                  <span className='error' style={{ color: "red" }}> {error?.Email}</span>}
                  {error?.forgotEmail &&
                  <span className='error' style={{ color: "red" }}> {error?.forgotEmail}</span>}
               </div>
              <div className="custom-input-group">
                <input type="Password" placeholder="password" id="PassWord" name="Password" value={login.Password} onChange={handleChange} />
                {error?.Password &&
                  <span className='error' style={{ color: "red" }}> {error?.Password}</span>}
               </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit" onClick={handlelogin}>Login Now</button>
                  <div className="d-flex justify-content-evenly p-2">
                    <p className="d-flex justify-content-end">Forgote Password?<Link to={'#'} type="button" className="px-2" onClick={handleForgotPassword}>Click Here</Link></p>
                    <p className="d-flex justify-content-end">Don't have an account?<Link to={'/auth/Register'} type="button" className="px-2">Sign up</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}

export default LoginForm;
