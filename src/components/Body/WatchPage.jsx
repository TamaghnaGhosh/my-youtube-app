/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../utilts/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsLikesAndSubsribeContainer/CommentsContainer";
import LiveChat from "./LiveChatMessageContainer/LiveChat";
import Iframe from "./iFrame";
import Shimmer from "../../utilts/shimmerLoading";
import { YOUTUBE_VIDEO_WATCH_API } from "../../utilts/constants";
const WatchPage = () => {
  // const [object, setObject] = useState([]);
  // const [copyObject, setCopyObject] = useState([]);

  // const movieName = useSelector((store) => store.app.movieName);
  // const suggestionMovieNames = useSelector(
  //   (store) => store.app.suggetionMovies
  // );

  const [Wvideo, setWVideo] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("🚀 ~ WatchPage ~ searchParams:", searchParams.get("v"));

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    window.scroll({
      behavior: "smooth",
    });
    dispatch(closeMenu(false));
    // setObject(movieName?.filter((item) => item?.id === searchParams.get("v")));
    // setCopyObject(
    //   suggestionMovieNames
    //     ?.flat(Infinity)
    //     ?.filter((item) => item?.id?.videoId === searchParams.get("v")) ?? []
    // );

    getVideoDetails();

    return () => {
      dispatch(closeMenu(true));
      <Shimmer />;
    };
  }, []);

  const getVideoDetails = async () => {
    const data = await fetch(YOUTUBE_VIDEO_WATCH_API + searchParams.get("v"));
    const json = await data?.json();
    setWVideo(json?.items[0]);
  };

  let liveBroadcastContent = Wvideo?.snippet?.liveBroadcastContent;
  let categoryId = Wvideo?.snippet?.categoryId;
  console.log("🚀 ~ WatchPage ~ categoryId:", categoryId);
  console.log("🚀 ~ WatchPage ~ liveBroadcastContent:", liveBroadcastContent);

  return (
    <div className="flex flex-col w-full">
      <div className="px-5 flex w-full">
        <Iframe
          videoId={searchParams.get("v")}
          // title={object?.[0]?.snippet?.title || copyObject?.[0]?.snippet?.title}
          title={Wvideo?.snippet?.title}
          description={Wvideo?.snippet?.description}
        />
        <div className="w-full">
          {liveBroadcastContent !== "none" ? (
            <LiveChat />
          ) : (
            <>
              <div className="m-0 p-0 font-bold text-xl">Recommendation</div>
              <span>Still a work in progress.....</span>
            </>
          )}
        </div>
      </div>
      <CommentsContainer videoId={searchParams.get("v")} />
    </div>
  );
};

export default WatchPage;
