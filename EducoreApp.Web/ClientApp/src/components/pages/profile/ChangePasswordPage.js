import react, { useContext, useState } from "react";
import auth from "../../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import notice from "../../../plugins/notice";
import { AppContext } from "../../../plugins/AppContext";
const resetData = {
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
}
const ChangePasswordPage = () => {
    const [data, setData] = useState(resetData);
    const navigate = useHistory();
    const contextObj = useContext(AppContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }
    const handleSubmit = () => {
        auth.changePassword(data).then((data) => {
            contextObj.logout()
            notice.info("Password change sucssesfully Please Login again to continue Learning ")
            navigate.push("/")
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            action="#"
            method="post"
            id="booking-form"
        >
            <div className="booking-form-wrapper">

                <div className="col-sm-6">
                    <div className="custom-input-group">
                        <label htmlFor="email">Your Email :</label>
                        <input type="email" placeholder="Your Email" id="email" disabled value={contextObj?.user?.Email} />
                    </div>
                </div>
                <div className="col-sm-6 row">
                    <div className="custom-input-group">
                        <input type="email" placeholder="Old Password" id="OldPassword" name="OldPassword" value={data.OldPassword} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm-6 row">
                    <div className="custom-input-group">
                        <input type="email" placeholder="New Password" id="NewPassword" name="NewPassword" value={data.NewPassword} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm-6 row">
                    <div className="custom-input-group">
                        <input type="email" placeholder="Confirm your Password " id="ConfirmPassword" name="ConfirmPassword" value={data.ConfirmPassword} onChange={handleChange} />
                    </div>
                </div>
                <div className="custom-input-group">
                    <div className="submite-btn">
                        <button type="submit">Update</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default ChangePasswordPage;