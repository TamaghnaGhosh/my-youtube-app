/* eslint-disable no-unused-vars */

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addMovieName } from "../../../utilts/appSlice";

/* eslint-disable react/prop-types */
const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, thumbnails, title } = snippet;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(addMovieName(info))
  // }, [])
  
  // console.log(info);
  return (
    <div className="p-2 m-2 w-64 shadow-2xl rounded-lg">
      <img
        src={thumbnails?.medium?.url}
        alt="thumbnails"
        className="rounded-lg"
      />
      <ul>
        <li className="font-bold py-2 text-sm">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount}</li>
      </ul>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  return (
    <div className="border border-red-500 bg-red-200 rounded-lg">
      <h1 className="absolute p-2 m-2 font-bold text-purple-600 text-lg">
        Higher Order Component
      </h1>
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
