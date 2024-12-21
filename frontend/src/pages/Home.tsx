import { useEffect, useState } from "react";
import "./home.styles.css";
import { useNavigate } from "@tanstack/react-router";
import UserIcon from "../components/icons/UserIcon";
import DumbbellIcon from "../components/icons/DumbbellIcon";
import { useSelector } from "react-redux";
import { selectAuth } from "../cake/authSlice";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authState = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  function navigateToMyApp() {
    navigate({
      to: "/app",
    });
  }
  function navigateToPublicRoutines() {
    navigate({
      to: "/routines",
    });
  }
  function handleNavigateToAuth() {
    navigate({
      to: "/auth",
    });
  }

  return (
    <section className="home">
      <div
        style={{
          borderRadius: "5px",
          padding: "1rem",
        }}
      >
        <header className="sub-title">
          <div className="app-title-routine">
            <h2>Routine </h2>
          </div>
          <div className="app-subtitle">
            <h2>This</h2>
            <div className="line"></div>
          </div>
        </header>
        <div
          className="get-started"
          style={{
            opacity: isLoading ? "0" : "1",
            transition: "opacity .3S linear",
          }}
        >
          <p>Keep it simple or spice it a little</p>
          <div className="get-started-btn-container">
            <button className="btn" onClick={navigateToPublicRoutines}>
              <DumbbellIcon />
              Routines
            </button>
            {authState.isAuthenticated ? (
              <button className="btn danger" onClick={navigateToMyApp}>
                <UserIcon />
                My Profile
              </button>
            ) : (
              <button className="btn secondary" onClick={handleNavigateToAuth}>
                <UserIcon />
                Authenticate
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
