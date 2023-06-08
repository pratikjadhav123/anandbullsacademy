import React, { useEffect, useState } from 'react';
import OpenPlayerJS from 'openplayerjs';
import 'openplayerjs/dist/openplayer.css';
import videos from '../../../../utils/videos';

const VideoPlayer = ({ video }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [vdolink, setVideoLink] = useState()
  const handleVideoOpen = () => setVideoOpen(!videoOpen)
  useEffect(() => {
    getLink()
  }, []);
  const getLink = () => {
    videos.getLink(video.VideoUrl).then((data) => {
      setVideoLink(data.VideoUrl);
    })
  }
  // document.addEventListener('contextmenu', event => event.preventDefault());

  return (
    <div>
      <div className="package-card-alpha d-flex p-4 align-items-center" style={{ fontSize: "25px", cursor: "pointer" }} onClick={handleVideoOpen}>
        {/* <div className="hotline-icon"> */}
        <i class="bi bi-play-btn"></i>
        {/* </div> */}
        <h3 className="px-3">
          {video.Name}
        </h3>
        <i className="bx bxs-right-arrow-alt" />
      </div>
      {videoOpen &&
        <>
          <div style={{ paddingTop: "55%", position: "relative" }}>
            <iframe
              src={vdolink}
              style={{ border: "0", maxWidth: "100%", position: "absolute", top: "0", left: "0", height: "100%", width: "100%" }}
              allowFullScreen={true}  
              allow="encrypted-media"></iframe>
          </div>
        </>
        //  <video className="op-player__media" id="video" controls playsInline>
        //   <source src={"https://player.vdocipher.com/v2/?otp=20160313versASE323sDOWWnMxlfdq72d2Rpx1SDeWYy18QRCwMqQzrFkSeiAziY&playbackInfo=eyJ2aWRlb0lkIjoiYzhlZDI2MTc2NTYzNDViOWJjODFjZGMzYzI1ODFkYzIifQ=="} />
        // </video>
      }
    </div>
  );
};

export default VideoPlayer;