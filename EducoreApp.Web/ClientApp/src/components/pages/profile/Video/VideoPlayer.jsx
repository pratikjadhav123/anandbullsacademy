import React, { useEffect, useState } from 'react';
import 'openplayerjs/dist/openplayer.css';
import videos from '../../../../utils/videos';

const VideoPlayer = ({ video }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [vdolink, setVideoLink] = useState();
  const [system, setSystem] = useState()
  const handleVideoOpen = () => setVideoOpen(!videoOpen)
  useEffect(() => {
    getLink();
    operatingSytem()
  }, []);
  const getLink = () => {
    videos.getLink(video.VideoUrl).then((data) => {
      setVideoLink(data.VideoUrl);
    })
  }
  function operatingSytem() {
    let OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    // Display the OS name
    setSystem(OSName)
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
      {videoOpen && (system === "Windows" ?
        <>
          <div style={{ paddingTop: "55%", position: "relative" }}>
            <iframe
              src={vdolink}
              style={{ border: "0", maxWidth: "100%", position: "absolute", top: "0", left: "0", height: "100%", width: "100%" }}
              allowFullScreen={true}
              allow="encrypted-media"></iframe>
          </div>
        </>
        :
        <>Videos restricted other than Windows</>)
        //  <video className="op-player__media" id="video" controls playsInline>
        //   <source src={"https://player.vdocipher.com/v2/?otp=20160313versASE323sDOWWnMxlfdq72d2Rpx1SDeWYy18QRCwMqQzrFkSeiAziY&playbackInfo=eyJ2aWRlb0lkIjoiYzhlZDI2MTc2NTYzNDViOWJjODFjZGMzYzI1ODFkYzIifQ=="} />
        // </video>
      }
    </div>
  );
};

export default VideoPlayer;