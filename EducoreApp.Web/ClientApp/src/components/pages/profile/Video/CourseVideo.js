import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import videos from "../../../../utils/videos";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import DailyCourseWrap from "../../courseDetails/DailyCourse/DailyCourseWrap";
function CourseVideo() {
    const [videosList, setVideosList] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        getVideos()
    }, []);
    const getVideos = () => {
        videos.list().then((data) => {
            setVideosList(data);
        })
    }
    return (
        <>
            <div className="about-main-wrappper pt-10">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 mt-5 mt-lg-0">
                            <div className="about-tab-wrap">
                                <div className="about-tab-switcher">
                                    <ul
                                        className="nav nav-pills mb-3 justify-content-start"
                                        id="about-tab-pills"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <div
                                                className="nav-link active"
                                                id="pills-about1"
                                                data-bs-toggle="pill"
                                                data-bs-target="#about-pills1"
                                                role="tab"
                                                aria-controls="about-pills1"
                                                aria-selected="true"
                                            >
                                                <h4>Video List</h4>
                                            </div>
                                        </li>
                                        {id ===2 && <li className="nav-item" role="presentation">
                                            <div
                                                className="nav-link"
                                                id="pills-about2"
                                                data-bs-toggle="pill"
                                                data-bs-target="#about-pills2"
                                                role="tab"
                                                aria-controls="about-pills2"
                                                aria-selected="false"
                                            >
                                                <h4>Daily market update</h4>
                                            </div>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div
                                className="tab-content about-tab-content"
                                id="pills-tabContent"
                            >
                                <div
                                    className="tab-pane fade show active"
                                    id="about-pills1"
                                    role="tabpanel"
                                    aria-labelledby="pills-about1"
                                >

                                    <div className="row pt-3">
                                        {videosList?.map((video, index) => (
                                            <div className="col-md-12" key={index}>
                                                <VideoPlayer video={video} />
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade "
                                    id="about-pills2"
                                    role="tabpanel"
                                    aria-labelledby="pills-about2"
                                >
                                   <DailyCourseWrap/>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    );
}

export default CourseVideo;
