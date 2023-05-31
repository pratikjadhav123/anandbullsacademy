import React from "react";
import VideoPlayer from "./VideoPlayer";
function CourseVideo() {
    const videos = ['video1.mp4']; // Example video URLs or file names
    const videoSrc = "https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine-hls/hls.m3u8";
    return (
        <>
            <div className="package-wrapper pt-110">
                <div className="container">
                    <h1>Video List</h1>
                    <div className="row">
                        {videos.map((video, index) => (
                            <div className="col-md-12" style={{backgroundColor:"red"}} key={index}>
                                <VideoPlayer />
                            </div>
                        ))}
                        
                    </div>
                    <VideoPlayer videoSrc={videoSrc} />

                </div>
            </div>
        </>
    );
}

export default CourseVideo;
