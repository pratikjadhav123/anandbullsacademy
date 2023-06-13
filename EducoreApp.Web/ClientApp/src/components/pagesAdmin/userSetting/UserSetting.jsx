import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../plugins/AppContext";
import Loading from "../../common/Loading";
import users from "../../../utils/users";
import UserSettingWrapper from "./UserSettingWrapper";

function UserSetting() {
    const contextObj = useContext(AppContext);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getUserList();
    }, []);
    const getUserList = () => {
        users.list().then((data) => {
            setLoading(false)
            setUsersList(data);
        })
    }
    return (
        <>
            {loading ? <Loading /> :
                <UserSettingWrapper usersList={usersList} getUserList={getUserList} />}
        </>
    );
}

export default UserSetting;
