import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import videos from "../../../../utils/videos";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
function CourseVideo() {
    const [videosList, setVideosList] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        getVideos()
    }, []);
    const getVideos = () => {
        videos.get(id).then((data) => {
            setVideosList(data);
        })
    }
    return (
        <>
            <div className="package-wrapper pt-110">
                <div className="container">
                    <h1>Video List</h1>
                    <div className="row pt-3">
                        {videosList?.map((video, index) => (
                            <div className="col-md-10" key={index}>
                                <VideoPlayer video={video} />
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}

export default CourseVideo;
