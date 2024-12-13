import { Outlet } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Home</p>
      <Outlet />
    </>
  );
};

export default Home;
