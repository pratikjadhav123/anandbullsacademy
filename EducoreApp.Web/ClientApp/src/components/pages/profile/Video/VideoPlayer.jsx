import React, { useEffect, useState } from 'react';
import OpenPlayerJS from 'openplayerjs';
import 'openplayerjs/dist/openplayer.css';

const VideoPlayer = ({ video }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const handleVideoOpen = () => setVideoOpen(!videoOpen)
  useEffect(() => {
    const player = new OpenPlayerJS('video', {
      controls: {
        layers: {
          left: ['play', 'time', 'volume'],
          middle: ['progress'],
          right: ['captions', 'settings', 'fullscreen'],
        }
      },
      hls: {
        startLevel: -1,
        enableWorker: true,
        widevineLicenseUrl: 'https://cwip-shaka-proxy.appspot.com/no_auth',
        emeEnabled: true,
      }
    });
    player.init();
    videoOpen && player.getElement().addEventListener('hlsLevelLoaded', (e, data) => {
      console.log(e, data);
    });

    return () => {
      videoOpen && player.destroy(); // Cleanup when the component unmounts
    };
  }, []);
  document.addEventListener('contextmenu', event => event.preventDefault());

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
      {videoOpen && <video className="op-player__media" id="video" controls playsInline>
        <source src={video.VideoPath} />
      </video>}
    </div>
  );
};

export default VideoPlayer;