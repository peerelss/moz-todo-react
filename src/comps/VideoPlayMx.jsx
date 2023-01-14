import React from "react";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
const VideoPlayMx = () => {
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src="http://127.0.0.1:5000/angel/video/757_angel_the_dreamgirl-2022-09-29-0h6nzvr8xi1oag5450n2y_source.mp4"
    />
  );
};

export default VideoPlayMx;
