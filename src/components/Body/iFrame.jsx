/* eslint-disable react/prop-types */
const Iframe = ({ videoId, title }) => {
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
      <h1 className="text-3xl font-semibold p-2 m-2">{title}</h1>
    </div>
  );
};

export default Iframe;
