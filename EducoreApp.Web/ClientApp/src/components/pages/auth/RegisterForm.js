import React from "react";
import { Link } from "react-router-dom";

function RegisterForm({setCurrentPage}) {

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
                <input type="text" placeholder="First Name" id="FirstName" name="FirstName" />
              </div>
              <div className="custom-input-group">
                <input type="text" placeholder="Last Name" id="LastName" name="LastName" />
              </div>
              <div className="custom-input-group">
                <input type="email" placeholder="Your Email" id="Email" name="Email" />
              </div>
              <div className="custom-input-group">
                <input type="tel" placeholder="Phone" id="Phone" name="Phone" />
              </div>
              <div className="custom-input-group">
                <input type="password" placeholder="Set Your Password" id="Password" name="Password" />
              </div>
              <div className="custom-input-group">
                <input type="password" placeholder="Confirm Your Password" id="ConfirmPassword" name="ConfirmPassword" />
              </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit">Sign up</button>
                  <div className="d-flex justify-content-end p-2">
                  <p className="d-flex justify-content-end">Already have an account?<Link type="button" className="px-2" onClick={() => setCurrentPage("Login")}>Back to Login</Link></p>
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
