import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../plugins/AppContext";
import Loading from "../../common/Loading";
import course from "../../../utils/course";
import VideoSettingWrapperArea from "./VideoSettingWrapperArea";
import videos from "../../../utils/videos";

function VideoSetting() {
    const contextObj = useContext(AppContext);
    const [videoList, setVideoList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getVideoList();
        getCourseList();
    }, []);
    const getVideoList = () => {
        videos.list().then((data) => {
            setLoading(false)
            setVideoList(data);
        })
    }

    const getCourseList = () => {
        course.list().then((data) => {
            setLoading(false)
            setCourseList(data);
        })
    }
    return (
        <>
            {loading ? <Loading /> :
                <VideoSettingWrapperArea videoList={videoList} getVideoList={getVideoList} courseList={courseList}/>
              }
        </>
    );
}

export default VideoSetting;
