import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isMenuOpenClick = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpenClick) return null;

  const pages = ["/watch", "/demo"];
  return (
    <div
      className={
        pages.find((page) => page === location?.pathname)
          ? "p-5 shadow-lg w-48"
          : "p-5 shadow-lg w-full"
      }
    >
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/demo"}>Demo</Link>
        </li>
        <li> Shorts</li>
        <li> Videos</li>
        <li> Lives</li>
      </ul>
      <h1 className="font-semibold pt-5">Subscriptions</h1>
      <ul>
        <li> Musics</li>
        <li> Sports</li>
        <li> Gaming</li>
        <li> Movies</li>
      </ul>
      <h1 className="font-semibold pt-5">Watch Later</h1>
      <ul>
        <li> Musics</li>
        <li> Sports</li>
        <li> Gaming</li>
        <li> Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
