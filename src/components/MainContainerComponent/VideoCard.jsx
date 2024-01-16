/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, thumbnails, title } = snippet;
  // console.log(info);
  return (
    <div className="p-2 m-2 w-64 shadow-lg rounded-lg">
      <img src={thumbnails?.medium?.url} alt="thumbnails" className="rounded-lg"/>
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount}</li>
      </ul>
    </div>
  );
};

export default VideoCard;
