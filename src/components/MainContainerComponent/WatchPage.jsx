/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../utilts/appSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("🚀 ~ WatchPage ~ searchParams:", searchParams.get("v"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu(false));
    return () => {
      dispatch(closeMenu(true));
    };
  }, []);

  return (
    <div className="px-5">
      <iframe
        className="rounded-lg"
        width="1200"
        height="600"
        src={
          "https://www.youtube.com/embed/" +
          searchParams.get("v") +
          "?autoplay=1&mute=0"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;
