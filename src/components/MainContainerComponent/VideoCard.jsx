/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, thumbnails, title } = snippet;
  // console.log(info);
  return (
    <div className="p-2 m-2 w-64 shadow-lg rounded-lg">
      <img
        src={thumbnails?.medium?.url}
        alt="thumbnails"
        className="rounded-lg"
      />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount}</li>
      </ul>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  return (
    <div className="border border-red-500 bg-red-200 rounded-lg">
      <h1 className="absolute p-2 m-2 font-bold text-purple-600 text-lg">Higher Order Component</h1>
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
