import { Outlet } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <div>
        Home.tsx - Navbar
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default Home;
