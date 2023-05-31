import React, { useState } from "react";
import { Link } from "react-router-dom";
import users from "../../../utils/users";
import notice from "../../../plugins/notice";
const reset = {
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  Mobile: ""
}
function RegisterForm({ setCurrentPage }) {
  const [register, setregister] = useState(reset);
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSetData(name, value)
  }
  const handleSetData = (name, value) => {
    setregister((prevalue) => {
      return {
        ...prevalue,   // Spread Operator              
        [name]: value
      }
    })
  }
  const handleRegister = (e) => {
    console.log(register);
    e.preventDefault()
    users.create(register).then((data) => {
      notice.success("Successfully register Please Login to continue")
      setCurrentPage("Login")
    }).catch(error =>
      console.log("error", error)
    )
  }
  return (
    <>
      <aside className="package-widget-style-2 widget-form">
        <div className="widget-title text-center d-flex justify-content-between">
          <h4>Registration Form</h4>
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
                <input type="text" placeholder="First Name" id="FirstName" name="FirstName" value={register.FirstName} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <input type="text" placeholder="Last Name" id="LastName" name="LastName" value={register.LastName} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <input type="email" placeholder="Your Email" id="Email" name="Email" value={register.Email} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <input type="tel" placeholder="Mobile" id="Mobile" name="Mobile" value={register.Mobile} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <input type="password" placeholder="Set Your Password" id="Password" name="Password" value={register.Password} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <input type="password" placeholder="Confirm Your Password" id="ConfirmPassword" name="ConfirmPassword" value={register.ConfirmPassword} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit" onClick={handleRegister}>Sign up</button>
                  <div className="d-flex justify-content-end p-2">
                    <p className="d-flex justify-content-end">Already have an account?<Link to={"#"} type="button" className="px-2" onClick={() => setCurrentPage("Login")}>Back to Login</Link></p>
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

export default RegisterForm;
