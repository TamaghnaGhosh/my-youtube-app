/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../utilts/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./commentsLikesAndSubsribeContainer/CommentsContainer";

const WatchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("🚀 ~ WatchPage ~ searchParams:", searchParams.get("v"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu(false));
    return () => {
      dispatch(closeMenu(true));
    };
  }, []);

  return (
    <div className="flex flex-col">
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
      <CommentsContainer videoId={searchParams.get("v")} />
    </div>
  );
};

export default WatchPage;
