import { Outlet } from "@tanstack/react-router";
import "./Authenticate.style.css";

const Authenticate = () => {
  return (
    <div className="authenticate">
      <div className="left-panel">
      </div>
      <Outlet />
    </div>
  );
};

export default Authenticate;
