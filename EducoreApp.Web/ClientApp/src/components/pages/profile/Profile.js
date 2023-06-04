import React, { useContext } from "react";
import ProfileWrapperArea from "./ProfileWrapperArea";
import { AppContext } from "../../../plugins/AppContext";
import Loading from "../../common/Loading";

function Profile() {
    const contextObj = useContext(AppContext);
    return (
        <>
            {!contextObj?.user ? <Loading /> :
            <ProfileWrapperArea  user={contextObj?.user} setUser={contextObj?.setUser}/>}
        </>
    );
}

export default Profile;
