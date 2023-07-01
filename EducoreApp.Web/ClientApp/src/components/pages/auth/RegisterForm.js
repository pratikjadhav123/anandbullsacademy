import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import users from "../../../utils/users";
import notice from "../../../plugins/notice";
import auth from "../../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useValidator from "../../../plugins/validator";
import { AppContext } from "../../../plugins/AppContext";
import Loading from "../../common/Loading";
const reset = {
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  Mobile: ""
}
function RegisterForm() {
  const [register, setRegister] = useState(reset);
  const [validator, showMessage] = useValidator();
  const [validator2, showMessage2] = useValidator();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const contextObj = useContext(AppContext);
  const [fakeOtp, setFakeOtp] = useState(false);
  const navigate = useHistory()
  const [otp, setOtp] = useState({ OTP: "" })

  const error = {
    FirstName: validator.message(('FirstName'), register.FirstName, "required|alpha|max:100"),
    LastName: validator.message(('LastName'), register.LastName, "required|alpha|max:100"),
    Email: validator.message(('Email'), register.Email, "required|email"),
    Mobile: validator.message(('Mobile'), register.Mobile, "required|string|max:200"),
    Password: validator.message(('Password'), register.Password, "required|password|max:20|min:5"),
    ConfirmPassword: validator.message(('ConfirmPassword'), register.ConfirmPassword, `required|password|in:${register.Password}`),
    OTP: validator2.message(('OTP'), otp.OTP, `required|string|max:6`),
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    handleSetData(name, value)
  }
  const handleOtp = (e) => {
    const { name, value } = e.target;
    setOtp((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }
  const handleSetData = (name, value) => {
    setRegister((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }
  const handleRegister = (e) => {
    e.preventDefault()
    if (validator.allValid()) {
      setIsSubmit(true)
      auth.register(register).then((data) => {
        setIsSubmit(false);
        notice.success(data.message)
        setFakeOtp(true);
      }).catch((error) => {
        setIsSubmit(false);
        console.log("error", error)
      })
    }
    else {
      showMessage(true);
    }
  }
  const handleOtpSubmit = (e) => {
    e.preventDefault()
    if (validator2.allValid()) {
      auth.confirmOTP(otp).then((data) => {
        notice.success("Successfully Register")
        setRegister(reset);
        setFakeOtp(false);
        contextObj.getAllData();
        navigate.push("/myProfile");
      }).catch(error =>
        console.log("error", error)
      )
    }
    else {
      showMessage2(true);
    }
  }
  return (
    <>
      <aside className="package-widget-style-2 widget-form">
        <div className="widget-title text-center d-flex justify-content-between">
          <h4>Registration Form</h4>
        </div>
        <div className="widget-body">
          {!fakeOtp ? <form
            onSubmit={(e) => e.preventDefault()}
            action="#"
            method="post"
            id="booking-form"
          >
            <div className="booking-form-wrapper">
              <div className="custom-input-group">
                <input type="text" placeholder="First Name" id="FirstName" name="FirstName" value={register.FirstName} onChange={handleChange} />
                {error?.FirstName &&
                  <span className='error' style={{ color: "red" }}> {error?.FirstName}</span>}
              </div>
              <div className="custom-input-group">
                <input type="text" placeholder="Last Name" id="LastName" name="LastName" value={register.LastName} onChange={handleChange} />
                {error?.LastName &&
                  <span className='error' style={{ color: "red" }}> {error?.LastName}</span>}
              </div>
              <div className="custom-input-group">
                <input type="email" placeholder="Your Email" id="Email" name="Email" value={register.Email} onChange={handleChange} />
                {error?.Email &&
                  <span className='error' style={{ color: "red" }}> {error?.Email}</span>}
              </div>
              <div className="custom-input-group">
                <input type="tel" placeholder="Mobile" id="Mobile" name="Mobile" value={register.Mobile} onChange={handleChange} />
                {error?.Mobile &&
                  <span className='error' style={{ color: "red" }}> {error?.Mobile}</span>}
              </div>
              <div className="custom-input-group">
                <input type={show1 ? "text" : "password"} placeholder="Set Your Password" id="Password" name="Password" value={register.Password} onChange={handleChange} />
                <i onClick={() => setShow1(!show1)} className={show1 ? 'bi-eye-slash' : 'bi-eye'}></i>

                {error?.Password &&
                  <span className='error' style={{ color: "red" }}> {error?.Password}</span>}
              </div>
              <div className="custom-input-group">
                <input type={show ? "text" : "password"} placeholder="Confirm Your Password" id="ConfirmPassword" name="ConfirmPassword" value={register.ConfirmPassword} onChange={handleChange} />
                <i onClick={() => setShow(!show)} className={show ? 'bi-eye-slash' : 'bi-eye'}></i>
                {error?.ConfirmPassword &&
                  <span className='error' style={{ color: "red" }}> {error?.ConfirmPassword}</span>}
              </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit" onClick={handleRegister}>Sign up</button>
                  <div className="d-flex justify-content-evenly p-2">
                    <p className="d-flex justify-content-start"><Link to={"#"} type="button" className="px-2" onClick={() => setFakeOtp(true)}>Recived otp?</Link></p>
                    <p className="d-flex justify-content-end">Already have an account?<Link to={'/auth/Login'} type="button" className="px-2">Back to Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </form> :
            <form
              onSubmit={(e) => e.preventDefault()}
              action="#"
              method="post"
              id="booking-form"
            >
              <div className="booking-form-wrapper">
                <div className="custom-input-group">
                  <input type="text" placeholder="OTP" id="OTP" name="OTP" value={otp.OTP} onChange={handleOtp} />
                  {error?.OTP &&
                    <span className='error' style={{ color: "red" }}> {error?.OTP}</span>}
                </div>
                <div className="custom-input-group">
                  <div className="submite-btn">
                    <button type="submit" onClick={handleOtpSubmit}>Submit</button>
                    <div className="d-flex justify-content-evenly p-2">
                      <p className="d-flex justify-content-start"><Link to={"#"} type="button" className="px-2" onClick={() => setFakeOtp(false)}>Back to RegisterForm</Link></p>
                      <p className="d-flex justify-content-end">Already have an account?<Link to={'/auth/Login'} type="button" className="px-2">Back to Login</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </form>}
        </div>
      </aside>
      {isSubmit && <Loading />}
    </>
  );
}

export default RegisterForm;
