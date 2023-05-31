import React, { useEffect } from 'react';
import OpenPlayerJS from 'openplayerjs';

const VideoPlayer = () => {
  let player;

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        player = await OpenPlayerJS.create('video', {
          controls: {
            layers: {
              right: ['settings', 'levels', 'fullscreen']
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
        player.getElement().addEventListener('hlsLevelLoaded', (e, data) => {
          console.log(e, data);
        });
      } catch (error) {
        console.error('Error initializing video player:', error);
      }
    };

    initializePlayer();

    return () => {
      // Cleanup when the component unmounts
      if (player) {
        player.destroy();
      }
    };
  }, []);

  return (
      <video className="op-player__media" id="video" controls playsInline>
        <source src="https://vod-progressive.akamaized.net/exp=1685237845~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4465%2F14%2F372327760%2F1547056591.mp4~hmac=a2f822856c8d1ad0a1b256ea65bc7e077b5e8ed98a3e8508b83e74321c9dbfaf/vimeo-prod-skyfire-std-us/01/4465/14/372327760/1547056591.mp4" />
      </video>
  );
};

export default VideoPlayer;
