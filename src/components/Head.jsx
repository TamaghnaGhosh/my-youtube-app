/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  HAMBURGER_MENU,
  LOGO_APP,
  USERICON,
  YOUTUBE_SEARCH_API,
} from "../utilts/constants";
import { toggleMenu } from "../utilts/appSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const [showSuggetions, setShowSuggetions] = useState(false);

  useEffect(() => {
    // API call used Debouncing method
    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
    const json = await data.json();
    setSuggetions(json?.[1]);
  };

  const dispatch = useDispatch();

  const handleSideBarMenu = () => {
    dispatch(toggleMenu());
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

          {showSuggetions && suggetions?.length > 0 && (
            <div className="absolute my-1 py-2 px-2  bg-white w-[675px] rounded-lg shadow-lg border border-gray-200 z-10">
              <ul>
                {suggetions?.map((suggetion) => (
                  <li
                    className="py-1 px-3 shadow-sm hover:bg-gray-100"
                    key={suggetion}
                  >
                    🔍 {suggetion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <img className="h-8 col-span-1" alt="user" src={USERICON} />
      </div>
    </div>
  );
};

export default Head;
