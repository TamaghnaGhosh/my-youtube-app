/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HAMBURGER_MENU,
  LOGO_APP,
  USERICON,
  YOUTUBE_SEARCH_API,
} from "../utilts/constants";
import { toggleMenu, closeMenu } from "../utilts/appSlice";
import { cacheResults } from "../utilts/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const [showSuggetions, setShowSuggetions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const searchCaches = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu(true));
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
    try {
      const data = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
      const json = await data.json();
      setSuggetions(json?.[1]);
      dispatch(
        cacheResults({
          [searchQuery]: json?.[1],
        })
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSideBarMenu = () => {
    dispatch(toggleMenu());
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "ArrowDown" &&
      selectedSuggestion < suggetions?.length - 1
    ) {
      setSelectedSuggestion(selectedSuggestion + 1);
    } else if (event.key === "ArrowUp" && selectedSuggestion > 0) {
      setSelectedSuggestion(selectedSuggestion - 1);
    } else if (event.key === "Enter" && selectedSuggestion !== null) {
      // Handle "Enter" key press - get the selected suggestion value
      // const selectedValue = suggetions[selectedSuggestion];
      // setSearchQuery(selectedValue);
      // setShowSuggetions(false);
      // setSelectedSuggestion(null);
      handleSuggestionSelect(suggetions[selectedSuggestion]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setSelectedSuggestion(false);
    setShowSuggetions(false);
  };

  // const handleSearchSuggestionsClick = (suggestion) => {
  //   handleSuggestionSelect(suggestion);
  // };

  // const handleInputBlur = () => {
  //   // Handle onBlur - if a suggestion is selected, set it as the search query
  //   if (selectedSuggestion !== null) {
  //     handleSuggestionSelect(suggetions[selectedSuggestion]);
  //   }
  //   setSelectedSuggestion(false);
  // };

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedSuggestion(null);
            }}
            onFocus={() => setShowSuggetions(true)}
            onBlur={() => setShowSuggetions(false)}
            // onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
          <button className="border border-gray-400 py-1 px-5 bg-gray-100 rounded-r-full">
            🔍
          </button>
          <div id="showSuggetionsId" className="showSuggetionsClass">
            {showSuggetions && suggetions?.length > 0 && (
              <div
                className="absolute my-1 py-2 px-2 bg-white w-[675px] rounded-lg 
              shadow-lg border border-gray-200 z-10"
              >
                <ul>
                  {suggetions?.map((suggetion, index) => (
                    <li
                      className={
                        index === selectedSuggestion
                          ? "py-1 px-3 bg-gray-200 shadow-sm rounded-lg Selected"
                          : "py-1 px-3 shadow-sm hover:bg-gray-100"
                      }
                      key={suggetion}
                      // onClick={() => handleSearchSuggestionsClick(suggetion)}
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
      <div className="cursor-pointer">
        <img className="h-8 col-span-1" alt="user" src={USERICON} />
      </div>
    </div>
  );
};

export default Head;
