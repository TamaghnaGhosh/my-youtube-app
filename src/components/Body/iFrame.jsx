/* eslint-disable react/prop-types */
const Iframe = ({ videoId }) => {
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
    </div>
  );
};

export default Iframe;
