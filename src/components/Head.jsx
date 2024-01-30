/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HAMBURGER_MENU,
  LOGO_APP,
  USERICON,
  YOUTUBE_SEARCH_API,
} from "../utilts/constants";
import { toggleMenu } from "../utilts/appSlice";
import { cacheResults } from "../utilts/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const [showSuggetions, setShowSuggetions] = useState(false);

  const searchCaches = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    // API call used Debouncing method
    const timer = setTimeout(() => {
      if (searchCaches[searchQuery]) {
        setSuggetions(searchCaches[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    // console.log("API call");
    const data = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
    const json = await data.json();
    setSuggetions(json?.[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json?.[1],
      })
    );
  };

  const handleSideBarMenu = () => {
    dispatch(toggleMenu());
  };

  const handleSearchSuggetionsClick = (e, suggetion) => {
    e.stopPropagation();
    console.log("🚀 ~ handleSearchSuggetionsClick ~ suggetion:", suggetion);
    setSearchQuery(suggetion);
    setShowSuggetions(false);
  };

  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          src={HAMBURGER_MENU}
          onClick={() => handleSideBarMenu()}
        />
        <a href="/">
          <img className="h-8 mx-2" alt="youtubeLogo" src={LOGO_APP} />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="px-6 w-1/2 border border-gray-400 rounded-l-full p-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggetions(true)}
            onBlur={() => setShowSuggetions(false)}
          />
          <button className="border border-gray-400 py-1 px-5 bg-gray-100 rounded-r-full">
            🔍
          </button>
          <div id="showSuggetionsId" className="showSuggetionsClass">
            {showSuggetions && suggetions?.length > 0 && (
              <div className="absolute my-1 py-2 px-2  bg-white w-[675px] rounded-lg shadow-lg border border-gray-200 z-10">
                <ul>
                  {suggetions?.map((suggetion) => (
                    <li
                      className="py-1 px-3 shadow-sm hover:bg-gray-100"
                      key={suggetion}
                      onClick={(e) => handleSearchSuggetionsClick(e, suggetion)}
                    >
                      🔍 {suggetion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <img className="h-8 col-span-1" alt="user" src={USERICON} />
      </div>
    </div>
  );
};

export default Head;
