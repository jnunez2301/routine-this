import { useEffect, useState } from "react";
import "./home.styles.css";
import { useNavigate } from "@tanstack/react-router";
import UserIcon from "../components/icons/UserIcon";
import DumbbellIcon from "../components/icons/DumbbellIcon";
import { Button } from "../components/core/Button";
import { useSession } from "../context/auth/context";

const Home = () => {
  const { session, clearSession } = useSession();
  const navigate = useNavigate();
  // Loader made to provide animations at home path
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  function handleLogOut(){
    if(window.confirm("Are you sure you want to exit?")){
      clearSession();
    }
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
          <div className="app-title-routine text-5xl font-bold">
            <h2>Routine </h2>
          </div>
          <div className="app-subtitle text-[12px] font-semibold">
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
            <Button $variant="primary" onClick={navigateToPublicRoutines}>
              <DumbbellIcon />
              Routines
            </Button>
            {/* TODO: Change this conditional */}
            {session ? (
              <div className="flex items-center gap-3">
                <Button
                  $variant="danger"
                  /* className="btn danger" */ onClick={navigateToMyApp}
                >
                  <UserIcon />
                  My Profile
                </Button>
                <Button $variant="outlined" onClick={handleLogOut}>Logout</Button>
              </div>
            ) : (
              <Button $variant="secondary" onClick={handleNavigateToAuth}>
                <UserIcon />
                Authenticate
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
