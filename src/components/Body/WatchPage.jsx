/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../utilts/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsLikesAndSubsribeContainer/CommentsContainer";
import LiveChat from "./LiveChatMessageContainer/LiveChat";
import Iframe from "./iFrame";
const WatchPage = () => {
  const [object, setObject] = useState([]);

  const movieName = useSelector((store) => store.app.movieName);

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("🚀 ~ WatchPage ~ searchParams:", searchParams.get("v"));

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    window.scroll({
      behavior: "smooth",
    });
    dispatch(closeMenu(false));
    setObject(movieName?.filter((item) => item?.id === searchParams.get("v")));
    return () => {
      dispatch(closeMenu(true));
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="px-5 flex w-full">
        <Iframe
          videoId={searchParams.get("v")}
          title={object?.[0]?.snippet?.title}
        />
        <div className="w-full">
          <LiveChat />
        </div>
      </div>
      <CommentsContainer videoId={searchParams.get("v")} />
    </div>
  );
};

export default WatchPage;
