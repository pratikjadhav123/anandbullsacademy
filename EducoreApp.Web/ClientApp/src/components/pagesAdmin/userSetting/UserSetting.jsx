import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import users from "../../../utils/users";
import UserSettingWrapper from "./UserSettingWrapper";
import course from "../../../utils/course";

function UserSetting() {
    const [usersList, setUsersList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getUserList();
        getCourseList();
    }, []);
    const getUserList = () => {
        users.list().then((data) => {
            setLoading(false)
            setUsersList(data);
        })
    }
    const getCourseList = () => {
        course.list().then((data) => {
            setCourseList(data);
        })
    }
    return (
        <>
            {loading ? <Loading /> :
                <UserSettingWrapper courseList={courseList} usersList={usersList} getUserList={getUserList} />}
        </>
    );
}

export default UserSetting;
