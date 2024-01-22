import { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../../utilts/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    // console.log(json);
    setVideos(json?.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos?.length > 0 && (
        <Link to={`/watch?v=${videos[0]?.id}`}>
          <AdVideoCard info={videos[0]} />
        </Link>
      )}
      {videos?.map((video) => (
        <Link to={`/watch?v=${video?.id}`} key={video?.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
