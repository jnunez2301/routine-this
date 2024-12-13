import { useNavigate } from "@tanstack/react-router";
import "./Navbar.styles.css";
import LeftArrow from "./icons/LeftArrow";
import RoutineThisIcon from "./RoutineThisIcon";

const Navbar = () => {
  const navigate = useNavigate();
  function goBack() {
    navigate({ to: ".." });
  }
  return (
    <nav id="navbar">
      <div className="left-menu">
        <RoutineThisIcon />
        <button className="btn outlined" onClick={goBack}>
          <LeftArrow />
        </button>
      </div>
      <div className="middle-title">
      </div>
      <div className="right-menu"></div>
    </nav>
  );
};

export default Navbar;
