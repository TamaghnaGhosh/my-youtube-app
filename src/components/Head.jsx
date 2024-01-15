import { useDispatch } from "react-redux";
import { HAMBURGER_MENU, LOGO_APP, USERICON } from "../utilts/constants";
import { toggleMenu } from "../utilts/appSlice";

const Head = () => {
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
        <input
          type="text"
          placeholder="placeholder"
          className="w-1/2 border border-gray-400 rounded-l-full p-1"
        />
        <button className="border border-gray-400 py-1 px-5 bg-gray-100 rounded-r-full">
          🔍
        </button>
      </div>
      <div>
        <img className="h-8 col-span-1" alt="user" src={USERICON} />
      </div>
    </div>
  );
};

export default Head;
