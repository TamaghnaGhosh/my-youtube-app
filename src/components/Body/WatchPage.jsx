/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../utilts/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsLikesAndSubsribeContainer/CommentsContainer";
import LiveChat from "./LiveChatMessageContainer/LiveChat";
import Iframe from "./iFrame";
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
    <div className="flex flex-col w-full">
      <div className="px-5 flex w-full">
        <Iframe videoId={searchParams.get("v")} />
        <div className="w-full">
          <LiveChat />
        </div>
      </div>
      <CommentsContainer videoId={searchParams.get("v")} />
    </div>
  );
};

export default WatchPage;
