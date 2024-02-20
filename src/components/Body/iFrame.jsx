/* eslint-disable react/prop-types */
const Iframe = ({ videoId, title, description }) => {
  return (
    <div>
      <iframe
        className="rounded-lg"
        width="1200"
        height="600"
        src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=0"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <h1 className="text-xl font-bold p-1 m-1">{title}</h1>
      <div className="p-1 m-1 w-6/12">
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
};

export default Iframe;
