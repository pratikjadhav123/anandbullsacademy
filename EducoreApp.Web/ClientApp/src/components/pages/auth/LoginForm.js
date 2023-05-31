import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../../utils/auth";
import { AppContext } from "../../../plugins/AppContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import notice from "../../../plugins/notice";
const reset = {
  Email: "",
  Password: ""
}
function LoginForm({ setCurrentPage }) {
  const [login, setLogin] = useState(reset);
  const navigate = useHistory()

  const contextObj = useContext(AppContext);

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
    auth.login(login).then((data) => {
      contextObj.getAllData();
      notice.success("Login Successfully")
      navigate.push("/myProfile")

    }).catch(error =>
      console.log("error", error)
    )
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
              </div>
              <div className="custom-input-group">
                <input type="Password" placeholder="password" id="PassWord" name="Password" value={login.Password} onChange={handleChange} />
              </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit" onClick={handlelogin}>Login Now</button>
                  <div className="d-flex justify-content-end p-2">
                    <p className="d-flex justify-content-end">Don't have an account?<Link to={"#"} type="button" className="px-2" onClick={() => setCurrentPage("Register")}>Sign up</Link></p>
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
