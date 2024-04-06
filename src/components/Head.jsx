/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HAMBURGER_MENU,
  LOGO_APP,
  USERICON,
  YOUTUBE_SEARCH_API,
} from "../utilts/constants";
import { toggleMenu, closeMenu } from "../utilts/appSlice";
import { cacheResults } from "../utilts/searchSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryCopy, setSearchQueryCopy] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const [showSuggetions, setShowSuggetions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const location = useLocation();

  const searchCaches = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleMenuClose();
    // API call used Debouncing method
    debounceSearchSuggestions();
    // Cleanup function
    return clearTimeout;
  }, [searchQuery]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setSearchQueryCopy(location.pathname.replaceAll("%20", " ").substring(8));
    }, 1000);
  }, []);

  const handleMenuClose = () => {
    if (location.pathname.includes("/watch") !== true) {
      dispatch(closeMenu(true));
    }
  };

  const debounceSearchSuggestions = () => {
    const timer = setTimeout(() => {
      if (searchCaches[searchQuery]) {
        setSuggetions(searchCaches[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => clearTimeout(timer);
  };

  const getSearchSuggestions = async () => {
    // console.log("API call");
    try {
      const data = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`, {
        headers: {
          "x-cors-api-key": "temp_7143d6203f665371834860b5c036ac46",
        },
      });
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
    let selectedValue = "";
    if (
      event.key === "ArrowDown" &&
      selectedSuggestion < suggetions?.length - 1
    ) {
      setSelectedSuggestion(selectedSuggestion + 1);
      selectedValue = suggetions[selectedSuggestion + 1];
      setSearchQueryCopy(selectedValue);
    } else if (event.key === "ArrowUp" && selectedSuggestion > 0) {
      setSelectedSuggestion(selectedSuggestion - 1);
      selectedValue = suggetions[selectedSuggestion - 1];
      setSearchQueryCopy(selectedValue);
    } else if (event.key === "Enter" && selectedSuggestion !== null) {
      // Handle "Enter" key press - get the selected suggestion value
      // const selectedValue = suggetions[selectedSuggestion];
      handleSuggestionSelect(suggetions[selectedSuggestion]);
    } else if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("searchBtn").click();
      setSelectedSuggestion(null);
      setShowSuggetions(false);
    } else if (event.keyCode === 27 && event.code === "Escape" && event.key === "Escape") {
      setSelectedSuggestion(null);
      setSearchQueryCopy("");
      setShowSuggetions(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setSelectedSuggestion(null);
    setShowSuggetions(false);
    setSearchQueryCopy(suggestion);
    navigate(`/search/${suggestion}`);
  };

  const handleButtonSearchSubmit = () => {
    if (searchQuery?.trim() !== "") navigate(`/search/${searchQuery}`);
    // localStorage.removeItem("persist:root");
  };

  const handleSearchSuggestionsClick = (suggestion) => {
    handleSuggestionSelect(suggestion);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click on suggestion
    setTimeout(() => setShowSuggetions(false), 200);
  };

  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          src={HAMBURGER_MENU}
          onClick={(e) => handleSideBarMenu(e)}
        />
        <Link to="/">
          <img className="h-8 mx-2" alt="youtubeLogo" src={LOGO_APP} />
        </Link>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="px-6 w-1/2 border border-gray-400 rounded-l-full p-1"
            value={searchQueryCopy}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchQueryCopy(e.target.value);
              setSelectedSuggestion(null);
              setShowSuggetions(true);
            }}
            onFocus={() => setShowSuggetions(true)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
          <button
            id="searchBtn"
            className="border border-gray-400 py-1 px-5 bg-gray-100 rounded-r-full"
            onClick={handleButtonSearchSubmit}
          >
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
                      onClick={() => handleSearchSuggestionsClick(suggetion)}
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
