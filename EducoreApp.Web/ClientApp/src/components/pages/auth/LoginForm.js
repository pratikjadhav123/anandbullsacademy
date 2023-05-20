import React from "react";
import { Link } from "react-router-dom";

function LoginForm({setCurrentPage}) {

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
                <input type="email" placeholder="Your Email" id="email" />
              </div>
              <div className="custom-input-group">
                <input type="Password" placeholder="password" id="PassWord" />
              </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit">Login Now</button>
                  <div className="d-flex justify-content-end p-2">
                  <p className="d-flex justify-content-end">Don't have an account?<Link type="button" className="px-2" onClick={() => setCurrentPage("Register")}>Sign up</Link></p>
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
