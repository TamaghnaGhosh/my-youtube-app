import { Outlet } from "react-router-dom";
import Sidebar from "./NavBar/Sidebar";

const Body = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
